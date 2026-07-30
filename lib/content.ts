export function getLessonContent(lessonId: string): string {
  const contentMap: Record<string, string> = {
    introduction: `
<p class="lede">Most content selling "build a website with AI" stops the moment something appears on screen. That's the easy part.</p>

<p>This guide covers the other 80%: deploying it properly, securing it, connecting a real database, and knowing what to do when it breaks — because it will, eventually, and an AI agent will not always be able to fix that for you.</p>

<p>You are not here to learn how to type instructions at an AI and hope for the best. You are here to learn <strong>prompt engineering</strong> — giving an agent precise, structured instructions so it builds correctly the first time, instead of burning tokens and hours on five vague retries. That distinction is the actual skill this guide teaches. Everything else follows from it.</p>

<h3>The stack used throughout this guide, and what it costs</h3>

<div class="chips">
  <span class="chip gold">Claude Code — the primary tool</span>
  <span class="chip ghost">OpenCode — free alternative</span>
  <span class="chip">GitHub — free tier</span>
  <span class="chip">Vercel — free tier</span>
  <span class="chip">Supabase — free tier</span>
</div>

<p>That's it. Realistically one modest, usage-based cost — <strong>Claude Code</strong> — and everything else free. If you want a genuinely $0 stack, Section 2 shows you exactly how to swap in the free path without losing the workflow. If you have limited resources, this is a realistic starting point, not a watered-down version of a "real" setup.</p>

<div class="box win">
  <div class="label">What changed in this edition</div>
  Earlier drafts of this guide split the work across two tools — a chat assistant for thinking, and a separate free agent for building. That split is gone. Claude Code now does both, in one continuous session, which is faster, cheaper in wasted tokens, and produces more reliable results than juggling two tools. Section 2 explains exactly why, and what to do if your budget is genuinely zero.
</div>
`,

    "toolkit-and-workflow": `
<p class="lede">Vague advice like "use a framework and an AI agent" isn't useful. Here is the exact toolkit, named, with no filler, and the exact workflow tying it together.</p>

<div class="chips">
  <span class="chip">Next.js 15</span><span class="chip">TypeScript</span><span class="chip">Tailwind CSS</span>
  <span class="chip">shadcn/ui</span><span class="chip">GitHub</span><span class="chip">Vercel</span>
  <span class="chip">Supabase</span><span class="chip gold">Claude Code</span>
</div>

<h3>The stack</h3>

<ul>
  <li><strong>Next.js 15</strong> — the frontend framework everything is built on. Handles routing, pages, and the overall structure of the site.</li>
  <li><strong>TypeScript</strong> — the language layer on top of the framework. Catches a large class of mistakes before they ever reach a browser, which matters enormously when an AI agent is writing large chunks of code for you.</li>
  <li><strong>Tailwind CSS</strong> — the styling system. Fast to work with, and easy to describe precisely in a prompt ("a two-column grid with a 24px gap"), which agents translate accurately far more often than vague style instructions.</li>
  <li><strong>shadcn/ui</strong> — a library of pre-built, accessible interface components (buttons, forms, dialogs, navigation) that slot directly into a Next.js and Tailwind project. Using this instead of building every component from scratch saves enormous time and produces a more polished result by default.</li>
  <li><strong>GitHub</strong> — version control, covered fully in Section 6.</li>
  <li><strong>Vercel</strong> — hosting and deployment, covered fully in Section 7.</li>
  <li><strong>Supabase</strong> — the database, covered fully in Section 10.</li>
</ul>

<h3>The one primary tool, and how it fits</h3>

<p><strong>Claude Code</strong> is the agent this entire workflow is built around. It runs in your terminal (or editor) directly inside your project, and it does two jobs that used to require two separate tools: it thinks through architecture and structure with you in plain conversation, <em>and</em> it writes, edits, and runs real code against your actual files. There's no copy-pasting a plan from one tool into another — the thinking and the building happen in the same session, with full context of your project the whole time.</p>

<div class="terminal">
  <div><span class="prompt">$</span> claude</div>
  <div class="dim">&gt; Let's plan the homepage before you touch any code.</div>
  <div class="dim">&gt; Here's the context, the goal, and what not to touch...</div>
</div>

<p>Section 2 covers the free alternative — <strong>OpenCode</strong> — for anyone who wants a completely $0 build tool, and exactly what trade-off that involves.</p>

<h3>The exact workflow, tying it together</h3>

<ol class="steps">
  <li>Think through the goal with Claude Code first. Not "build me X," but a real planning conversation: what already exists, what the constraint is, what the expected output looks like.</li>
  <li>Turn that thinking into a single, precise, engineered instruction, using the structure covered fully in Section 4 (context, goal, boundaries, output format).</li>
  <li>Let Claude Code implement the actual change directly in your project — same session, no hand-off.</li>
  <li>Review what comes back critically. Does it match what was actually asked? Did it touch anything it shouldn't have?</li>
  <li>If something needs adjusting, give the next precise instruction in the same conversation, not a vague "fix it."</li>
</ol>

<div class="box">
  <div class="label">Worth knowing exists</div>
  Claude Code can also be connected to external context through MCP (Model Context Protocol) servers — giving it structured access to things like your GitHub issues, design files, or a database schema directly, rather than you pasting context in by hand every time. Not required to start, but worth knowing once the basic loop above feels comfortable.
</div>
`,

    "claude-code-vs-free-path": `
<p class="lede">Choosing your agent, and being honest about the trade-off, before you build anything.</p>

<p>This is the one paid decision in the entire stack, and it deserves a straight answer instead of a sales pitch either way.</p>

<p><strong>Claude Code</strong> is the tool this guide is built around, and it's the one recommended by default. It's usage-based (or bundled into a Claude subscription), which for a beginner building a handful of client sites a month is a genuinely modest cost — far less than the value of the time and rework it saves you. It plans and builds in one session, handles larger and messier codebases without losing the thread, and gets things right on the first or second try far more often. For the lowest realistic budget paired with the best realistic results, this is it.</p>

<p><strong>OpenCode</strong> is a free, open-source coding agent that can slot into the exact same workflow. It costs nothing to run. It is genuinely capable for most projects at the level this guide covers — a single-page site, a multi-page brochure site, a straightforward database connection. Where it starts to strain is larger codebases, longer multi-file changes, and ambiguous instructions where it has to infer intent rather than follow a precise spec.</p>

<table class="cmp">
  <tr><th>&nbsp;</th><th>Claude Code</th><th>OpenCode</th></tr>
  <tr><td class="hl">Cost</td><td>Usage-based / subscription — modest for beginner volume</td><td>$0</td></tr>
  <tr><td class="hl">Plans and builds in one session</td><td>Yes</td><td>Yes, but weaker on the planning half</td></tr>
  <tr><td class="hl">Reliability on large / messy changes</td><td>High</td><td>Fair — degrades on harder, multi-file tasks</td></tr>
  <tr><td class="hl">Best for</td><td>Any paid client work; anything you can't afford to redo</td><td>Practice projects; simple, well-specified builds; a genuinely $0 start</td></tr>
  <tr><td class="hl">Prompt engineering discipline (Section 4) required</td><td>Helps a lot</td><td>Non-negotiable — it has less room to guess right</td></tr>
</table>

<div class="box win">
  <div class="label">The honest recommendation</div>
  If you're taking this seriously as a way to make money, budget for Claude Code from day one — it pays for itself on your first small client project. If your constraint really is zero dollars right now, start with OpenCode using the exact same workflow and prompt structure in Section 4, and upgrade the moment a project outgrows it. That's a deliberate upgrade decision to make later, not a reason to avoid starting now.
</div>

<p>Everywhere the rest of this guide says "your agent," it means whichever of the two you've chosen — the workflow, the prompt structure, and every other section apply identically to both.</p>
`,

    "why-this-stack": `
<p class="lede">Understand what each piece is actually doing before you touch anything. Too many beginners memorize commands without understanding why each tool exists — which means the moment something doesn't work exactly like the tutorial, they're stuck.</p>

<p>The <strong>framework</strong> is what turns your instructions into an actual working site — pages, navigation, layout, interactivity. It's the skeleton everything else hangs off.</p>

<p><strong>GitHub</strong> is not just a backup. It's a complete history of every version of your project, ever. This matters enormously once an AI agent is writing code for you, because agents make mistakes, and a mistake without a history behind it can mean losing hours of work with no way back.</p>

<p><strong>Vercel</strong> is where your project actually becomes a live, public website. Locally, your site only exists on your machine. Deployment is the step that puts it on the internet, with a real URL anyone can visit.</p>

<p><strong>Supabase</strong> is a real database, sitting behind your site, used the moment your project needs to remember something — a booking, a contact form submission, a list of products, user accounts. Not every project needs one on day one, but almost every serious project needs one eventually.</p>

<p><strong>Claude Code</strong> is different from all of the above. It's not just a tool that outputs code — it's the layer you use to think through the structure of a project, and then implement it, without losing context between the two. This is the layer most beginners skip, and it's the layer that separates a fast, working build from hours of frustrated re-prompting.</p>

<div class="box">
  <div class="label">Worth remembering</div>
  Free tiers of GitHub, Vercel, and Supabase are not toy versions. Real, paying-client work can run entirely on them. The cost only starts to appear at a scale most beginners, and most small local businesses, will never reach.
</div>
`,

    "prompting-vs-prompt-engineering": `
<p class="lede">This is the section that matters most, and the one almost nobody selling "build fast with AI" content actually teaches properly.</p>

<div class="box warn">
  <div class="label">A vague prompt</div>
  "Make me a website for a restaurant."
</div>

<p>This gives an agent almost nothing to work with. It will guess your structure, guess your content, guess your styling — and it will guess wrong more often than not. Every wrong guess costs you a correction, and every correction costs tokens, time, and momentum.</p>

<h3>An engineered prompt has four parts</h3>

<ol class="steps">
  <li><strong>Context</strong> — what already exists (an empty project? an existing file structure? a specific framework version?), and any constraints that matter (a certain visual style, a certain page structure).</li>
  <li><strong>Goal</strong> — the specific outcome, described concretely. Not "make it nice," but "a homepage with a hero image, three feature cards below it, and a contact form at the bottom, matching the dark, editorial tone of the reference site."</li>
  <li><strong>Boundaries</strong> — what the agent should explicitly not touch or change. This single addition prevents the single most common frustration beginners have: asking for one small change and having the agent quietly break three other things.</li>
  <li><strong>Output format</strong> — what you expect back. A full file? A specific component? A plan first, before any code is written?</li>
</ol>

<h3>A layered workflow, used throughout this guide</h3>

<ol class="steps">
  <li>Think through the goal with your agent first — planning the structure, wording the exact instruction.</li>
  <li>Hand over that engineered instruction and let it implement.</li>
  <li>Review what comes back critically, not just accepting it because it "looks done."</li>
  <li>Refine with another precise instruction if needed, not a vague "fix it."</li>
</ol>

<p>This layering is the actual repeatable system. It's slower than blindly typing at first, and dramatically faster than the alternative once you've done it a handful of times, because you stop wasting rounds on guesses.</p>
`,

    "the-initial-build": `
<p class="lede">With Section 4's mindset in place, the fast build becomes real, not a trick.</p>

<h3>The process, step by step</h3>

<ol class="steps">
  <li>Set up a clean project using your chosen framework's starting template.</li>
  <li>Write your first engineered prompt — context, goal, boundaries, output format — to generate the base structure of the site: navigation, homepage layout, core pages.</li>
  <li>Review what the agent produces before accepting it. Does the structure match what you asked for? Are there placeholder sections that need real content? Does anything look broken on a quick visual check?</li>
  <li>Iterate with the same discipline — a specific instruction for the next change, with clear boundaries around what shouldn't move.</li>
</ol>

<div class="pull">That kind of multi-page consistency is exactly what falls apart with vague prompting.</div>

<p>A real example of the difference in practice: a well-structured luxury real estate site (used as a reference throughout the rest of this guide) has a clear homepage hero, a filtered listings search, individual listing pages, an about/firm page, testimonials, and a contact page — all built from a consistent visual language. That kind of multi-page consistency is exactly what falls apart with vague prompting, because each page drifts slightly from the last without a clear standing instruction tying them together.</p>

<div class="box win">
  <div class="label">The honest lesson of this section</div>
  The fast build genuinely works, once you've done the thinking in Section 4 first. Skipping straight to this section, the way most "watch me build in 20 minutes" content encourages, is exactly why those results don't reproduce when other people try it themselves.
</div>
`,

    "version-control": `
<p class="lede">Skipping version control is the single most common way beginners lose real work.</p>

<h3>What it actually protects you from</h3>

<ul>
  <li>An agent making an unwanted change and you having no way back to the working version.</li>
  <li>A client asking you to undo a change after it's already been made.</li>
  <li>Your own experimentation going wrong with nothing to revert to.</li>
</ul>

<h3>Getting started, in plain steps</h3>

<ol class="steps">
  <li>Create a free GitHub account and a new repository for your project.</li>
  <li>Connect your local project to that repository.</li>
  <li>Commit your work in small, meaningful chunks as you go, not just once at the very end. A commit after every meaningful change gives you a real undo history.</li>
  <li>Write a short, clear message with each commit describing what changed. Future-you will thank present-you.</li>
</ol>

<div class="box warn">
  <div class="label">Why this matters more with an agent involved, not less</div>
  An agent can make several changes across multiple files in a single instruction. Without commits along the way, if one of those changes is wrong, you may have no clean way to isolate and undo just that piece.
</div>

<p>Once your repository exists, connecting it to Vercel means every commit you push can automatically become a live update to your deployed site — which is exactly where Section 7 picks up.</p>
`,

    "deployment": `
<p class="lede">What deployment actually means: your project, running only on your own machine, becomes a real website with a real, public URL that anyone can visit.</p>

<h3>The process</h3>

<ol class="steps">
  <li>Connect your GitHub repository to a free Vercel account.</li>
  <li>Vercel builds your project automatically and gives you a live URL.</li>
  <li>Every time you push a new commit, Vercel rebuilds and updates the live site automatically.</li>
</ol>

<div class="terminal">
  <div><span class="prompt">$</span> git push origin main</div>
  <div class="dim">Deploying to Vercel...</div>
  <div class="ok">+ build succeeded in 24s</div>
  <div class="ok">+ environment variables verified</div>
  <div class="dim">Assigning domain...</div>
  <div class="live">✓ live at yourclient.com</div>
</div>

<h3>Reading a failed deployment, without panicking</h3>

<p>Vercel shows you a build log the moment something goes wrong. Most failures fall into one of a small handful of categories: a missing environment variable (covered fully in Section 9), a typo in the code, or a package that wasn't installed correctly. Learning to read the actual error line, rather than immediately re-prompting an agent with "it's broken, fix it," saves enormous time.</p>

<h3>Case study — a real deployed site</h3>

<p>The reference real estate site used throughout this guide is a clean example of what a finished, deployed static build looks like: multiple connected pages, consistent styling throughout, and a deployed, working state with no visible tracking scripts or bloat. Notice that a site like this, as it stands, is <em>static</em> — its listings and content are fixed at build time. That's a perfectly valid, fast, and cheap way to launch. The moment a client wants to add or edit listings themselves without you touching code every time, that site needs exactly what Section 10 covers: a real, connected database.</p>
`,

    "domain-and-dns": `
<p class="lede">A free vercel.app address is fine for a demo. A paying client needs their own domain, their real business name, in their own browser bar.</p>

<p>This step is simple, and it is where the client's money, not yours, covers the only real recurring cost in this entire stack.</p>

<h3>Buying the domain (using GoDaddy as the example)</h3>

<ol class="steps">
  <li>Search the desired domain name and add it to the cart. A plain .com, or a relevant local option, is usually the right default for a small business.</li>
  <li>Complete the purchase under the client's own details where possible, or your own if you are managing it on their behalf — just be clear with the client about who owns the domain, since this matters if you ever part ways.</li>
  <li>Skip the upsells pushed hard at checkout (extra hosting, email plans, "domain protection" add-ons). None of them are needed for what this guide covers.</li>
</ol>

<h3>Connecting the domain to your deployed Vercel project</h3>

<ol class="steps">
  <li>In your Vercel project settings, add the custom domain the client just purchased.</li>
  <li>Vercel will show you the exact DNS records it needs — usually an A record and a CNAME, or a set of nameservers, depending on the option chosen.</li>
  <li>In your registrar's DNS management panel, add the records exactly as Vercel specified. This is the step beginners get wrong most often — copy the values precisely, including any trailing characters shown.</li>
  <li>DNS changes are not instant. Propagation can take anywhere from a few minutes to a few hours. This is normal, not a sign something is broken.</li>
  <li>Once propagated, Vercel automatically issues a free SSL certificate for the domain, so the site loads securely without any extra cost or action from you.</li>
</ol>

<div class="box">
  <div class="label">What this costs, and who pays it</div>
  A domain typically runs a modest amount per year — this is the one real, recurring cost in the entire process, and it should always be billed to the client as part of the project, not absorbed by you. Framing it clearly in your pricing (Section 13) avoids any awkward conversation later about who's paying for what.
</div>
`,

    "environment-variables": `
<p class="lede">This is one of the most valuable sections in this entire guide, because it's where beginners get stuck for hours, and where almost no beginner content explains what's actually happening.</p>

<p>An <strong>environment variable</strong> is a piece of sensitive configuration — an API key, a database connection string, a secret — that your code needs to function, but that should never be visible in your actual code or committed to GitHub for anyone to see.</p>

<h3>Why an agent can't do this step for you</h3>

<p>An agent can absolutely write the code that <em>uses</em> an environment variable correctly. What it cannot do is create that variable securely on your behalf — because doing so would mean it has access to real secrets it shouldn't hold, or it would have to guess and hardcode a placeholder that then ends up exposed in your code, in plain text, in your GitHub history, visible to anyone. This step requires a human, in the right place, every time.</p>

<h3>Setting them up, in two places</h3>

<ol class="steps">
  <li>Locally, in a <code>.env</code> file at the root of your project, which should always be excluded from GitHub (add it to a <code>.gitignore</code> file, without exception).</li>
  <li>On Vercel, in your project's dashboard settings, so the live version of your site also has access to the same values.</li>
</ol>

<div class="box warn">
  <div class="label">The most common beginner mistake</div>
  The site works perfectly locally, then breaks the moment it's deployed. The cause, nearly every time, is that the environment variable was only set in one of the two places above, not both.
</div>
`,

    "connecting-a-database": `
<p class="lede">A database is what lets a site remember things: bookings, form submissions, a product or listing catalogue that updates without touching code, user accounts.</p>

<h3>Getting started</h3>

<ol class="steps">
  <li>Create a free Supabase project.</li>
  <li>Retrieve your project's connection keys — these are exactly the kind of secrets covered in Section 9, and belong in your environment variables, never hardcoded.</li>
  <li>Write an engineered prompt asking your agent to build the connection code, explicitly telling it your intended schema (what tables and fields you need) and your security expectations, rather than leaving it to guess.</li>
</ol>

<div class="box warn">
  <div class="label">A basic but critical security lesson</div>
  By default, some database setups allow anyone to read or write all of your data — an obvious problem the moment real information is involved. Locking this down, even at a beginner level (restricting who can read or write which tables), is a non-negotiable step before any real data goes near a live database.
</div>

<p><strong>Tying it back to the case study:</strong> turning the static real estate reference site's listings into database-backed entries would mean a client could add, edit, or remove a property listing themselves, through a simple form, without ever needing you to touch code again. That single change is often the difference between a one-off build and an ongoing, valuable relationship with a client.</p>
`,

    "things-that-break": `
<p class="lede">Reading an error message properly is a skill in itself. Panic, or blindly re-prompting an agent with "fix it," wastes time. The actual error text almost always tells you which category of problem you're facing.</p>

<h3>The five most common beginner failure points</h3>

<ol class="steps">
  <li>A missing or mismatched environment variable (Section 9).</li>
  <li>A failed build caused by a small code error introduced during a change.</li>
  <li>A mismatch between your code's expectations and your actual database schema.</li>
  <li>A messy merge or lost change from not committing properly (Section 6).</li>
  <li>An agent "fixing" something that wasn't actually broken, and introducing a new problem in the process.</li>
</ol>

<div class="box win">
  <div class="label">Debugging with an agent, properly</div>
  Always include the actual error message in your prompt, word for word, along with the relevant file or section of code. A vague "it's not working" prompt produces a vague, often wrong, fix. A prompt containing the real error text lets the agent diagnose the actual cause.
</div>

<h3>Knowing when to step in yourself</h3>

<p>Small, well-understood fixes — a typo, a missing import, an obvious mismatch — are often faster to fix directly than to describe to an agent. Save the agent for larger, structural problems.</p>
`,

    "production-management": `
<p class="lede">This is the real differentiator of this entire guide, and the section most "build fast" content skips entirely.</p>

<p>A demo can break with no consequences. A live site a real business relies on cannot.</p>

<h3>A basic pre-launch checklist, every time</h3>

<ul>
  <li>All environment variables set in both places (Section 9).</li>
  <li>Database security rules checked, not left on an open default (Section 10).</li>
  <li>Every link on the site actually tested, not assumed.</li>
  <li>The site checked on an actual phone screen, not just a desktop browser.</li>
</ul>

<h3>Handling client revisions without breaking a live site</h3>

<p>Make changes in a separate branch or preview environment first, test them properly, and only then push to the live, production version. This single habit prevents the most common way a beginner accidentally takes a working client site offline.</p>

<h3>Backups and rollbacks</h3>

<p>Because of the version control discipline from Section 6, the moment something goes wrong on a live site, reverting to the last known-good commit is a calm, fast fix, not a crisis.</p>

<div class="box win">
  <div class="label">Ongoing maintenance as a real, chargeable service</div>
  Once a site is live, updating content, adding features, and keeping dependencies current is real, recurring work. Framing this honestly to a client as a small monthly arrangement, rather than a vague "let me know if you need anything," turns a single project into ongoing income.
</div>
`,

    pricing: `
<p class="lede">Pricing is where most beginners either scare a client off by guessing too high, or undersell themselves so badly the work stops feeling worth it. Neither helps you build a real business.</p>

<p><strong>Price the outcome, not your hours.</strong> A client does not care that a page took you twenty minutes with a properly engineered prompt. They care that they now have a working, professional site that brings them customers. Pricing around the value delivered, not the time spent, is both fairer to you and easier for a client to accept.</p>

<h3>A simple tiered structure that scales with real complexity</h3>

<ul>
  <li><strong>A single landing page</strong> (one page, contact details, a clear call to action, mobile-friendly) — priced at the lower end. Your fastest sell, and a strong first project to build proof with.</li>
  <li><strong>A multi-page site</strong> (several connected pages, a proper navigation structure, a contact form) — priced higher than a single page, reflecting the added structure and content.</li>
  <li><strong>A site with a connected database</strong> (online bookings, a product or listing catalogue the client can update themselves, accounts) — priced at the top of your range, since this is where real, ongoing value to the client lives, and where Sections 9 and 10 come in directly.</li>
</ul>

<div class="box">
  <div class="label">Always separate one-off cost from ongoing cost</div>
  The build itself is a single, upfront project fee. Anything ongoing — updating content, adding a feature, keeping the site current — is a separate, recurring arrangement. Blurring these together is the most common reason freelancers end up doing free work indefinitely.
</div>

<p><strong>A payment structure that protects you specifically:</strong> fifty percent upfront, before any work begins, and fifty percent on delivery. This is standard, expected, and reasonable to ask for even as a beginner. It protects your time if a client disappears partway through, and it signals that you run this professionally, not as a casual favor.</p>

<div class="box warn">
  <div class="label">A pricing mistake worth naming directly</div>
  Charging so little that the number itself signals "I'm not confident this is worth much." Confidence in your own price, stated plainly and without over-explaining, does more for how a client perceives your professionalism than almost anything else in the pitch.
</div>
`,

    "getting-paid": `
<h3>Setting up on Bark and Freelancer</h3>

<p>A profile that stands out doesn't oversell. State clearly what you build, the stack you use, and be upfront about being early in your paid work — confidence and honesty read better than exaggerated claims that don't hold up under a real conversation.</p>

<h3>Pricing your first few projects</h3>

<p>Price low enough to realistically win your first two or three projects. This isn't about undervaluing yourself long-term — it's about building real, visible proof you can point to, which makes every future pitch easier and every future price higher.</p>

<h3>A simple, protective payment structure</h3>

<p>Fifty percent upfront, fifty percent on delivery. This protects you specifically as someone building a track record — a client who's paid a deposit is meaningfully more committed to seeing the project through.</p>

<h3>Turning early projects into proof</h3>

<p>Screenshots of finished work, a short description of the problem solved, and, where possible, a client's own words about the result, are worth more to your next pitch than any amount of self-description.</p>

<div class="box win">
  <div class="label">Direct, local outreach as a parallel channel</div>
  Platforms like Bark and Freelancer put you in competition with many other freelancers bidding on the same lead. Walking into an actual local business that has no website at all, and pitching directly, is often a faster, less competitive path to your first paying projects than waiting on a platform queue.
</div>
`,

    glossary: `
<p class="lede">Terms used throughout this guide, defined plainly, once, so you never have to guess.</p>

<div class="two-col">
  <div>
    <p><strong>Agent</strong> — an AI tool that can read, write, and run code inside your actual project, rather than just producing text you copy-paste.</p>
    <p><strong>Deployment</strong> — the process of taking a project running only on your machine and publishing it to a live, public URL.</p>
    <p><strong>DNS</strong> — the system that points a domain name (like yourclient.com) to the actual server hosting the site.</p>
    <p><strong>Environment variable</strong> — a secret configuration value (API key, database URL) kept out of your code and set separately in each environment.</p>
    <p><strong>Framework</strong> — the underlying structure (here, Next.js) that a site's pages, routing, and logic are built on top of.</p>
    <p><strong>Git / GitHub</strong> — the version-control system, and the hosted service, that track every change made to a project over time.</p>
  </div>
  <div>
    <p><strong>MCP (Model Context Protocol)</strong> — a way of giving an AI agent structured, direct access to real project context (a repo, a filesystem, a database) instead of manual copy-pasting.</p>
    <p><strong>Prompt engineering</strong> — writing precise, structured instructions (context, goal, boundaries, output format) so an agent gets a task right the first time.</p>
    <p><strong>Repository (repo)</strong> — a project's complete, tracked history of files and changes, hosted on GitHub.</p>
    <p><strong>Schema</strong> — the defined structure of a database: which tables exist, and which fields each one holds.</p>
    <p><strong>SSL certificate</strong> — what makes a site load securely (the padlock in the browser bar); issued automatically and free by Vercel once a domain is connected.</p>
    <p><strong>Static site</strong> — a site whose content is fixed at build time, with no live database behind it.</p>
  </div>
</div>
`,

    "cheat-sheet": `
<p class="lede">Keep this open while you work.</p>

<div class="two-col">
  <div>
    <h3>The loop</h3>
    <div class="terminal">
      <div><span class="prompt">1.</span> Plan with your agent — context, goal, boundaries, output</div>
      <div><span class="prompt">2.</span> Let it build, same session</div>
      <div><span class="prompt">3.</span> Review critically — did it stay in bounds?</div>
      <div><span class="prompt">4.</span> Refine with a precise instruction, not "fix it"</div>
      <div><span class="prompt">5.</span> Commit in small, meaningful chunks</div>
    </div>

    <h3>Before you push to production</h3>
    <ul>
      <li>Env vars set locally <em>and</em> on Vercel</li>
      <li>Database rules locked down, not default-open</li>
      <li>Every link actually clicked, not assumed</li>
      <li>Checked on a real phone screen</li>
    </ul>
  </div>
  <div>
    <h3>Pricing tiers (upfront, one-off)</h3>
    <table class="cmp">
      <tr><th>Tier</th><th>What it includes</th></tr>
      <tr><td class="hl">Landing page</td><td>One page, CTA, mobile-friendly</td></tr>
      <tr><td class="hl">Multi-page site</td><td>Nav, several pages, contact form</td></tr>
      <tr><td class="hl">Database-backed</td><td>Bookings, catalogue, accounts</td></tr>
    </table>
    <p>Always billed 50% upfront / 50% on delivery. Domain cost billed separately to the client. Ongoing maintenance billed monthly, never bundled into the build fee.</p>

    <h3>When something breaks</h3>
    <p>Copy the exact error text into your next prompt. Check: env vars → build error → schema mismatch → uncommitted mess → an agent "fix" that broke something else.</p>
  </div>
</div>
`,

    closing: `
<p class="lede">What you walk away with here is not a single finished demo. It's a repeatable process.</p>

<p>Think and prompt with precision, build fast because you've earned the right to, deploy correctly, secure your environment variables without exception, connect a real database when a project calls for it, and manage a live site once someone's actual business depends on it.</p>

<p>That last part — production management — is the part almost everyone selling "build with AI" content leaves out entirely. It's also the actual difference between something you can show off, and something you can charge real money for.</p>

<hr />

<h3>A note on getting further help</h3>

<p>This guide covers the full process end to end. If you'd like it applied directly, live, to your own specific project, a short personal walkthrough is available separately for a small additional fee. Details are included with your purchase.</p>
`,
  };

  return contentMap[lessonId] || `<p>This lesson is being prepared. Check back soon.</p>`;
}
