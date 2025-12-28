# Server-Side Content Rendering Strategy

> **Purpose**: This document outlines an approach to render course content entirely on the server, preventing raw markdown from being sent to the client and significantly improving content protection.

## Current Architecture

Currently, the lesson page works as follows:

```
Server Component (page.tsx)
    ↓
Reads markdown from filesystem
    ↓
Passes raw content string to Client Component (LessonContent)
    ↓
Client Component renders with ReactMarkdown
    ↓
⚠️ Raw markdown is serialised in RSC payload and visible in browser
```

### The Problem

Because `LessonContent` is a client component (`"use client"`), Next.js serialises the entire `content` prop and sends it to the browser. This means:

1. **Network Tab**: The raw markdown is visible in the RSC payload
2. **React DevTools**: Anyone can inspect the `content` prop
3. **View Source**: The serialised content is embedded in the page

## Proposed Architecture

```
Server Component (page.tsx)
    ↓
Reads markdown from filesystem
    ↓
Renders markdown to HTML on server (new)
    ↓
Passes ONLY rendered HTML or interactive island references
    ↓
Client only receives: HTML + hydration for interactive parts
    ↓
✅ Raw markdown never leaves the server
```

## Implementation Strategy

### Phase 1: Identify Interactive Islands

First, audit `CourseMarkdown` to identify all interactive elements:

```tsx
// Current interactive elements in course-markdown.tsx:

1. SideNav / MobileSectionNav - Navigation based on detected sections
2. IllustrationRenderer - Custom illustrations (may have interactions)
3. VisualExampleRenderer - Interactive visual examples
4. ExerciseRenderer - Interactive exercises
5. SyntaxHighlighter - Code blocks with copy button
```

### Phase 2: Create Server-Side Markdown Renderer

Create a new server-only markdown renderer:

```tsx
// lib/server-markdown.ts
import "server-only";
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import { JSDOM } from 'jsdom';

interface ParsedContent {
  // Pre-rendered HTML sections (safe to send to client)
  htmlSections: Array<{
    id: string;
    label: string;
    html: string;
  }>;
  
  // References to interactive components (client renders these)
  interactiveSlots: Array<{
    id: string;
    type: 'illustration' | 'visual-example' | 'exercise';
    props: Record<string, unknown>;
    insertAfterSection: string;
  }>;
  
  // Navigation sections for SideNav
  sections: Array<{ id: string; label: string }>;
}

export async function parseAndRenderContent(
  markdown: string
): Promise<ParsedContent> {
  // 1. Extract special blocks (illustrations, exercises, etc.)
  // 2. Render remaining markdown to HTML
  // 3. Return structured data
}
```

### Phase 3: Refactor Component Structure

#### Option A: Hybrid Server/Client Split

Keep the page as a Server Component, render HTML server-side, and use Client Components only for interactivity:

```tsx
// app/course/[...slug]/page.tsx (Server Component)
import { parseAndRenderContent } from '@/lib/server-markdown';
import { LessonInteractiveIslands } from './lesson-interactive';
import { LessonNavigation } from './lesson-navigation';

export default async function LessonPage({ params }) {
  // ... access checks ...
  
  const parsed = await parseAndRenderContent(contentWithoutTitle);
  
  return (
    <main>
      {/* Client component for navigation only */}
      <LessonNavigation sections={parsed.sections} />
      
      {/* Server-rendered HTML - no raw markdown sent */}
      <article>
        {parsed.htmlSections.map(section => (
          <section key={section.id} id={section.id}>
            <div dangerouslySetInnerHTML={{ __html: section.html }} />
            
            {/* Interactive islands inserted where needed */}
            {parsed.interactiveSlots
              .filter(slot => slot.insertAfterSection === section.id)
              .map(slot => (
                <LessonInteractiveIslands 
                  key={slot.id}
                  type={slot.type}
                  props={slot.props}
                />
              ))
            }
          </section>
        ))}
      </article>
    </main>
  );
}
```

```tsx
// app/course/[...slug]/lesson-interactive.tsx (Client Component)
"use client";

import { IllustrationRenderer } from '../components/illustrations/illustration-renderer';
import { VisualExampleRenderer } from '../components/visual-examples';
import { ExerciseRenderer } from '../components/exercises';

interface Props {
  type: 'illustration' | 'visual-example' | 'exercise';
  props: Record<string, unknown>;
}

export function LessonInteractiveIslands({ type, props }: Props) {
  switch (type) {
    case 'illustration':
      return <IllustrationRenderer type={props.type as string} />;
    case 'visual-example':
      return <VisualExampleRenderer type={props.type as string} />;
    case 'exercise':
      return <ExerciseRenderer type="interactive" data={props.data as string} />;
    default:
      return null;
  }
}
```

#### Option B: Full Server Component with Streaming

Use React Server Components with Suspense for a cleaner architecture:

```tsx
// app/course/[...slug]/page.tsx
import { Suspense } from 'react';
import { ServerMarkdown } from '@/components/server-markdown';

export default async function LessonPage({ params }) {
  return (
    <main>
      <Suspense fallback={<LessonSkeleton />}>
        <ServerMarkdown 
          content={contentWithoutTitle}
          // Interactive components passed as render props
          components={{
            illustration: (props) => <IllustrationRenderer {...props} />,
            exercise: (props) => <ExerciseRenderer {...props} />,
          }}
        />
      </Suspense>
    </main>
  );
}
```

### Phase 4: Handle Code Syntax Highlighting

The `SyntaxHighlighter` component currently runs client-side. Options:

1. **Server-side highlighting with Shiki**:
   ```tsx
   import { codeToHtml } from 'shiki';
   
   const highlightedCode = await codeToHtml(code, {
     lang: 'typescript',
     theme: 'github-dark',
   });
   ```

2. **Keep client-side highlighting** but only pass the code string (not full markdown)

### Phase 5: Migrate Special Components

Each special component needs evaluation:

| Component | Current | Proposed |
|-----------|---------|----------|
| SideNav | Client (state for active section) | Client (minimal - just section IDs) |
| MobileSectionNav | Client | Client (minimal) |
| SummaryCard | Could be server | Server |
| ObjectivesCard | Could be server | Server |
| ExerciseCard | Could be server | Server |
| TakeawaysCard | Could be server | Server |
| IllustrationRenderer | Client (animations) | Client island |
| VisualExampleRenderer | Client (interactions) | Client island |
| ExerciseRenderer | Client (interactivity) | Client island |
| SyntaxHighlighter | Client (copy button) | Server render + client copy |

## Migration Steps

### Step 1: Create Server Markdown Utilities

1. Install dependencies:
   ```bash
   bun add remark remark-gfm remark-html shiki
   ```

2. Create `lib/server-markdown.ts` with content parsing

3. Create HTML sanitisation utilities

### Step 2: Update Page Component

1. Import server markdown utilities
2. Parse content on server
3. Pass only HTML and island references to client

### Step 3: Create Island Components

1. Create `LessonInteractiveIslands` component
2. Move interactive logic to client islands
3. Ensure hydration works correctly

### Step 4: Update Styling

1. Ensure prose styles work with server-rendered HTML
2. Handle dark mode class toggling
3. Test responsive layouts

### Step 5: Testing

1. Verify content renders correctly
2. Check interactive elements work
3. Confirm no markdown in network payload
4. Test accessibility
5. Performance testing (should improve with SSR)

## Security Considerations

### dangerouslySetInnerHTML

When using `dangerouslySetInnerHTML`, ensure:

1. **Sanitise output**: Use a library like `DOMPurify` or `sanitize-html`
2. **Whitelist tags**: Only allow expected HTML elements
3. **Strip scripts**: Never allow `<script>` tags

```tsx
import DOMPurify from 'isomorphic-dompurify';

const sanitisedHtml = DOMPurify.sanitize(html, {
  ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'code', 'pre', 'blockquote', 'strong', 'em'],
  ALLOWED_ATTR: ['href', 'class', 'id'],
});
```

### Content Security Policy

Consider adding CSP headers to prevent XSS:

```tsx
// middleware.ts or next.config.js
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
`;
```

## Rollback Plan

If issues arise:

1. Keep `course-markdown.tsx` unchanged as backup
2. Feature flag the new renderer
3. A/B test with a subset of users

```tsx
// Feature flag approach
const useServerMarkdown = process.env.NEXT_PUBLIC_SERVER_MARKDOWN === 'true';

{useServerMarkdown ? (
  <ServerRenderedContent html={html} islands={islands} />
) : (
  <LessonContent content={content} />
)}
```

## Expected Benefits

1. **Better Content Protection**: Raw markdown never reaches the client
2. **Improved Performance**: Less JavaScript shipped, faster initial render
3. **Better SEO**: Content is in initial HTML response
4. **Reduced Bundle Size**: ReactMarkdown not needed client-side

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Interactive components break | Medium | High | Thorough testing, feature flag |
| Styling differences | Medium | Medium | Visual regression testing |
| Performance regression | Low | Medium | Benchmark before/after |
| Complex migration | High | Medium | Phased rollout |

## Timeline Estimate

- Phase 1 (Audit): 2-3 hours
- Phase 2 (Server renderer): 4-6 hours
- Phase 3 (Refactor): 6-8 hours
- Phase 4 (Code highlighting): 2-3 hours
- Phase 5 (Component migration): 4-6 hours
- Testing & fixes: 4-6 hours

**Total: 22-32 hours** (3-4 days of focused work)

## Files to Modify

```
lib/
  └── server-markdown.ts (new)

app/course/
  ├── [...slug]/
  │   ├── page.tsx (major changes)
  │   ├── lesson-content.tsx (deprecated or simplified)
  │   └── lesson-interactive.tsx (new)
  └── components/
      └── course-markdown.tsx (deprecated or backup)
```

## Questions to Address

1. Should we support client-side navigation between lessons without full page reload?
2. Do any illustrations/examples need the full markdown context?
3. Should we cache rendered HTML for performance?
4. How do we handle content updates (invalidate cache)?

---

*Created: December 2024*
*Status: Proposal - Ready for Implementation*
