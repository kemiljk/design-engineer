import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FAQAccordion } from "./faq-accordion";

export const metadata: Metadata = {
  title: "FAQ | Design Engineer Course",
  description: "Frequently asked questions about the Design Engineer Course. Learn about pricing, access, curriculum, and more.",
};

const faqs = [
  {
    category: "About the Course",
    questions: [
      {
        q: "What is Design Engineering?",
        a: "Design Engineering sits at the intersection of design and front-end development. Design Engineers can take a concept from idea to shipped product—they understand visual design principles, can prototype interactions, and write production-ready code. This course teaches you both disciplines so you can bridge the gap between design and engineering teams.",
      },
      {
        q: "Who is this course for?",
        a: "This course is designed for two types of learners: (1) Designers who want to go beyond Vibe Coding—instead of prompting AI and hoping for the best, you'll develop real skills to understand implementation, own the build process, and create work that stands up to scrutiny. (2) Engineers who want to ship beautiful, thoroughly considered UIs—not just functional code, but polished interfaces that users love, with the design taste to make confident visual decisions.",
      },
      {
        q: "What will I be able to do after completing the course?",
        a: "You'll be able to: design user interfaces using established principles and patterns, build responsive web applications with HTML, CSS, and JavaScript, create native iOS apps with Swift and SwiftUI, develop Android apps with Kotlin and Jetpack Compose, implement smooth animations and micro-interactions, ensure your products are accessible to all users, and ship polished, production-ready interfaces.",
      },
      {
        q: "How long does the course take to complete?",
        a: "The full course contains 156 lessons across all tracks. At an average pace of 8-10 minutes per lesson, you can complete a single platform track (Web, iOS, or Android) in about 15-20 hours. Most students complete their chosen track in 4-8 weeks while working or studying. You have lifetime access, so you can learn at your own pace.",
      },
      {
        q: "Do I need any prior experience?",
        a: "No prior experience is required for the beginner tracks. The Design Track assumes no coding knowledge, and the Engineering Track starts from the fundamentals. However, you should be comfortable using a computer and have a genuine interest in building digital products. Note: Convergence All-Access gives you the complete course including foundational and advanced content - you can progress through it at your own pace. The advanced Convergence modules work best after completing Design and Engineering fundamentals.",
      },
    ],
  },
  {
    category: "Pricing & Access",
    questions: [
      {
        q: "How much does the course cost?",
        a: "We offer flexible pricing: individual platform tracks (e.g., Design for Web, Engineering for iOS) are available separately, or you can purchase Convergence All-Access for complete access to EVERYTHING at a significant discount. Convergence includes all 156 lessons across all Design tracks, Engineering tracks, and Convergence content for Web, iOS, and Android. Check our pricing page to see the savings. All purchases include lifetime access.",
      },
      {
        q: "Is there a free trial?",
        a: "Yes! The introduction module and the first lesson of each track are completely free—no credit card required. This lets you experience the course quality and teaching style before purchasing.",
      },
      {
        q: "What's included in my purchase?",
        a: "Your purchase includes: lifetime access to all course content in your chosen track(s), interactive exercises and quizzes, progress tracking, the ability to take notes on lessons, future updates to the curriculum, and access to any new lessons added to your tracks.",
      },
      {
        q: "Do you offer refunds?",
        a: "Yes, we offer a 14-day money-back guarantee. If you're not satisfied with the course for any reason, contact us within 14 days of purchase for a full refund—no questions asked.",
      },
      {
        q: "Can I upgrade my access later?",
        a: "Absolutely! If you purchase a single track and later want to upgrade to Convergence All-Access (complete course access), you can upgrade and only pay the difference. Contact us at hello@designengineer.xyz and we'll provide an upgrade link. We highly recommend starting with Convergence All-Access as it provides the best value and complete learning experience.",
      },
      {
        q: "Do you offer student discounts?",
        a: "Yes! Students currently enrolled in university or college receive 30% off any course purchase. Simply visit our pricing page and use the student discount form - enter your student email address (.edu, .ac.uk, etc.), and you'll receive a unique discount code instantly via email. The code is single-use and non-transferable. This makes the complete Convergence All-Access course significantly more affordable for students. If your student email isn't recognised, contact us at hello@designengineer.xyz.",
      },
      {
        q: "Do you offer team or enterprise pricing?",
        a: "Yes, we offer discounted rates for teams of 5 or more. Contact us at hello@designengineer.xyz for team pricing and to discuss your organisation's needs.",
      },
    ],
  },
  {
    category: "Course Content",
    questions: [
      {
        q: "What platforms/technologies does the course cover?",
        a: "The course covers three platforms: Web (HTML, CSS, JavaScript, React), iOS (Swift, SwiftUI), and Android (Kotlin, Jetpack Compose). Each platform has its own Design Track, Engineering Track, and Convergence modules so you can specialise in your preferred platform.",
      },
      {
        q: "Is the content kept up to date?",
        a: "Yes, we regularly update the course content to reflect the latest best practices, framework updates, and platform guidelines. When major updates happen (like new iOS versions or web standards), we update the relevant lessons. As a student, you get access to all updates at no extra cost.",
      },
      {
        q: "Are there practical exercises?",
        a: "Yes! Each lesson includes interactive exercises, quizzes, and challenges. These range from multiple-choice knowledge checks to code exercises where you spot issues or fix bugs. The exercises are designed to reinforce learning and help you apply concepts immediately.",
      },
      {
        q: "Can I download the course content?",
        a: "The course is designed as an online learning experience with interactive elements that work best in the browser. However, you can take notes directly within lessons, and these notes are saved to your account for future reference.",
      },
      {
        q: "What's the difference between the tracks?",
        a: "The Design Track helps engineers develop real design taste—you'll learn visual design principles, design tools, design systems, and UX fundamentals that AI simply can't teach. Understand why designs work and make confident visual decisions. The Engineering Track helps designers go beyond Vibe Coding—programming from scratch with real understanding, not just AI prompts. Learn HTML, CSS, JavaScript, and build with intention. The Convergence All-Access purchase gives you EVERYTHING: all Design tracks, all Engineering tracks, PLUS the exclusive advanced Convergence content covering animation, prototyping, accessibility, performance, and the complete Design Engineer workflow. Convergence is the best value - it's the complete course.",
      },
    ],
  },
  {
    category: "Technical Requirements",
    questions: [
      {
        q: "What do I need to take this course?",
        a: "You need a computer (Mac, Windows, or Linux) and an internet connection. For iOS development, you'll need a Mac with Xcode. For Android development, you can use any operating system with Android Studio. For web development, any modern browser and a code editor (we recommend VS Code) will work.",
      },
      {
        q: "Do I need to buy any software?",
        a: "Most tools we use are free: VS Code, Android Studio, and Figma (free tier). For iOS development, Xcode is free but requires a Mac. If you want to publish apps to the App Store or Play Store, you'll need developer accounts ($99/year for Apple, $25 one-time for Google), but these aren't required for learning.",
      },
      {
        q: "Can I take the course on mobile?",
        a: "The course content is accessible on mobile devices, but for the best learning experience—especially for coding exercises—we recommend using a laptop or desktop computer.",
      },
    ],
  },
  {
    category: "Support & Community",
    questions: [
      {
        q: "How do I get help if I'm stuck?",
        a: "You can reach us at hello@designengineer.xyz for course-related questions. We aim to respond within 24-48 hours on business days. For technical issues or bugs, please include as much detail as possible.",
      },
      {
        q: "Is there a community or forum?",
        a: "We're building a community for Design Engineer students. Sign up for our newsletter to be notified when it launches. In the meantime, you can connect with other Design Engineers on Twitter/X using #DesignEngineer.",
      },
      {
        q: "Do you offer certificates?",
        a: "Yes, upon completing a full track (Design + Engineering + Convergence for a platform), you'll receive a certificate of completion that you can share on LinkedIn or include in your portfolio.",
      },
    ],
  },
  {
    category: "Career & Outcomes",
    questions: [
      {
        q: "Will this help me get a job?",
        a: "The skills taught in this course are highly sought after. Design Engineers are in demand at companies like Apple, Airbnb, Stripe, Vercel, DuckDuckGo, and many startups. While we can't guarantee employment, completing this course will give you a portfolio-ready skillset and the knowledge to succeed in Design Engineer, Frontend Developer, or UI/UX Designer roles.",
      },
      {
        q: "What kind of portfolio projects will I build?",
        a: "Throughout the course, you'll build various components, interfaces, and interactions that you can showcase in your portfolio. The exercises focus on real-world patterns you'd encounter in professional settings.",
      },
      {
        q: "Is Design Engineering a real job title?",
        a: "Yes! While the title varies by company (Design Engineer, UI Engineer, Frontend Designer, Design Technologist, Creative Developer), the role is well-established. Companies like Apple, Airbnb, DuckDuckGo, Figma, Stripe, and many others have dedicated Design Engineering positions.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 dark:bg-neutral-950">
      <div className="container-readable py-12">
        <Link
          href="/course"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>

        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Everything you need to know about the Design Engineer Course. 
            Can&apos;t find what you&apos;re looking for?{" "}
            <a 
              href="mailto:hello@designengineer.xyz" 
              className="text-swiss-red hover:underline"
            >
              Get in touch
            </a>.
          </p>
        </div>

        <div className="space-y-12">
          {faqs.map((category) => (
            <section key={category.category}>
              <h2 className="mb-6 text-xl font-bold">{category.category}</h2>
              <FAQAccordion questions={category.questions} />
            </section>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 rounded-none border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-2 text-xl font-bold">Still have questions?</h2>
          <p className="mb-6 text-neutral-600 dark:text-neutral-400">
            We&apos;re here to help. Reach out and we&apos;ll get back to you as soon as possible.
          </p>
          <a
            href="mailto:hello@designengineer.xyz"
            className="inline-flex items-center gap-2 bg-swiss-red px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-black"
          >
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
}
