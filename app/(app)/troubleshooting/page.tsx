import { Callout } from "@/components/reader/callout";
import { CodeBlock } from "@/components/reader/code-block";

export default function TroubleshootingPage() {
  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 md:py-14 max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-3">
          Reference
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-medium leading-tight text-parchment mb-3">
          Troubleshooting &amp; Focus
        </h1>
        <p className="font-serif text-lg text-[#c9c6bd]/60 italic">
          Bugs you will hit. Blocks you will feel. How to keep moving.
        </p>
      </div>

      <div className="prose-course-dark space-y-6 [&>div]:my-8 [&>pre]:my-8">

        <h2 className="font-serif text-2xl font-medium text-parchment mt-12 mb-4">Common Bugs &amp; Errors</h2>

        <h3 className="font-mono text-base font-medium text-gold mt-8 mb-2">The agent&rsquo;s code doesn&rsquo;t compile on first try</h3>
        <p>
          This is normal. AI agents produce code that looks right but has small errors — missing imports,
          wrong TypeScript types, mismatched library versions. When you see a red error, paste the
          full error message back to the agent. Do not try to fix it yourself unless you know exactly
          what it is. The agent can iterate on its own output faster than you can.
        </p>
        <CodeBlock
          language="prompt"
          code="The build failed with this error: [paste error]. Fix it and show me the corrected file."
        />

        <h3 className="font-mono text-base font-medium text-gold mt-8 mb-2">Style not applying / CSS not working</h3>
        <p>
          Tailwind requires class names to be complete strings. If the agent builds a class name
          dynamically (like <code className="text-gold">bg-{`{color}`}-500</code>), Tailwind won&rsquo;t
          detect it and the style won&rsquo;t exist in the compiled CSS. Always use complete class names.
        </p>
        <Callout variant="warning" title="tailwind_trap">
          Dynamic class construction (template literals with variables) is NOT detected by Tailwind&rsquo;s
          purging. Use complete class names or add them to the safelist in tailwind.config.ts.
        </Callout>

        <h3 className="font-mono text-base font-medium text-gold mt-8 mb-2">&ldquo;Module not found&rdquo; after install</h3>
        <p>
          Usually fixed by restarting your dev server. If that doesn&rsquo;t work, delete
          <code className="text-gold"> node_modules</code> and <code className="text-gold">.next</code>,
          then reinstall:
        </p>
        <CodeBlock
          language="bash"
          code="rm -rf node_modules .next && npm install && npm run dev"
        />

        <h3 className="font-mono text-base font-medium text-gold mt-8 mb-2">The API route returns 500</h3>
        <p>
          Check your server logs (the terminal where <code className="text-gold">npm run dev</code> is running).
          The actual error message is there. API route errors often come from: missing environment variables,
          wrong database connection strings, or CORS issues. Add logging at each step to narrow it down.
        </p>

        <h2 className="font-serif text-2xl font-medium text-parchment mt-12 mb-4">Mental Blocks</h2>

        <h3 className="font-mono text-base font-medium text-gold mt-8 mb-2">&ldquo;I don&rsquo;t know what to ask the agent&rdquo;</h3>
        <p>
          This is the most common block. You&rsquo;re staring at a blank screen and the cursor is blinking.
          The fix: stop trying to be clever. Describe the smallest possible next step in plain English.
          &ldquo;Add a button that says Save that calls this API endpoint.&rdquo; You don&rsquo;t need to
          know how to implement it — that&rsquo;s the agent&rsquo;s job.
        </p>
        <Callout variant="tip" title="rule_of_thumb">
          If you can&rsquo;t describe the next step in 15 words, you haven&rsquo;t broken it down enough.
          Break it smaller.
        </Callout>

        <h3 className="font-mono text-base font-medium text-gold mt-8 mb-2">&ldquo;I broke something and can&rsquo;t undo it&rdquo;</h3>
        <p>
          This is why you commit early and often. If you didn&rsquo;t commit, and the agent made changes
          you can&rsquo;t reverse, use <code className="text-gold">git diff</code> to see exactly what
          changed. Revert individual files with <code className="text-gold">git checkout -- filename</code>.
          If you committed, roll back cleanly.
        </p>
        <CodeBlock
          language="bash"
          code={`# See what changed
git diff

# Revert a single file
git checkout -- src/app/page.tsx

# Roll back to last good commit
git reset --hard HEAD~1`}
        />

        <h3 className="font-mono text-base font-medium text-gold mt-8 mb-2">&ldquo;I&rsquo;m stuck and don&rsquo;t know why&rdquo;</h3>
        <p>
          Stuck means your prompt didn&rsquo;t produce what you expected. Don&rsquo;t rephrase randomly.
          Identify the exact gap: is the component rendering but wrong? Not rendering at all? Error in
          console? Data not loading? Pick one and prompt specifically about it. &ldquo;The gallery shows
          empty cards — the images aren&rsquo;t loading. Check the image paths.&rdquo; is useful.
          &ldquo;Fix the gallery&rdquo; is not.
        </p>

        <h2 className="font-serif text-2xl font-medium text-parchment mt-12 mb-4">Building a Working Routine</h2>

        <h3 className="font-mono text-base font-medium text-gold mt-8 mb-2">Timebox your sessions</h3>
        <p>
          Set a timer for 45 minutes. When it goes off, step away for 10 minutes. Stand up, look at
          something far away, stretch. The number of bugs you&rsquo;ll solve after a 10-minute break
          is disproportionately higher than solving them while staring at the screen.
        </p>

        <h3 className="font-mono text-base font-medium text-gold mt-8 mb-2">One change at a time</h3>
        <p>
          The most common beginner mistake: asking the agent to make three changes at once, then
          getting broken code and not knowing which change broke it. One change. Commit. Next change.
          Commit. This is not slow — it&rsquo;s fast, because you never have to undo work.
        </p>
        <Callout variant="rule" title="one_change">
          One prompt → one change → test → commit. If the test fails, you know exactly what caused it.
          This single habit will save you more time than any tool or framework.
        </Callout>

        <h3 className="font-mono text-base font-medium text-gold mt-8 mb-2">When to stop debugging and ask for help</h3>
        <p>
          If you&rsquo;ve spent 15 minutes on the same error and haven&rsquo;t made progress, stop.
          You are not going to solve it in minute 16 by trying harder. Do one of:
        </p>
        <ul className="font-sans text-[#c9c6bd]">
          <li>Paste the full error + your code to the AI agent and ask for a fresh approach.</li>
          <li>Write down what you know and what you don&rsquo;t know in a text file — this surfaces assumptions.</li>
          <li>Walk away for 10 minutes. Most bugs are obvious after a break.</li>
          <li><b>Premium users:</b> send the error to support. That&rsquo;s what it&rsquo;s there for.</li>
        </ul>

        <h3 className="font-mono text-base font-medium text-gold mt-8 mb-2">Keep a &ldquo;fuckups&rdquo; file</h3>
        <p>
          Every time you spend more than 10 minutes on a bug, write it down: the error, what you
          thought was wrong, what actually fixed it. After 10 entries, you&rsquo;ll have a personal
          reference of your own most common mistakes. After 50, you won&rsquo;t make them anymore.
        </p>
        <Callout variant="insight" title="pro_tip">
          A &ldquo;fuckups&rdquo; file is the single most underrated tool in professional development.
          It turns experience into a searchable document. Start yours today.
        </Callout>
      </div>
    </div>
  );
}
