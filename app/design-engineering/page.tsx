import { Metadata } from "next";
import { PageHeader } from "../components/page-header";
import { Callout, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/app/components/ui";
import {
  NavArrowRight as ArrowRight,
  Code as Code2,
  LayoutLeft as Layout,
  DoubleCheck as ArrowLeftRight,
  Compass as Target,
  Flash as Zap,
  CheckCircle as CheckCircle2,
} from "iconoir-react";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "Design Engineering | Design Engineer",
  description:
    "Design Engineering sits at the intersection of design and development. Learn what Design Engineers do, why they matter to modern tech companies, and how they differ from vibe coders.",
};

export default function DesignEngineeringPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <PageHeader
        title="Design Engineering"
        description="The discipline that bridges design and development, and why it matters."
      />

      <div className="container-readable py-16 md:py-24">
        {/* Introduction */}
        <div className="mb-16">
          <p className="text-xl leading-relaxed text-neutral-700 md:text-2xl dark:text-neutral-300">
            Design Engineering is a discipline that exists at the convergence of
            design and front-end development. It&apos;s not simply being
            &quot;good at both&quot;, it&apos;s a distinct skillset focused on
            the space where design decisions meet technical implementation.
          </p>
        </div>

        {/* What is a Design Engineer? */}
        <div className="mb-16">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            What is a Design Engineer?
          </h2>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            A Design Engineer can take a concept from initial idea through to
            shipped product. They understand visual design principles deeply
            enough to make confident aesthetic decisions, can prototype
            interactions in real code, and write production-ready
            implementations that hold up to engineering standards.
          </p>

          <p className="mb-8 text-neutral-700 dark:text-neutral-300">
            This isn&apos;t about being a designer who can code a bit, or an
            engineer who knows some Figma shortcuts. Design Engineers operate in
            the overlap. They&apos;re fluent in both languages and can translate
            between them without losing fidelity.
          </p>

          <div className="my-8 grid gap-6 md:grid-cols-3">
            <div className="group border border-neutral-200 bg-neutral-50 p-6 transition-colors hover:bg-neutral-100/60 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800/40">
              <Layout className="text-swiss-red mb-3 h-8 w-8 transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none" />
              <h3 className="mb-2 font-bold">Design Fluency</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Deep understanding of typography, colour, spacing, layout, and
                composition. Can make aesthetic decisions with confidence.
              </p>
            </div>
            <div className="group border border-neutral-200 bg-neutral-50 p-6 transition-colors hover:bg-neutral-100/60 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800/40">
              <Code2 className="text-swiss-red mb-3 h-8 w-8 transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none" />
              <h3 className="mb-2 font-bold">Technical Proficiency</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Production-quality code. Understands performance, accessibility,
                and cross-platform constraints.
              </p>
            </div>
            <div className="group border border-neutral-200 bg-neutral-50 p-6 transition-colors hover:bg-neutral-100/60 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800/40">
              <ArrowLeftRight className="text-swiss-red mb-3 h-8 w-8 transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none" />
              <h3 className="mb-2 font-bold">The Bridge</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Translates between design and engineering teams without losing
                intent. Prototypes interactions that feel real.
              </p>
            </div>
          </div>

          <h3 className="mt-8 mb-4 text-2xl font-bold">A Note on Titles</h3>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            The title varies by company. You&apos;ll see Design Engineer, UI
            Engineer, Frontend Designer, Design Technologist, Creative
            Developer, Product Designer (Engineer), and others. They&apos;re all
            describing similar work. The common thread is the convergence of
            design thinking and engineering execution.
          </p>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            Some companies use these titles interchangeably. Others draw subtle
            distinctions based on where someone sits on the
            design-to-engineering spectrum. What matters more than the title is
            the capability: can you ship beautiful, polished interfaces that
            work?
          </p>
        </div>

        {/* How Design Engineers Work */}
        <div className="mb-16">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            How Design Engineers Work at Tech Companies
          </h2>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            Design Engineers typically sit between (or sometimes within) design
            and engineering teams. Their day-to-day work varies by company and
            project, but the core value remains consistent: they compress the
            feedback loop between design and implementation.
          </p>

          <h3 className="mt-8 mb-4 text-2xl font-bold">
            Typical Responsibilities
          </h3>

          <div className="my-6 space-y-4">
            <div className="flex gap-4">
              <CheckCircle2 className="text-swiss-red mt-1 h-5 w-5 shrink-0" />
              <div>
                <h4 className="mb-1 font-bold">Design System Development</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Building and maintaining component libraries that designers
                  can spec and engineers can implement. Ensuring design tokens
                  translate accurately to code.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="text-swiss-red mt-1 h-5 w-5 shrink-0" />
              <div>
                <h4 className="mb-1 font-bold">End-to-end Project Delivery</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Taking a project from idea to launch. Leading on design and
                  implementation, shaping the scope, and coordinating decisions
                  across product, design, and engineering.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="text-swiss-red mt-1 h-5 w-5 shrink-0" />
              <div>
                <h4 className="mb-1 font-bold">Prototyping</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Creating high-fidelity, interactive prototypes in code to
                  validate interactions, animations, and user flows before full
                  implementation.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="text-swiss-red mt-1 h-5 w-5 shrink-0" />
              <div>
                <h4 className="mb-1 font-bold">Implementation</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Building production UIs with pixel-perfect attention to
                  detail. Not just &quot;close enough&quot;. Exactly as
                  designed, with smooth animations and proper polish.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="text-swiss-red mt-1 h-5 w-5 shrink-0" />
              <div>
                <h4 className="mb-1 font-bold">
                  Design-Engineering Translation
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Working with designers to refine specs for implementation.
                  Working with engineers to explain design intent. Bridging the
                  gap in both directions.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="text-swiss-red mt-1 h-5 w-5 shrink-0" />
              <div>
                <h4 className="mb-1 font-bold">Tooling and Infrastructure</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Building internal tools that help designers and engineers work
                  better together, like design system documentation, Figma
                  plugins, component playgrounds.
                </p>
              </div>
            </div>
          </div>

          <h3 className="mt-8 mb-4 text-2xl font-bold">Team Structure</h3>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            Design Engineers might be embedded in product teams, sit within a
            design systems team, or operate as a bridge function that serves
            multiple teams. The organisational structure matters less than the
            impact: they ensure design intent translates to implementation
            without degradation.
          </p>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            At some companies, Design Engineers own the entire UI layer. At
            others, they focus on particularly complex interactions, new
            patterns, or high-visibility features. The scope varies, but the
            skillset remains consistent.
          </p>
        </div>

        {/* Why Design Engineers Matter */}
        <div className="mb-16">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Why Design Engineers Matter
          </h2>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            Product development has historically suffered from a translation
            problem. Designers create in tools optimised for visual exploration.
            Engineers implement in environments optimised for logic and scale.
            The handoff between these worlds is where quality degrades.
          </p>

          <p className="mb-8 text-neutral-700 dark:text-neutral-300">
            Design Engineers solve this by being native to both.
          </p>

          <Callout className="my-8">
            <p className="text-lg font-medium">
              &quot;The best products don&apos;t feel designed and engineered
              separately. They feel cohesive. Design Engineers make that
              cohesion possible.&quot;
            </p>
          </Callout>

          <h3 className="mt-8 mb-4 text-2xl font-bold">Business Impact</h3>

          <div className="my-6 space-y-4">
            <div className="flex gap-4">
              <Target className="text-swiss-red mt-1 h-6 w-6 shrink-0" />
              <div>
                <h4 className="mb-1 font-bold">Faster Iteration</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Design Engineers can validate ideas in production-quality
                  code, eliminating the slow back-and-forth of traditional
                  handoff cycles.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Target className="text-swiss-red mt-1 h-6 w-6 shrink-0" />
              <div>
                <h4 className="mb-1 font-bold">Higher Quality Output</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  When the person implementing understands design intent deeply,
                  details don&apos;t get lost. Animations feel right. Spacing is
                  precise. The product feels polished.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Target className="text-swiss-red mt-1 h-6 w-6 shrink-0" />
              <div>
                <h4 className="mb-1 font-bold">Better Communication</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Design Engineers speak both languages, reducing
                  miscommunication and helping teams understand each
                  other&apos;s constraints and possibilities.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Target className="text-swiss-red mt-1 h-6 w-6 shrink-0" />
              <div>
                <h4 className="mb-1 font-bold">Design System Adoption</h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Design systems built by people who understand both design and
                  engineering are more likely to actually get used. They&apos;re
                  designed for real implementation.
                </p>
              </div>
            </div>
          </div>

          <h3 className="mt-8 mb-4 text-2xl font-bold">Product Impact</h3>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            Beyond velocity and process improvements, Design Engineers raise the
            quality bar. They notice when an animation timing feels slightly
            off. They catch spacing inconsistencies. They ensure interactions
            are smooth, accessible, and feel native to the platform.
          </p>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            This attention to detail compounds. Products built with Design
            Engineering involvement feel more cohesive, more polished, more
            considered. Users might not consciously notice these details, but
            they feel them.
          </p>
        </div>

        {/* Vibe Coding vs Design Engineering */}
        <div className="mb-16">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Design Engineering vs Vibe Coding
          </h2>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            With AI tools making it easier to generate designs and code,
            there&apos;s a growing category of work we call &quot;Vibe
            Coding&quot;. It&apos;s prompting AI and hoping for good output.
            It&apos;s tempting, fast, and increasingly accessible.
          </p>

          <p className="mb-6 text-neutral-700 dark:text-neutral-300">
            The risk is shipping what you don&apos;t understand. It can be easy
            to accidentally expose API keys in the client, mishandle personal
            data, or skip basic security controls like authentication,
            authorisation, and permission checks.
          </p>

          <p className="mb-8 text-neutral-700 dark:text-neutral-300">
            But it&apos;s fundamentally different from Design Engineering.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aspect</TableHead>
                <TableHead>Vibe Coding</TableHead>
                <TableHead>Design Engineering</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Process</TableCell>
                <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                  Prompt, iterate, accept output
                </TableCell>
                <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                  Design with intent, implement with understanding
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Decisions</TableCell>
                <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                  AI makes aesthetic choices
                </TableCell>
                <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                  Human makes aesthetic choices based on principles
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Understanding</TableCell>
                <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                  Surface-level &quot;this looks okay&quot;
                </TableCell>
                <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                  Deep knowledge of why choices work
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Iteration</TableCell>
                <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                  Re-prompt and hope for better output
                </TableCell>
                <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                  Systematic refinement based on principles
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Quality</TableCell>
                <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                  Inconsistent, derivative, generic
                </TableCell>
                <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                  Consistent, intentional, polished
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Skill Development</TableCell>
                <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                  Dependency on tools, limited growth
                </TableCell>
                <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                  Compounding skills, continuous improvement
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Edge Cases</TableCell>
                <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                  Breaks down when AI doesn&apos;t &quot;get it&quot;
                </TableCell>
                <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                  Handles complexity with understanding
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            Vibe Coding might get you 70% of the way there quickly. But that
            last 30% is the polish, the edge cases, and the subtle refinements
            that make interfaces feel professional. That requires actual
            understanding.
          </p>

          <p className="mb-8 text-neutral-700 dark:text-neutral-300">
            Design Engineers use AI tools. But they use them as accelerators,
            not replacements for knowledge. They can evaluate AI output
            critically because they understand the principles. They know when to
            accept a suggestion and when to override it.
          </p>

          <Callout label="The real difference" className="my-8">
            <p className="text-neutral-700 dark:text-neutral-300">
              Vibe Coding asks &quot;Does this look okay?&quot; Design
              Engineering asks &quot;Why does this work, and how can we make it
              better?&quot;
            </p>
          </Callout>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            AI is a powerful tool in a Design Engineer&apos;s kit. But the value
            comes from knowing design principles deeply enough to guide the
            tools, not just accept their output.
          </p>
        </div>

        {/* Companies Hiring Design Engineers */}
        <div className="mb-16">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Companies Hiring Design Engineers
          </h2>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            Design Engineering roles exist across the tech industry, from
            established tech giants to early-stage startups. The role is
            particularly valuable at companies that care deeply about product
            quality and design craft.
          </p>

          <h3 className="mt-8 mb-4 text-2xl font-bold">Notable Examples</h3>

          <div className="my-6 grid gap-6 md:grid-cols-2">
            <div className="border border-neutral-200 p-6 dark:border-neutral-800">
              <h4 className="mb-2 font-bold">Apple</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Design and engineering integration is fundamental to
                Apple&apos;s culture. Design Engineers work across platforms,
                ensuring consistency and polish in every interaction.
              </p>
            </div>
            <div className="border border-neutral-200 p-6 dark:border-neutral-800">
              <h4 className="mb-2 font-bold">Stripe</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Known for exceptional UI polish. Their Design Engineers build
                and maintain design systems used by millions of developers.
              </p>
            </div>
            <div className="border border-neutral-200 p-6 dark:border-neutral-800">
              <h4 className="mb-2 font-bold">Vercel</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Design Engineering is core to building developer tools that are
                both powerful and beautiful. Focus on interaction details and
                animations.
              </p>
            </div>
            <div className="border border-neutral-200 p-6 dark:border-neutral-800">
              <h4 className="mb-2 font-bold">DuckDuckGo</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Privacy-focused search and browser company where Design
                Engineers bridge design and implementation across web, mobile,
                and browser extensions.
              </p>
            </div>
            <div className="border border-neutral-200 p-6 dark:border-neutral-800">
              <h4 className="mb-2 font-bold">Airbnb</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Pioneered design systems thinking. Design Engineers maintain the
                system and ensure consistency across a complex product.
              </p>
            </div>
            <div className="border border-neutral-200 p-6 dark:border-neutral-800">
              <h4 className="mb-2 font-bold">Figma</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Building tools for designers requires deep design understanding.
                Design Engineers ensure the product practises what it preaches.
              </p>
            </div>
          </div>

          <h3 className="mt-8 mb-4 text-2xl font-bold">Beyond Big Tech</h3>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            Design Engineering isn&apos;t just for major companies. Startups
            increasingly value the role because it allows small teams to move
            fast without sacrificing quality. One Design Engineer can do the
            work that might otherwise require dedicated designers and frontend
            engineers.
          </p>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            You&apos;ll also find Design Engineers at agencies, design tool
            companies, developer tool companies, and anywhere that product
            quality and design craft matter. The role is particularly valuable
            when:
          </p>

          <ul className="mb-4 ml-6 list-disc space-y-2 text-neutral-700 dark:text-neutral-300">
            <li>Design and engineering need tight integration</li>
            <li>Product quality is a competitive differentiator</li>
            <li>The team is building a design system or component library</li>
            <li>Interaction design and animation are core to the experience</li>
            <li>The product serves designers or developers</li>
          </ul>

          <h3 className="mt-8 mb-4 text-2xl font-bold">Hiring Trends</h3>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            Demand for Design Engineers has grown significantly in recent years.
            As products become more interactive and design-forward, companies
            realise they need people who can bridge both worlds.
          </p>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            The challenge is that traditional hiring pipelines don&apos;t
            produce many Design Engineers. Design programmes don&apos;t teach
            production code, and engineering programmes don&apos;t teach visual
            design. Most Design Engineers are self-taught or have deliberately
            pursued both disciplines.
          </p>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            This creates opportunity. Companies are actively looking for Design
            Engineers, and the supply hasn&apos;t caught up with demand.
          </p>
        </div>

        {/* Becoming a Design Engineer */}
        <div className="mb-16">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Becoming a Design Engineer
          </h2>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            Design Engineering isn&apos;t a skill you&apos;re born with.
            It&apos;s a discipline you learn. The path typically starts from one
            side (design or engineering) and deliberately builds capability on
            the other.
          </p>

          <p className="mb-4 text-neutral-700 dark:text-neutral-300">
            If you&apos;re a designer, that means going beyond vibe coding and
            AI prompts to develop real technical skills. Learning to write
            production-quality code, understanding performance and
            accessibility, and being able to implement your own designs.
          </p>

          <p className="mb-8 text-neutral-700 dark:text-neutral-300">
            If you&apos;re an engineer, it means developing design taste.
            Learning visual design principles, typography, colour theory, and
            layout. Understanding why designs work, not just how to implement
            them.
          </p>

          <div className="my-8 grid gap-6 md:grid-cols-2">
            <div className="border-swiss-red border-l-4 bg-neutral-50 p-6 dark:bg-neutral-900">
              <h3 className="mb-3 font-bold">For Designers</h3>
              <p className="mb-4 text-sm text-neutral-700 dark:text-neutral-300">
                Go beyond Vibe Coding. Learn HTML, CSS, and JavaScript (or
                Swift/SwiftUI, Kotlin/Compose for native platforms). Build real
                projects. Understand how code works, not just how to prompt AI.
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Focus on: semantic HTML, CSS layout, JavaScript fundamentals,
                component thinking, state management, animations in code.
              </p>
            </div>
            <div className="border-swiss-red border-l-4 bg-neutral-50 p-6 dark:bg-neutral-900">
              <h3 className="mb-3 font-bold">For Engineers</h3>
              <p className="mb-4 text-sm text-neutral-700 dark:text-neutral-300">
                Develop design taste. Study typography, colour, spacing, and
                layout. Learn to see like a designer. Practice making aesthetic
                decisions and understanding why they work.
              </p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Focus on: design principles, typography fundamentals, colour
                theory, spacing systems, visual hierarchy, design tools (Figma).
              </p>
            </div>
          </div>

          <p className="mb-8 text-neutral-700 dark:text-neutral-300">
            The intersection of these skills is where Design Engineering lives.
            It&apos;s not about being world-class at both. It&apos;s about being
            capable enough in both that you can work independently and bridge
            between teams.
          </p>

          <div className="my-8 flex flex-col items-center gap-6 border-t border-neutral-200 bg-neutral-50 py-12 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="text-center">
              <h3 className="mb-2 text-2xl font-bold">
                Ready to Learn Design Engineering?
              </h3>
              <p className="mb-6 text-neutral-600 dark:text-neutral-400 px-4">
                Our course teaches both the design and engineering skills you
                need, from fundamentals to advanced topics.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <NextLink
                href="/course"
                className="focus-ring bg-swiss-red flex items-center gap-2 px-8 py-4 text-base font-bold tracking-wider text-white uppercase transition-[background-color,transform] duration-150 ease-out hover:bg-neutral-900 active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none dark:hover:bg-white dark:hover:text-black"
              >
                Explore the Course
                <ArrowRight className="h-5 w-5" />
              </NextLink>
              <NextLink
                href="/about"
                className="focus-ring flex items-center gap-2 border border-neutral-900 bg-white px-8 py-4 text-base font-medium tracking-wider text-neutral-900 uppercase transition-[background-color,border-color,transform] duration-150 ease-out hover:bg-neutral-50 active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none dark:border-white dark:bg-black dark:text-white dark:hover:bg-neutral-900"
              >
                Learn More About Us
              </NextLink>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="mb-16">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Key Takeaways</h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <Zap className="text-swiss-red mt-1 h-5 w-5 shrink-0" />
              <p className="text-neutral-700 dark:text-neutral-300">
                Design Engineers bridge design and engineering, translating
                between both worlds without losing fidelity.
              </p>
            </div>
            <div className="flex gap-4">
              <Zap className="text-swiss-red mt-1 h-5 w-5 shrink-0" />
              <p className="text-neutral-700 dark:text-neutral-300">
                The title varies (UI Engineer, Design Technologist, Creative
                Developer, etc.), but the capability is consistent: shipping
                beautiful, polished interfaces.
              </p>
            </div>
            <div className="flex gap-4">
              <Zap className="text-swiss-red mt-1 h-5 w-5 shrink-0" />
              <p className="text-neutral-700 dark:text-neutral-300">
                Design Engineering differs from vibe coding. It&apos;s based on
                deep understanding of principles, not just prompting AI.
              </p>
            </div>
            <div className="flex gap-4">
              <Zap className="text-swiss-red mt-1 h-5 w-5 shrink-0" />
              <p className="text-neutral-700 dark:text-neutral-300">
                Companies like Apple, Stripe, Vercel, DuckDuckGo, Airbnb, and
                Figma actively hire Design Engineers.
              </p>
            </div>
            <div className="flex gap-4">
              <Zap className="text-swiss-red mt-1 h-5 w-5 shrink-0" />
              <p className="text-neutral-700 dark:text-neutral-300">
                Design Engineering is a learnable discipline. It requires
                deliberately building skills on both sides of the divide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
