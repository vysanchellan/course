import Link from "next/link";
import { CodeBlock } from "@/components/reader/code-block";
import { Callout } from "@/components/reader/callout";

const starterPrompt = `Build me a one-page personal landing page.

Design:
- Clean, minimal, professional
- Dark mode with a warm accent color (think gold or amber)
- One column, centered layout
- The accent color should appear on headings, borders, and hover states

Content:
- Name: [Your Name]
- One-liner tagline: [e.g. "I build websites that help small businesses grow"]
- Three link buttons at the bottom: GitHub, LinkedIn, Contact
- A short bio paragraph (2-3 sentences about what you do)

Tech:
- Single HTML file, no framework
- Use CSS custom properties for the color scheme
- Include a subtle animated gradient background
- Font: system sans-serif
- Responsive: looks good on mobile and desktop

Make it look like a real professional landing page, not a demo.
Ship it as a single HTML file I can open in a browser right now.`;

export default function MyFirstWebsitePage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 md:py-14 max-w-3xl mx-auto">
      {/* Reassurance line */}
      <Callout variant="tip" title="Before you begin">
        This is just the spark. The real value — deployment, pricing, getting
        paid, what breaks — is the fourteen chapters after this. But first,
        let&rsquo;s prove the process works.
      </Callout>

      {/* Header */}
      <div className="mb-10">
        <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-3">
          Start here
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-medium text-parchment leading-tight mb-3">
          Build something now.
        </h1>
        <p className="font-serif text-lg text-[#c9c6bd]/80 italic">
          The quickest way to prove the guide works: ship a real page before you read a chapter.
        </p>
      </div>

      {/* The example */}
      <section className="mb-14">
        <h2 className="font-serif text-2xl font-medium text-parchment mb-4">
          1. See what&rsquo;s possible.
        </h2>
        <p className="font-serif text-base text-[#c9c6bd]/80 leading-relaxed mb-6">
          Here is the exact prompt someone used to build a personal landing page.
          Paste it into any AI coding tool, and you&rsquo;ll get a real, working page
          in under 60 seconds.
        </p>
        <CodeBlock
          code={starterPrompt}
          language="Prompt"
        />
        <p className="font-serif text-sm text-[#c9c6bd]/60 mt-4">
          The result: a responsive, dark-mode personal landing page with a gold
          accent, animated gradient background, and three link buttons — all in a
          single HTML file. Open it in your browser and it looks like a real
          professional site, not a tutorial demo.
        </p>
      </section>

      {/* Do it yourself */}
      <section className="mb-14">
        <h2 className="font-serif text-2xl font-medium text-parchment mb-4">
          2. Your turn.
        </h2>
        <p className="font-serif text-base text-[#c9c6bd]/80 leading-relaxed mb-4">
          Copy the prompt above, replace the <code className="font-mono text-sm text-gold bg-panelborder px-1.5 py-0.5 rounded">[bracketed]</code> placeholders
          with your own details, and paste it into your AI coding tool of choice
          — Claude, ChatGPT, Cursor, or OpenCode (the course covers OpenCode
          specifically in Chapter 2).
        </p>
        <p className="font-serif text-base text-[#c9c6bd]/80 leading-relaxed mb-6">
          In under 10 minutes, you&rsquo;ll have a real page with your name, your
          tagline, and your links on it. That&rsquo;s not a demo — that&rsquo;s the first
          deliverable.
        </p>
        <Callout variant="note" title="Any tool works">
          The prompt is designed to work with any AI coding assistant. Don&rsquo;t
          overthink which one to use — pick whichever you have access to right
          now. The course later covers why OpenCode is the recommended choice
          for production work.
        </Callout>
      </section>

      {/* What to focus on next */}
      <section className="mb-10">
        <h2 className="font-serif text-2xl font-medium text-parchment mb-4">
          3. What to focus on next.
        </h2>
        <p className="font-serif text-base text-[#c9c6bd]/80 leading-relaxed mb-6">
          That page is real, but it&rsquo;s not deployed. It&rsquo;s not priced. It&rsquo;s not
          something you can charge for yet. The guide takes what you just built
          and makes it durable. Here&rsquo;s the fastest path through:
        </p>
        <ol className="space-y-4">
          {[
            {
              num: "01",
              label: "The Exact Toolkit and Workflow",
              href: "/course/toolkit-and-workflow",
              desc: "Set up the real stack so your page isn&rsquo;t just a file on your computer.",
            },
            {
              num: "05",
              label: "The Initial Build",
              href: "/course/the-initial-build",
              desc: "Turn that single HTML file into a proper project — 20 minutes, done right.",
            },
            {
              num: "07",
              label: "Deployment",
              href: "/course/deployment",
              desc: "Put your page on the internet with a real URL anyone can visit.",
            },
          ].map((item) => (
            <li key={item.num} className="flex gap-4">
              <span className="font-mono text-[11px] text-gold shrink-0 mt-0.5">
                {item.num}
              </span>
              <div>
                <Link
                  href={item.href}
                  className="font-mono text-sm text-parchment hover:text-gold transition-colors"
                >
                  {item.label} →
                </Link>
                <p className="font-serif text-sm text-[#c9c6bd]/60 mt-0.5">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Bottom navigation */}
      <div className="pt-8 border-t border-panelborder">
        <Link
          href="/course/introduction"
          className="inline-flex items-center gap-2 font-mono text-sm text-gold hover:underline"
        >
          Continue to Introduction →
        </Link>
      </div>
    </div>
  );
}
