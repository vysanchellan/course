export interface Lesson {
  id: string;
  chapter: number;
  title: string;
  description: string;
  readingTime: string;
  estimatedMinutes: number;
}

export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  bookmarked: boolean;
  progress: number;
  lastReadAt: string | null;
}

export interface CourseState {
  totalLessons: number;
  completedLessons: number;
  currentLessonId: string;
  totalReadingTime: string;
  lastSessionDate: string;
  streak: number;
}

export interface Bookmark {
  id: string;
  lessonId: string;
  lessonTitle: string;
  chapter: number;
  excerpt: string;
  timestamp: string;
}

export interface RecentActivity {
  lessonId: string;
  lessonTitle: string;
  chapter: number;
  action: "started" | "continued" | "completed";
  timestamp: string;
}

export const lessons: Lesson[] = [
  {
    id: "toolkit-and-workflow",
    chapter: 1,
    title: "Toolkit & Workflow",
    description:
      "The exact tools you need and how they fit together into a repeatable build pipeline.",
    readingTime: "12 min read",
    estimatedMinutes: 12,
  },
  {
    id: "why-this-stack-is-free",
    chapter: 2,
    title: "Why This Stack Is Free",
    description:
      "A breakdown of every tool, what it costs (nothing), and why the economics work in your favor.",
    readingTime: "10 min read",
    estimatedMinutes: 10,
  },
  {
    id: "prompting-vs-prompt-engineering",
    chapter: 3,
    title: "Prompting vs. Prompt Engineering",
    description:
      "The difference between asking for code and directing a build. One works. The other wastes time.",
    readingTime: "15 min read",
    estimatedMinutes: 15,
  },
  {
    id: "the-initial-build",
    chapter: 4,
    title: "The Initial Build",
    description:
      "From blank canvas to working prototype. The exact prompt sequence and decision path.",
    readingTime: "20 min read",
    estimatedMinutes: 20,
  },
  {
    id: "version-control",
    chapter: 5,
    title: "Version Control",
    description:
      "Why Git matters even when you're the only developer, and the workflow that saves you every time.",
    readingTime: "10 min read",
    estimatedMinutes: 10,
  },
  {
    id: "deployment",
    chapter: 6,
    title: "Deployment",
    description:
      "Shipping to production with Vercel. Zero-config setup, environment variables, and the first deploy.",
    readingTime: "14 min read",
    estimatedMinutes: 14,
  },
  {
    id: "domain-and-dns",
    chapter: 7,
    title: "Domain & DNS",
    description:
      "Buying a domain, pointing it at your app, and understanding DNS records well enough to debug them.",
    readingTime: "12 min read",
    estimatedMinutes: 12,
  },
  {
    id: "environment-variables",
    chapter: 8,
    title: "Environment Variables",
    description:
      "Keeping secrets secret. A practical system for managing API keys and configuration across environments.",
    readingTime: "9 min read",
    estimatedMinutes: 9,
  },
  {
    id: "connecting-a-database",
    chapter: 9,
    title: "Connecting a Database",
    description:
      "Supabase from scratch. Tables, row-level security, and connecting your app to persistent storage.",
    readingTime: "18 min read",
    estimatedMinutes: 18,
  },
  {
    id: "things-that-break",
    chapter: 10,
    title: "Things That Break",
    description:
      "The most common failures, how to diagnose them, and what to do when a client is waiting.",
    readingTime: "16 min read",
    estimatedMinutes: 16,
  },
  {
    id: "production-management",
    chapter: 11,
    title: "Production Management",
    description:
      "Monitoring, logging, analytics, and the maintenance habits that separate professionals from hobbyists.",
    readingTime: "13 min read",
    estimatedMinutes: 13,
  },
  {
    id: "pricing",
    chapter: 12,
    title: "Pricing",
    description:
      "How to price website projects built with AI. What the market looks like and where you fit.",
    readingTime: "15 min read",
    estimatedMinutes: 15,
  },
  {
    id: "getting-paid",
    chapter: 13,
    title: "Getting Paid",
    description:
      "Contracts, deposits, invoices, and the business side of building websites for clients.",
    readingTime: "14 min read",
    estimatedMinutes: 14,
  },
];

export const defaultProgress: Record<string, LessonProgress> = {
  "toolkit-and-workflow": {
    lessonId: "toolkit-and-workflow",
    completed: true,
    bookmarked: false,
    progress: 100,
    lastReadAt: "2026-07-28T14:30:00Z",
  },
  "why-this-stack-is-free": {
    lessonId: "why-this-stack-is-free",
    completed: true,
    bookmarked: true,
    progress: 100,
    lastReadAt: "2026-07-28T16:00:00Z",
  },
  "prompting-vs-prompt-engineering": {
    lessonId: "prompting-vs-prompt-engineering",
    completed: false,
    bookmarked: false,
    progress: 100,
    lastReadAt: "2026-07-29T09:00:00Z",
  },
  "the-initial-build": {
    lessonId: "the-initial-build",
    completed: false,
    bookmarked: false,
    progress: 65,
    lastReadAt: "2026-07-29T11:00:00Z",
  },
  "version-control": {
    lessonId: "version-control",
    completed: false,
    bookmarked: true,
    progress: 30,
    lastReadAt: "2026-07-29T14:00:00Z",
  },
  deployment: {
    lessonId: "deployment",
    completed: false,
    bookmarked: false,
    progress: 0,
    lastReadAt: null,
  },
  "domain-and-dns": {
    lessonId: "domain-and-dns",
    completed: false,
    bookmarked: false,
    progress: 0,
    lastReadAt: null,
  },
  "environment-variables": {
    lessonId: "environment-variables",
    completed: false,
    bookmarked: false,
    progress: 0,
    lastReadAt: null,
  },
  "connecting-a-database": {
    lessonId: "connecting-a-database",
    completed: false,
    bookmarked: false,
    progress: 0,
    lastReadAt: null,
  },
  "things-that-break": {
    lessonId: "things-that-break",
    completed: false,
    bookmarked: false,
    progress: 0,
    lastReadAt: null,
  },
  "production-management": {
    lessonId: "production-management",
    completed: false,
    bookmarked: false,
    progress: 0,
    lastReadAt: null,
  },
  pricing: {
    lessonId: "pricing",
    completed: false,
    bookmarked: false,
    progress: 0,
    lastReadAt: null,
  },
  "getting-paid": {
    lessonId: "getting-paid",
    completed: false,
    bookmarked: false,
    progress: 0,
    lastReadAt: null,
  },
};

export const courseState: CourseState = {
  totalLessons: 13,
  completedLessons: 3,
  currentLessonId: "the-initial-build",
  totalReadingTime: "3h 12min",
  lastSessionDate: "2026-07-29T14:00:00Z",
  streak: 5,
};

export const bookmarks: Bookmark[] = [
  {
    id: "bm-1",
    lessonId: "why-this-stack-is-free",
    lessonTitle: "Why This Stack Is Free",
    chapter: 2,
    excerpt:
      "Vercel's free tier includes 100 GB bandwidth, 6000 build minutes, and unlimited sites. For almost any client project, this is all you need.",
    timestamp: "2026-07-28T16:05:00Z",
  },
  {
    id: "bm-2",
    lessonId: "version-control",
    lessonTitle: "Version Control",
    chapter: 5,
    excerpt:
      "The golden rule of AI-assisted development: never prompt your way out of a problem you can git your way out of.",
    timestamp: "2026-07-29T14:15:00Z",
  },
];

export const recentActivity: RecentActivity[] = [
  {
    lessonId: "version-control",
    lessonTitle: "Version Control",
    chapter: 5,
    action: "continued",
    timestamp: "2026-07-29T14:00:00Z",
  },
  {
    lessonId: "the-initial-build",
    lessonTitle: "The Initial Build",
    chapter: 4,
    action: "continued",
    timestamp: "2026-07-29T11:00:00Z",
  },
  {
    lessonId: "prompting-vs-prompt-engineering",
    lessonTitle: "Prompting vs. Prompt Engineering",
    chapter: 3,
    action: "completed",
    timestamp: "2026-07-29T09:00:00Z",
  },
  {
    lessonId: "why-this-stack-is-free",
    lessonTitle: "Why This Stack Is Free",
    chapter: 2,
    action: "completed",
    timestamp: "2026-07-28T16:00:00Z",
  },
  {
    lessonId: "toolkit-and-workflow",
    lessonTitle: "Toolkit & Workflow",
    chapter: 1,
    action: "completed",
    timestamp: "2026-07-28T14:30:00Z",
  },
];

export function getLessonContent(lessonId: string): string {
  // TODO: Replace with CMS or database content in Phase 2
  const contentMap: Record<string, string> = {
    "toolkit-and-workflow": `<p>Every craftsman needs a reliable set of tools. The difference between a professional and someone who's guessing is that the professional knows exactly which tool to reach for and when.</p>
<p>This chapter covers the exact toolkit we'll use throughout this course. By the end, you'll understand not just what each tool does, but how they fit together into a workflow that can take you from blank browser tab to deployed, production website.</p>
<h2>The Stack</h2>
<p>Here's what we're working with:</p>
<ul>
<li><strong>Next.js 15</strong> — React framework with server components, file-based routing, and API routes</li>
<li><strong>TypeScript</strong> — Type safety that catches errors before they reach production</li>
<li><strong>Tailwind CSS</strong> — Utility-first CSS that keeps your styles consistent and your bundle small</li>
<li><strong>shadcn/ui</strong> — Beautiful, accessible component primitives you own completely</li>
<li><strong>GitHub</strong> — Version control and collaboration</li>
<li><strong>Vercel</strong> — Deployment platform that integrates seamlessly with Next.js</li>
<li><strong>Supabase</strong> — Open-source database and authentication when you need it</li>
</ul>
<h2>How They Fit Together</h2>
<p>Think of this stack as an assembly line. Each tool handles one job and passes the result to the next:</p>
<ol>
<li>You write code locally in Next.js with TypeScript and Tailwind</li>
<li>You push to GitHub</li>
<li>Vercel detects the push, builds the project, and deploys it</li>
<li>Supabase provides the data layer when your app needs persistence</li>
</ol>
<div class="not-prose my-8"><div class="bg-panel border border-panelborder rounded-md overflow-hidden"><div class="flex items-center gap-1.5 px-4 py-2.5 border-b border-panelborder bg-panel"><span class="w-2.5 h-2.5 rounded-full bg-[#e05555]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#e0b955]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#59c46b]"></span><span class="font-mono text-[11px] text-muteddark ml-3">note</span></div><div class="p-4 font-mono text-[13px] leading-relaxed text-[#c9c6bd]"><span class="text-gold">#</span> The entire pipeline is free until you need to scale<br><span class="text-gold">#</span> and by then, your client is paying for it.</div></div></div>
<p>The key insight is that this isn't a collection of random tools. It's a deliberately chosen set where each piece was selected because it works well with the others. No fighting framework defaults. No duct-taping incompatible systems together.</p>
<h2>Your First Setup</h2>
<p>Before we go further, make sure you have these installed:</p>
<ul>
<li>Node.js 18+ (preferably 20 LTS)</li>
<li>A code editor (VS Code recommended)</li>
<li>Git</li>
<li>A GitHub account</li>
<li>A Vercel account (free tier)</li>
</ul>
<p>That's it. Everything else we'll install as we go.</p>`,
    "why-this-stack-is-free": `<p>One of the most common questions people ask when they hear about this stack is: "What's the catch?"</p>
<p>There isn't one — at least, not for the scale you'll be working at.</p>
<h2>The Economics of Free</h2>
<p>Let's break down exactly what each tool costs and where the limits are:</p>
<h3>Next.js</h3>
<p><strong>Cost: $0</strong> — Open source MIT license. You can use it for anything, commercially, without restriction.</p>
<h3>TypeScript</h3>
<p><strong>Cost: $0</strong> — Open source. Maintained by Microsoft. It's a language feature of your editor and build process.</p>
<h3>Tailwind CSS</h3>
<p><strong>Cost: $0</strong> — Open source MIT license. The core framework hasn't changed its pricing model since launch.</p>
<h3>GitHub</h3>
<p><strong>Cost: $0</strong> — Unlimited public and private repositories on the free tier. The only limitation is team size and some advanced CI features.</p>
<h3>Vercel</h3>
<p><strong>Cost: $0</strong> — The free tier includes 100 GB bandwidth, 6000 build minutes per month, and unlimited sites. For almost any client project, this is all you need.</p>
<h3>Supabase</h3>
<p><strong>Cost: $0</strong> — Free tier includes 500 MB database, 1 GB bandwidth, 50,000 monthly active users, and row-level security.</p>
<h2>The One Paid Tool</h2>
<p>There is exactly one paid tool in this stack: <strong>Claude Pro ($20/month)</strong>.</p>
<p>This is where the AI assistance comes from — prompting, debugging, explaining, and accelerating the development process. Every other tool in the stack is free.</p>
<div class="not-prose my-8"><div class="bg-panel border border-panelborder rounded-md overflow-hidden"><div class="flex items-center gap-1.5 px-4 py-2.5 border-b border-panelborder bg-panel"><span class="w-2.5 h-2.5 rounded-full bg-[#e05555]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#e0b955]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#59c46b]"></span><span class="font-mono text-[11px] text-muteddark ml-3">insight</span></div><div class="p-4 font-mono text-[13px] leading-relaxed text-[#c9c6bd]"><span class="text-gold">$</span> 20/month for Claude Pro replaces thousands in tooling costs.<br><span class="text-gold">$</span> The ROI is absurd. One client project pays for years.</div></div></div>
<p>When people say "AI makes development cheaper," this is what they mean — not that the AI replaces developers, but that the tooling costs approach zero while your capability expands.</p>`,
    "prompting-vs-prompt-engineering": `<p>There's a lot of noise about "prompt engineering." Most of it is nonsense.</p>
<p>Let's separate what actually works from what sounds good in a Twitter thread.</p>
<h2>The Myth of Prompt Engineering</h2>
<p>Prompt engineering suggests you need elaborate, multi-paragraph incantations to get good results from AI. People sell courses on "prompt frameworks" with acronyms and templates.</p>
<p>Here's the truth: <strong>AI is becoming more capable, not less.</strong> The models understand natural language. You don't need a special syntax.</p>
<h2>What Actually Works</h2>
<p>Instead of "prompt engineering," think in terms of <strong>directing a build</strong>. You're not casting a spell — you're giving instructions to a competent junior developer who needs clear context.</p>
<p>Effective prompting comes down to three things:</p>
<ol>
<li><strong>Context.</strong> What are you building? What stack are you using? What constraints apply?</li>
<li><strong>Specificity.</strong> "Add a button" is vague. "Add a primary action button in the hero section that scrolls to the pricing table" is clear.</li>
<li><strong>Iteration.</strong> You won't get the perfect result on the first try. The skill is recognizing what needs to change and communicating it.</li>
</ol>
<h2>The Framework That Matters</h2>
<p>Here's the only framework you need:</p>
<div class="not-prose my-8"><div class="bg-panel border border-panelborder rounded-md overflow-hidden"><div class="flex items-center gap-1.5 px-4 py-2.5 border-b border-panelborder bg-panel"><span class="w-2.5 h-2.5 rounded-full bg-[#e05555]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#e0b955]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#59c46b]"></span><span class="font-mono text-[11px] text-muteddark ml-3">template</span></div><div class="p-4 font-mono text-[13px] leading-relaxed text-[#c9c6bd]"><span class="text-gold">I'm building [project type] using [stack].</span><br><span class="text-gold">I need to [specific task].</span><br><span class="text-gold">Here's my current code / situation: [context].</span><br><span class="text-gold">Constraints: [any limits or preferences].</span><br><br>That's it. Three to five sentences. No elaborate frameworks needed.</div></div></div>
<p>The rest is practice. The more you build, the better you get at recognizing what information the AI needs and providing it concisely.</p>`,
    "the-initial-build": `<p>This is where theory becomes practice. We're going from a blank browser tab to a working prototype.</p>
<p>The goal is not perfection. The goal is momentum.</p>
<h2>Starting From Nothing</h2>
<p>The most intimidating moment in any project is the blank page. Here's how we handle it:</p>
<ol>
<li>Create the Next.js project</li>
<li>Set up Tailwind and the design tokens</li>
<li>Build the layout shell</li>
<li>Add placeholder content</li>
<li>Iterate on design</li>
</ol>
<p>Each step builds on the last. You never need to figure out everything at once.</p>
<h2>The Prompt Sequence</h2>
<p>Here's the exact sequence of prompts I use to start a new project:</p>
<blockquote>
<p>"Create a new Next.js 15 project with TypeScript, Tailwind CSS, and the App Router. Set up a basic layout with a navbar and footer using Shadcn UI components."</p>
</blockquote>
<p>From there, I iterate:</p>
<blockquote>
<p>"The navbar needs to be sticky with a transparent background that becomes solid on scroll. Add a mobile hamburger menu."</p>
</blockquote>
<p>And then:</p>
<blockquote>
<p>"Create a hero section with a headline, subtext, and a CTA button. Use the design tokens from Tailwind config."</p>
</blockquote>
<h2>The Decision Path</h2>
<p>The real skill isn't writing prompts — it's making decisions. Every time you ask the AI for something, you're making a choice about direction, architecture, or design.</p>
<p>Here are the decisions you'll face in the initial build:</p>
<ul>
<li><strong>Layout structure:</strong> How many columns? What breaks where on mobile?</li>
<li><strong>Component boundaries:</strong> What gets its own component vs. inline markup?</li>
<li><strong>State management:</strong> What needs to be stateful vs. static?</li>
<li><strong>Data flow:</strong> How does information move through the application?</li>
</ul>
<p>Make a decision, communicate it, and move on. You can always refactor later.</p>
<div class="not-prose my-8"><div class="bg-panel border border-panelborder rounded-md overflow-hidden"><div class="flex items-center gap-1.5 px-4 py-2.5 border-b border-panelborder bg-panel"><span class="w-2.5 h-2.5 rounded-full bg-[#e05555]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#e0b955]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#59c46b]"></span><span class="font-mono text-[11px] text-muteddark ml-3">tip</span></div><div class="p-4 font-mono text-[13px] leading-relaxed text-[#c9c6bd]"><span class="text-gold">⟐</span> Don't over-invest in the initial build. Get something working, then refine.<br><span class="text-gold">⟐</span> A prototype that exists is better than a perfect plan that doesn't.</div></div></div>`,
    "version-control": `<p>Git is the safety net that makes everything else possible.</p>
<p>When you're working with AI — which can generate and modify large amounts of code quickly — version control isn't optional. It's essential.</p>
<h2>Why Git Matters Even More With AI</h2>
<p>AI is incredibly productive. It can generate hundreds of lines of code in seconds. But it can also introduce subtle bugs, delete things it shouldn't, or make architectural decisions that don't fit.</p>
<p>Without Git, every AI interaction is a gamble. With Git, every interaction is an experiment you can roll back.</p>
<h2>The Workflow</h2>
<p>Here's the workflow I use for every AI-assisted build:</p>
<ol>
<li><strong>Branch off main.</strong> Create a descriptive branch name for the feature or fix.</li>
<li><strong>Prompt and commit.</strong> Use AI, review the changes, commit with a clear message.</li>
<li><strong>Iterate.</strong> Repeat until the feature is complete.</li>
<li><strong>Merge.</strong> Squash and merge back to main with a clean history.</li>
</ol>
<div class="not-prose my-8"><div class="bg-panel border border-panelborder rounded-md overflow-hidden"><div class="flex items-center gap-1.5 px-4 py-2.5 border-b border-panelborder bg-panel"><span class="w-2.5 h-2.5 rounded-full bg-[#e05555]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#e0b955]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#59c46b]"></span><span class="font-mono text-[11px] text-muteddark ml-3">terminal</span></div><div class="p-4 font-mono text-[13px] leading-relaxed text-[#c9c6bd]">
<span class="text-gold">$</span> git checkout -b feat/hero-section<br>
<span class="text-gold">$</span> # prompt AI, review, test<br>
<span class="text-gold">$</span> git add -A<br>
<span class="text-gold">$</span> git commit -m "feat: add hero section with animated headline"<br>
<span class="text-gold">$</span> git checkout main<br>
<span class="text-gold">$</span> git merge --squash feat/hero-section<br>
<span class="text-gold">$</span> git branch -D feat/hero-section</div></div></div>
<h2>The Golden Rule</h2>
<p>Never prompt your way out of a problem you can <code>git</code> your way out of.</p>
<p>If an AI change breaks something and you can't immediately see why, don't waste time debugging. Roll back, re-examine the diff, and try again with better context.</p>`,
    "deployment": `<p>Deployment is where your project becomes real. It's no longer code on your machine — it's a website on the internet.</p>
<p>This chapter covers the exact process of deploying a Next.js project to Vercel, configuring environment variables, and verifying everything works.</p>
<h2>Why Vercel</h2>
<p>Vercel is the platform built by the creators of Next.js. The integration is seamless. Push to GitHub, and Vercel automatically builds and deploys your project.</p>
<h2>The Deployment Process</h2>
<ol>
<li>Push your code to a GitHub repository</li>
<li>Go to vercel.com and click "Add New Project"</li>
<li>Import your GitHub repository</li>
<li>Vercel auto-detects Next.js and sets the build configuration</li>
<li>Add your environment variables</li>
<li>Click "Deploy"</li>
<li>Wait ~2 minutes for the build</li>
<li>Your site is live</li>
</ol>
<p>That's it. The first deploy is the hardest. After that, every push to main triggers an automatic redeploy.</p>
<h2>Environment Variables in Vercel</h2>
<p>In your Vercel project settings, you can add environment variables for different environments:</p>
<ul>
<li><strong>Production</strong> — Used when you deploy to your production domain</li>
<li><strong>Preview</strong> — Used for preview deployments from pull requests</li>
<li><strong>Development</strong> — Used when running locally with <code>vercel dev</code></li>
</ul>
<p>Never hardcode secrets. Always use environment variables.</p>
<div class="not-prose my-8"><div class="bg-panel border border-panelborder rounded-md overflow-hidden"><div class="flex items-center gap-1.5 px-4 py-2.5 border-b border-panelborder bg-panel"><span class="w-2.5 h-2.5 rounded-full bg-[#e05555]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#e0b955]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#59c46b]"></span><span class="font-mono text-[11px] text-muteddark ml-3">deploy.log</span></div><div class="p-4 font-mono text-[13px] leading-relaxed text-[#c9c6bd]">
<span class="text-gold">$</span> git push origin main<br>
<span class="text-muteddark">Deploying to Vercel…</span><br>
<span class="text-diffadd">+ build succeeded in 24s</span><br>
<span class="text-diffadd">+ environment variables verified</span><br>
<span class="text-diffadd">+ database connection: ok</span><br>
<span class="text-muteddark">Assigning domain…</span><br>
<span class="text-goldsoft">✓ live at yourclient.com</span></div></div></div>`,
    "domain-and-dns": `<p>A deployed site on a Vercel subdomain is fine for testing. For a real client project, you need a proper domain.</p>
<p>This chapter covers buying a domain, pointing it at your Vercel deployment, and understanding DNS well enough to debug issues when they arise (and they will).</p>
<h2>Buying a Domain</h2>
<p>You can buy domains from any registrar. The ones I recommend:</p>
<ul>
<li><strong>Namecheap</strong> — Good prices, free WhoisGuard, reliable</li>
<li><strong>Cloudflare Registrar</strong> — At-cost pricing (no markup)</li>
<li><strong>Porkbun</strong> — Cheap, modern interface</li>
</ul>
<p>Prices range from $8–15/year for a standard .com domain.</p>
<h2>DNS Records</h2>
<p>DNS (Domain Name System) converts human-readable domain names into IP addresses. The records you'll most commonly work with:</p>
<ul>
<li><strong>A record</strong> — Points a domain to an IP address</li>
<li><strong>CNAME record</strong> — Points a domain to another domain (used for Vercel)</li>
<li><strong>TXT record</strong> — Stores text data (used for verification)</li>
<li><strong>MX record</strong> — Routes email (if you set up email)</li>
</ul>
<h2>Pointing a Domain to Vercel</h2>
<p>Vercel provides a target domain (like <code>your-project.vercel.app</code>). To use a custom domain:</p>
<ol>
<li>In your Vercel project dashboard, go to "Domains"</li>
<li>Enter your custom domain</li>
<li>Vercel shows you the DNS records to add</li>
<li>Add those records at your domain registrar</li>
<li>Wait for DNS propagation (can take a few minutes to 48 hours)</li>
</ol>
<p>Vercel handles SSL certificates automatically through Let's Encrypt. No manual certificate management.</p>`,
    "environment-variables": `<p>Environment variables are how you keep secrets out of your codebase. API keys, database URLs, and other sensitive configuration belong in environment variables, not in your source code.</p>
<h2>The Problem</h2>
<p>Hardcoding secrets is the most common mistake beginners make. It leads to:</p>
<ul>
<li>Accidentally committing API keys to GitHub</li>
<li>Exposing credentials in client-side bundles</li>
<li>Difficulty switching between development and production</li>
</ul>
<h2>The Solution</h2>
<p>A systematic approach to environment variables:</p>
<ol>
<li><strong>Use <code>.env.local</code> for local development.</strong> This file is listed in <code>.gitignore</code> and never committed.</li>
<li><strong>Use <code>.env.example</code> as a template.</strong> Commit this file so other developers know what variables are needed.</li>
<li><strong>Set variables in Vercel for production.</strong> Production values go in the Vercel dashboard under Project Settings → Environment Variables.</li>
</ol>
<h2>Next.js Environment Variable Conventions</h2>
<ul>
<li><code>NEXT_PUBLIC_</code> prefix exposes the variable to the browser. Only use this for values that are safe to be public.</li>
<li>All other variables are only available on the server.</li>
<li>Variables are available in <code>process.env</code> at runtime.</li>
</ul>
<div class="not-prose my-8"><div class="bg-panel border border-panelborder rounded-md overflow-hidden"><div class="flex items-center gap-1.5 px-4 py-2.5 border-b border-panelborder bg-panel"><span class="w-2.5 h-2.5 rounded-full bg-[#e05555]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#e0b955]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#59c46b]"></span><span class="font-mono text-[11px] text-muteddark ml-3">example</span></div><div class="p-4 font-mono text-[13px] leading-relaxed text-[#c9c6bd]">
<span class="text-muteddark"># .env.example</span><br>
DATABASE_URL=<br>
NEXT_PUBLIC_SITE_URL=<br>
CLAUDE_API_KEY=<br><br>
<span class="text-muteddark"># .env.local (never committed)</span><br>
DATABASE_URL=postgresql://localhost:5432/mydb<br>
NEXT_PUBLIC_SITE_URL=http://localhost:3000<br>
CLAUDE_API_KEY=sk-ant-...</div></div></div>`,
    "connecting-a-database": `<p>Static sites are limited. If you want user accounts, persistent data, or dynamic content, you need a database.</p>
<p>Supabase is our choice: it's free, PostgreSQL-based, and includes authentication, row-level security, and a real-time API out of the box.</p>
<h2>Setting Up Supabase</h2>
<ol>
<li>Go to supabase.com and create an account (free tier)</li>
<li>Create a new project</li>
<li>Wait for the database to provision (~2 minutes)</li>
<li>Copy your project URL and anon key from the API settings</li>
<li>Add these as environment variables in your project</li>
</ol>
<h2>Creating Tables</h2>
<p>Supabase provides a SQL editor where you can create tables directly:</p>
<pre><code>CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;</code></pre>
<h2>Row-Level Security</h2>
<p>RLS is Supabase's security model. It ensures users can only access data they're authorized to see. Every table should have RLS enabled.</p>
<p>Here's a typical RLS policy:</p>
<pre><code>CREATE POLICY "Users can read their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);</code></pre>
<h2>Connecting From Next.js</h2>
<p>Install the Supabase client library and create a client:</p>
<pre><code>import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)</code></pre>`,
    "things-that-break": `<p>Things will break. That's not pessimism — it's experience.</p>
<p>This chapter covers the most common failures, how to diagnose them, and what to do when a client is waiting and nothing seems to work.</p>
<h2>The Most Common Failures</h2>
<h3>1. Build Failures</h3>
<p>The build passes locally but fails on Vercel. The most common causes:</p>
<ul>
<li>TypeScript errors you didn't catch locally</li>
<li>Missing environment variables</li>
<li>Node.js version mismatch</li>
<li>Module not found (usually a case-sensitivity issue on case-sensitive file systems)</li>
</ul>
<h3>2. API Route Errors</h3>
<p>Your API works locally but returns 500 in production. Common culprits:</p>
<ul>
<li>Missing environment variables in production</li>
<li>Database connection issues</li>
<li>CORS configuration</li>
<li>Rate limiting</li>
</ul>
<h3>3. Database Connection Drops</h3>
<p>Supabase connections can sometimes drop under load. Solution: use connection pooling and implement retry logic.</p>
<h3>4. DNS Propagation Delays</h3>
<p>When you change DNS records, propagation can take anywhere from minutes to 48 hours. Always make DNS changes well before a client deadline.</p>
<h2>The Debugging Protocol</h2>
<p>When something breaks, follow this order:</p>
<ol>
<li><strong>Check the logs.</strong> Vercel provides build and runtime logs. Read them carefully.</li>
<li><strong>Check environment variables.</strong> Are all required variables set in production?</li>
<li><strong>Reproduce locally.</strong> Can you make it fail on your machine?</li>
<li><strong>Isolate the change.</strong> What was the last commit that worked? What changed?</li>
<li><strong>Ask AI with context.</strong> Paste the error, your code, and what you've tried.</li>
</ol>
<div class="not-prose my-8"><div class="bg-panel border border-panelborder rounded-md overflow-hidden"><div class="flex items-center gap-1.5 px-4 py-2.5 border-b border-panelborder bg-panel"><span class="w-2.5 h-2.5 rounded-full bg-[#e05555]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#e0b955]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#59c46b]"></span><span class="font-mono text-[11px] text-muteddark ml-3">rule</span></div><div class="p-4 font-mono text-[13px] leading-relaxed text-[#c9c6bd]"><span class="text-gold">⤷</span> Never debug in production. If possible, reproduce the issue in a preview deployment or locally.<br><span class="text-gold">⤷</span> If you must debug in production, add logging before making changes, not after.</div></div></div>`,
    "production-management": `<p>Shipping to production isn't the end — it's the beginning. Real websites need monitoring, maintenance, and continuous improvement.</p>
<p>This chapter covers the production habits that separate professionals from hobbyists.</p>
<h2>Monitoring</h2>
<p>You can't fix what you don't know is broken. Set up monitoring from day one:</p>
<ul>
<li><strong>Vercel Analytics</strong> — Built-in. Tracks page views, web vitals, and errors.</li>
<li><strong>Vercel Speed Insights</strong> — Real-user performance monitoring.</li>
<li><strong>Sentry</strong> — Error tracking with context. Free tier available.</li>
<li><strong>Uptime monitoring</strong> — Simple ping-based monitoring (Better Uptime, Checkly).</li>
</ul>
<h2>Logging</h2>
<p>Structured logging is essential for debugging production issues. Use <code>console.log</code> strategically, or set up a logging service:</p>
<ul>
<li>Vercel provides build and edge function logs in the dashboard</li>
<li>For API routes, add request/response logging</li>
<li>Log errors with context (user ID, request path, timestamp)</li>
</ul>
<h2>Analytics</h2>
<p>Understand how people use your site:</p>
<ul>
<li>Vercel Analytics (privacy-friendly, no cookie banner needed)</li>
<li>Plausible (simple, privacy-focused alternative)</li>
<li>PostHog (product analytics with event tracking)</li>
</ul>
<h2>Maintenance Habits</h2>
<ul>
<li><strong>Weekly:</strong> Check for dependency updates. Security patches matter.</li>
<li><strong>Monthly:</strong> Review error logs. Look for patterns.</li>
<li><strong>Quarterly:</strong> Performance audit. Update major dependencies.</li>
</ul>`,
    pricing: `<p>Pricing is the hardest part of freelancing. Most people underprice their work because they don't know what to charge.</p>
<p>This chapter gives you a framework for pricing website projects built with AI.</p>
<h2>The Pricing Problem</h2>
<p>AI makes you faster. Faster means you can complete projects in less time. The natural instinct is to charge less because it took less time.</p>
<p>This is wrong.</p>
<p>Your client isn't paying for your time. They're paying for the result. The value is the same whether you built it in 10 hours or 40 hours.</p>
<h2>Pricing Models</h2>
<h3>Fixed Price</h3>
<p>You agree on a price upfront for a defined scope. Pros: predictable for the client. Cons: scope creep can kill your margins.</p>
<h3>Value-Based Pricing</h3>
<p>Price based on the value delivered to the client. A website that generates $50k/month in revenue is worth more than a brochure site.</p>
<h3>Retainer</h3>
<p>Ongoing monthly fee for maintenance and updates. Provides recurring revenue.</p>
<h2>What to Charge</h2>
<p>For AI-assisted website projects, here are realistic ranges:</p>
<ul>
<li><strong>Simple landing page:</strong> $500–$1,500</li>
<li><strong>Multi-page business site:</strong> $1,500–$4,000</li>
<li><strong>Web application with database:</strong> $4,000–$10,000</li>
<li><strong>E-commerce or complex app:</strong> $10,000+</li>
</ul>
<p>These are starting points. Adjust based on your market, experience, and the client's budget.</p>`,
    "getting-paid": `<p>The business side of building websites: contracts, deposits, invoices, and making sure you actually get paid.</p>
<h2>Contracts</h2>
<p>Never start work without a contract. A contract protects both you and the client. At minimum, it should specify:</p>
<ul>
<li>Scope of work (what you're building)</li>
<li>Timeline and milestones</li>
<li>Payment terms (amount, schedule, method)</li>
<li>Revision limits (how many rounds of changes are included)</li>
<li>Ownership (when does the client own the code)</li>
<li>Cancellation terms</li>
</ul>
<h2>Deposits</h2>
<p>Always collect a deposit before starting work. Industry standard is 50% upfront. This:</p>
<ul>
<li>Shows the client is serious</li>
<li>Protects you if the project is cancelled</li>
<li>Provides cash flow for development</li>
</ul>
<h2>Invoicing</h2>
<p>Send professional invoices. Tools like FreshBooks, Harvest, or even a well-formatted PDF work. Include:</p>
<ul>
<li>Invoice number and date</li>
<li>Client name and address</li>
<li>Itemized services</li>
<li>Amount due</li>
<li>Payment terms (Net 15 or Net 30)</li>
<li>Payment instructions</li>
</ul>
<h2>Payment Methods</h2>
<ul>
<li><strong>Stripe</strong> — Credit card payments, easy to set up</li>
<li><strong>PayPal</strong> — Widely recognized, but higher fees</li>
<li><strong>Bank transfer</strong> — No fees, but slower</li>
<li><strong>Square</strong> — Good for in-person payments</li>
</ul>
<h2>Late Payments</h2>
<p>Have a process for late payments:</p>
<ol>
<li>Send a reminder on day 1 of being late</li>
<li>Send a second notice on day 7</li>
<li>Stop work on day 14 (your contract should allow this)</li>
<li>Send to collections or small claims as a last resort</li>
</ol>
<div class="not-prose my-8"><div class="bg-panel border border-panelborder rounded-md overflow-hidden"><div class="flex items-center gap-1.5 px-4 py-2.5 border-b border-panelborder bg-panel"><span class="w-2.5 h-2.5 rounded-full bg-[#e05555]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#e0b955]"></span><span class="w-2.5 h-2.5 rounded-full bg-[#59c46b]"></span><span class="font-mono text-[11px] text-muteddark ml-3">rule</span></div><div class="p-4 font-mono text-[13px] leading-relaxed text-[#c9c6bd"><span class="text-gold">⤷</span> Never hand over the final files (domain access, source code, admin credentials) until payment clears.<br><span class="text-gold">⤷</span> This is standard practice. Any professional client will expect it.</div></div></div>`,
  };
  return (
    contentMap[lessonId] ||
    `<p>This lesson is being prepared. Check back soon.</p>`
  );
}
