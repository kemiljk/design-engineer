#!/usr/bin/env python3
"""
Convert "What You'll Learn" and "Key Takeaways" sections from paragraph format to bullet lists.
Also adds missing "What You'll Learn" sections where needed.
"""

import re
import os
from pathlib import Path
from typing import List, Tuple, Optional

CONTENT_DIR = Path("content/course")


def is_bullet_list(text: str) -> bool:
    """Check if text is already in bullet list format."""
    lines = text.strip().split('\n')
    if not lines:
        return False
    
    # Check if first few non-empty lines start with "- "
    bullet_count = 0
    for line in lines[:5]:  # Check first 5 lines
        stripped = line.strip()
        if stripped:
            if stripped.startswith('- '):
                bullet_count += 1
            else:
                # If we find a non-bullet line before bullets, it's not a bullet list
                if bullet_count == 0:
                    return False
    
    # If at least one bullet found, consider it a bullet list
    return bullet_count > 0


def paragraph_to_bullets(paragraph: str) -> List[str]:
    """Convert a paragraph to bullet points."""
    # Remove extra whitespace
    text = ' '.join(paragraph.split())
    
    # First, try to split on sentence boundaries
    sentences = re.split(r'[.!?]\s+(?=[A-Z])', text)
    
    bullets = []
    
    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence or len(sentence) < 15:
            continue
        
        # Remove leading conjunctions that don't make sense at start of bullet
        sentence = re.sub(r'^(and|but|or|whilst|while|also|additionally|furthermore|moreover|however|therefore|thus|hence),?\s+', '', sentence, flags=re.IGNORECASE)
        
        # If sentence is very long, try to split it
        if len(sentence) > 120:
            # Try splitting on commas followed by capital letters (likely new clauses)
            parts = re.split(r',\s+(?=[A-Z][a-z]{3,})', sentence)
            if len(parts) > 1:
                # Check if parts are reasonable length
                reasonable_parts = [p.strip() for p in parts if 20 < len(p.strip()) < 100]
                if reasonable_parts:
                    bullets.extend(reasonable_parts)
                    continue
        
        # Check if sentence contains multiple ideas separated by conjunctions
        if re.search(r'\b(and|whilst|while|also)\b', sentence, re.IGNORECASE) and len(sentence) > 80:
            # Try to split on these conjunctions
            parts = re.split(r'\s+(and|whilst|while|also)\s+', sentence, flags=re.IGNORECASE)
            if len(parts) >= 3:  # At least one split happened
                # Recombine intelligently - pair parts with their conjunctions
                new_parts = []
                i = 0
                current = ""
                while i < len(parts):
                    if i % 2 == 0:  # Text part
                        if current:
                            # Finish previous bullet if it's substantial
                            if len(current.strip()) > 30:
                                new_parts.append(current.strip())
                                current = parts[i]
                            else:
                                current += " " + parts[i] if current else parts[i]
                        else:
                            current = parts[i]
                    else:  # Conjunction part
                        # If current is substantial, finish it and start new
                        if len(current.strip()) > 40:
                            new_parts.append(current.strip())
                            current = parts[i] + " "  # Start with conjunction
                        else:
                            current += " " + parts[i] + " "
                    i += 1
                if current.strip():
                    new_parts.append(current.strip())
                
                if len(new_parts) > 1:
                    bullets.extend([p.strip() for p in new_parts if 20 < len(p.strip()) < 120])
                    continue
        
        # Single sentence - add as bullet if reasonable length
        if 20 <= len(sentence) <= 120:
            bullets.append(sentence)
        elif len(sentence) > 120:
            # Too long - try to truncate intelligently at word boundary
            truncated = sentence[:117].rsplit(' ', 1)[0] + '...'
            bullets.append(truncated)
    
    # Clean up bullets
    cleaned_bullets = []
    for bullet in bullets:
        bullet = bullet.strip()
        if not bullet:
            continue
        
        # Remove trailing periods (unless abbreviation)
        if bullet.endswith('.') and len(bullet) > 3:
            # Check if it's likely an abbreviation (short, all caps, or common abbrev)
            if not (len(bullet) < 10 and bullet.isupper()):
                bullet = bullet[:-1]
        
        # Capitalize first letter
        if bullet:
            bullet = bullet[0].upper() + bullet[1:] if len(bullet) > 1 else bullet.upper()
        
        # Only add if reasonable length
        if 15 <= len(bullet) <= 120:
            cleaned_bullets.append(bullet)
    
    # If we still have very long bullets, split them more aggressively
    final_bullets = []
    for bullet in cleaned_bullets:
        if len(bullet) > 100:
            # Try to split on commas
            parts = bullet.split(', ')
            if len(parts) > 1:
                # Recombine parts to keep bullets reasonable length
                current = ""
                for part in parts:
                    if len(current + part) < 90:
                        current += (", " if current else "") + part
                    else:
                        if current:
                            final_bullets.append(current.strip())
                        current = part
                if current:
                    final_bullets.append(current.strip())
            else:
                final_bullets.append(bullet)
        else:
            final_bullets.append(bullet)
    
    # Ensure we have at least something
    if not final_bullets:
        # Fallback: create bullets from first 200 chars
        if len(text) > 200:
            final_bullets = [text[:197] + "..."]
        else:
            final_bullets = [text]
    
    return final_bullets[:7]  # Limit to 7 bullets max


def extract_section_content(content: str, section_name: str) -> Tuple[Optional[str], int, int]:
    """Extract section content and return (content, start_line, end_line)."""
    pattern = rf'^## {re.escape(section_name)}$'
    lines = content.split('\n')
    
    start_idx = None
    for i, line in enumerate(lines):
        if re.match(pattern, line):
            start_idx = i
            break
    
    if start_idx is None:
        return None, -1, -1
    
    # Find the end of the section (next ## heading or end of file)
    end_idx = len(lines)
    for i in range(start_idx + 1, len(lines)):
        if lines[i].startswith('##'):
            end_idx = i
            break
    
    # Extract content between heading and next section
    section_lines = lines[start_idx + 1:end_idx]
    
    # Remove leading/trailing blank lines
    while section_lines and not section_lines[0].strip():
        section_lines.pop(0)
    while section_lines and not section_lines[-1].strip():
        section_lines.pop()
    
    section_content = '\n'.join(section_lines).strip()
    
    return section_content, start_idx, end_idx


def find_quick_summary(content: str) -> Tuple[Optional[str], int]:
    """Find Quick Summary blockquote and return (content, line_number)."""
    lines = content.split('\n')
    for i, line in enumerate(lines):
        if '> **Quick Summary:**' in line or '> **Quick Summary:**' in line:
            # Get the full blockquote (may span multiple lines)
            summary_lines = [line]
            j = i + 1
            while j < len(lines) and (lines[j].startswith('>') or not lines[j].strip()):
                if lines[j].startswith('>'):
                    summary_lines.append(lines[j])
                j += 1
            summary = '\n'.join(summary_lines)
            return summary, i
    return None, -1


def generate_what_youll_learn(content: str, quick_summary: Optional[str] = None) -> List[str]:
    """Generate "What You'll Learn" bullets from content."""
    # Try to extract key points from headings and content
    bullets = []
    
    # Look for main section headings (### or ##)
    headings = re.findall(r'^###?\s+(.+)$', content, re.MULTILINE)
    
    # Extract key concepts from first few headings
    for heading in headings[:5]:
        heading = heading.strip()
        # Skip certain headings
        if heading.lower() in ['quick summary', 'what you\'ll learn', 'key takeaways', 
                              'try it yourself', 'test your understanding', 'next steps']:
            continue
        if len(heading) > 5 and len(heading) < 80:
            bullets.append(f"How {heading.lower()}")
    
    # If we don't have enough, add generic ones based on content
    if len(bullets) < 3:
        bullets.extend([
            "Core concepts and principles",
            "Practical techniques and approaches",
            "Best practices and common patterns"
        ])
    
    return bullets[:5]  # Limit to 5


def process_file(file_path: Path) -> bool:
    """Process a single file and return True if modified."""
    try:
        content = file_path.read_text(encoding='utf-8')
        original_content = content
        modified = False
        
        # Process "What You'll Learn" section
        section_content, start_idx, end_idx = extract_section_content(content, "What You'll Learn")
        
        if section_content is None:
            # Section missing - need to add it
            quick_summary, qs_line = find_quick_summary(content)
            if qs_line >= 0:
                # Find where to insert (after Quick Summary, before first ## heading)
                lines = content.split('\n')
                insert_idx = qs_line + 1
                # Skip blockquote continuation lines
                while insert_idx < len(lines) and (lines[insert_idx].startswith('>') or not lines[insert_idx].strip()):
                    insert_idx += 1
                
                # Generate bullets
                bullets = generate_what_youll_learn(content, quick_summary)
                bullet_text = '\n'.join([f"- {b}" for b in bullets])
                
                # Insert the section
                new_section = f"\n## What You'll Learn\n\n{bullet_text}\n"
                lines.insert(insert_idx, new_section)
                content = '\n'.join(lines)
                modified = True
        else:
            # Section exists - check if it needs conversion
            if not is_bullet_list(section_content):
                # Convert paragraph to bullets
                bullets = paragraph_to_bullets(section_content)
                if bullets:
                    bullet_text = '\n'.join([f"- {b}" for b in bullets])
                    lines = content.split('\n')
                    # Replace the section content
                    new_lines = lines[:start_idx + 1] + [''] + [f"- {b}" for b in bullets] + ['']
                    if end_idx < len(lines):
                        new_lines.extend(lines[end_idx:])
                    else:
                        new_lines.append('')
                    content = '\n'.join(new_lines)
                    modified = True
        
        # Process "Key Takeaways" section
        section_content, start_idx, end_idx = extract_section_content(content, "Key Takeaways")
        
        if section_content is not None and not is_bullet_list(section_content):
            # Convert paragraph to bullets
            bullets = paragraph_to_bullets(section_content)
            if bullets:
                bullet_text = '\n'.join([f"- {b}" for b in bullets])
                lines = content.split('\n')
                # Replace the section content
                new_lines = lines[:start_idx + 1] + [''] + [f"- {b}" for b in bullets] + ['']
                if end_idx < len(lines):
                    new_lines.extend(lines[end_idx:])
                else:
                    new_lines.append('')
                content = '\n'.join(new_lines)
                modified = True
        
        # Write back if modified
        if modified and content != original_content:
            file_path.write_text(content, encoding='utf-8')
            return True
        
        return False
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False


def main():
    """Main function to process all files."""
    files = list(CONTENT_DIR.rglob("*.md"))
    # Exclude meta files and index files
    files = [f for f in files if "_meta" not in str(f) and f.name != "index.md"]
    
    print(f"Found {len(files)} lesson files to process")
    
    modified_count = 0
    for file_path in sorted(files):
        if process_file(file_path):
            modified_count += 1
            print(f"Modified: {file_path}")
    
    print(f"\nProcessed {len(files)} files, modified {modified_count} files")


if __name__ == "__main__":
    main()
