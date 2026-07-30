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
    id: "my-first-website",
    chapter: -1,
    title: "Start here — build something now",
    description: "The quickest way to prove the guide works: ship a real page before you read a chapter.",
    readingTime: "10 min to build",
    estimatedMinutes: 10,
  },
  {
    id: "introduction",
    chapter: 0,
    title: "Introduction",
    description: "The build is the easy 20%.",
    readingTime: "5 min read",
    estimatedMinutes: 5,
  },
  {
    id: "toolkit-and-workflow",
    chapter: 1,
    title: "The Exact Toolkit and Workflow",
    description: "Vague advice like \"use a framework and an AI agent\" isn't useful. Here is the exact toolkit, named, with no filler, and the exact workflow tying it together.",
    readingTime: "8 min read",
    estimatedMinutes: 8,
  },
  {
    id: "claude-code-vs-free-path",
    chapter: 2,
    title: "Claude Code vs. the Free Path",
    description: "Choosing your agent, and being honest about the trade-off, before you build anything.",
    readingTime: "7 min read",
    estimatedMinutes: 7,
  },
  {
    id: "why-this-stack",
    chapter: 3,
    title: "Why This Stack, and Why Almost All of It Is Free",
    description: "Understand what each piece is actually doing before you touch anything.",
    readingTime: "6 min read",
    estimatedMinutes: 6,
  },
  {
    id: "prompting-vs-prompt-engineering",
    chapter: 4,
    title: "The Mindset Shift: Prompting vs. Prompt Engineering",
    description: "This is the section that matters most, and the one almost nobody selling \"build fast with AI\" content actually teaches properly.",
    readingTime: "10 min read",
    estimatedMinutes: 10,
  },
  {
    id: "the-initial-build",
    chapter: 5,
    title: "The Initial Build",
    description: "20 to 30 minutes, done properly. With Section 4's mindset in place, the fast build becomes real, not a trick.",
    readingTime: "8 min read",
    estimatedMinutes: 8,
  },
  {
    id: "version-control",
    chapter: 6,
    title: "Version Control: Why GitHub Isn't Optional",
    description: "Skipping version control is the single most common way beginners lose real work.",
    readingTime: "7 min read",
    estimatedMinutes: 7,
  },
  {
    id: "deployment",
    chapter: 7,
    title: "Deployment: Going From Local to Live",
    description: "What deployment actually means: your project becomes a real website with a real, public URL that anyone can visit.",
    readingTime: "8 min read",
    estimatedMinutes: 8,
  },
  {
    id: "domain-and-dns",
    chapter: 8,
    title: "Buying a Domain and Connecting It Properly",
    description: "A free vercel.app address is fine for a demo. A paying client needs their own domain in their own browser bar.",
    readingTime: "7 min read",
    estimatedMinutes: 7,
  },
  {
    id: "environment-variables",
    chapter: 9,
    title: "Environment Variables",
    description: "The thing agents can't do for you. This is where beginners get stuck for hours, and where almost no beginner content explains what's happening.",
    readingTime: "6 min read",
    estimatedMinutes: 6,
  },
  {
    id: "connecting-a-database",
    chapter: 10,
    title: "Connecting a Real Database",
    description: "Supabase, step by step. A database is what lets a site remember things: bookings, form submissions, user accounts.",
    readingTime: "7 min read",
    estimatedMinutes: 7,
  },
  {
    id: "things-that-break",
    chapter: 11,
    title: "Things That Break, and How to Actually Fix Them",
    description: "Reading an error message properly is a skill in itself. The actual error text almost always tells you which category of problem you're facing.",
    readingTime: "8 min read",
    estimatedMinutes: 8,
  },
  {
    id: "production-management",
    chapter: 12,
    title: "Production Management",
    description: "The part that actually makes you money. A demo can break with no consequences. A live site a real business relies on cannot.",
    readingTime: "8 min read",
    estimatedMinutes: 8,
  },
  {
    id: "pricing",
    chapter: 13,
    title: "Pricing: What to Actually Charge a Client",
    description: "Pricing is where most beginners either scare a client off by guessing too high, or undersell themselves so badly the work stops feeling worth it.",
    readingTime: "8 min read",
    estimatedMinutes: 8,
  },
  {
    id: "getting-paid",
    chapter: 14,
    title: "Getting Paid",
    description: "Freelance platforms and direct outreach — setting up, pricing first projects, and turning early work into proof.",
    readingTime: "8 min read",
    estimatedMinutes: 8,
  },
  {
    id: "glossary",
    chapter: 15,
    title: "Glossary",
    description: "Terms used throughout this guide, defined plainly, once, so you never have to guess.",
    readingTime: "5 min read",
    estimatedMinutes: 5,
  },
  {
    id: "cheat-sheet",
    chapter: 16,
    title: "The One-Page Cheat Sheet",
    description: "Keep this open while you work. The loop, pre-launch checklist, pricing tiers, and debugging quick-reference.",
    readingTime: "4 min read",
    estimatedMinutes: 4,
  },
  {
    id: "closing",
    chapter: 17,
    title: "Closing",
    description: "A repeatable process, not a demo. Think and prompt with precision, build fast because you've earned the right to, deploy correctly.",
    readingTime: "4 min read",
    estimatedMinutes: 4,
  },
];

export const defaultProgress: Record<string, LessonProgress> = {
  "my-first-website": { lessonId: "my-first-website", completed: false, bookmarked: false, progress: 0, lastReadAt: null },
  introduction: { lessonId: "introduction", completed: true, bookmarked: false, progress: 100, lastReadAt: "2026-07-28T14:30:00Z" },
  "toolkit-and-workflow": { lessonId: "toolkit-and-workflow", completed: true, bookmarked: false, progress: 100, lastReadAt: "2026-07-28T15:00:00Z" },
  "claude-code-vs-free-path": { lessonId: "claude-code-vs-free-path", completed: true, bookmarked: true, progress: 100, lastReadAt: "2026-07-28T16:00:00Z" },
  "why-this-stack": { lessonId: "why-this-stack", completed: false, bookmarked: false, progress: 100, lastReadAt: "2026-07-29T09:00:00Z" },
  "prompting-vs-prompt-engineering": { lessonId: "prompting-vs-prompt-engineering", completed: false, bookmarked: false, progress: 100, lastReadAt: "2026-07-29T10:00:00Z" },
  "the-initial-build": { lessonId: "the-initial-build", completed: false, bookmarked: false, progress: 65, lastReadAt: "2026-07-29T11:00:00Z" },
  "version-control": { lessonId: "version-control", completed: false, bookmarked: true, progress: 30, lastReadAt: "2026-07-29T14:00:00Z" },
  deployment: { lessonId: "deployment", completed: false, bookmarked: false, progress: 0, lastReadAt: null },
  "domain-and-dns": { lessonId: "domain-and-dns", completed: false, bookmarked: false, progress: 0, lastReadAt: null },
  "environment-variables": { lessonId: "environment-variables", completed: false, bookmarked: false, progress: 0, lastReadAt: null },
  "connecting-a-database": { lessonId: "connecting-a-database", completed: false, bookmarked: false, progress: 0, lastReadAt: null },
  "things-that-break": { lessonId: "things-that-break", completed: false, bookmarked: false, progress: 0, lastReadAt: null },
  "production-management": { lessonId: "production-management", completed: false, bookmarked: false, progress: 0, lastReadAt: null },
  pricing: { lessonId: "pricing", completed: false, bookmarked: false, progress: 0, lastReadAt: null },
  "getting-paid": { lessonId: "getting-paid", completed: false, bookmarked: false, progress: 0, lastReadAt: null },
  glossary: { lessonId: "glossary", completed: false, bookmarked: false, progress: 0, lastReadAt: null },
  "cheat-sheet": { lessonId: "cheat-sheet", completed: false, bookmarked: false, progress: 0, lastReadAt: null },
  closing: { lessonId: "closing", completed: false, bookmarked: false, progress: 0, lastReadAt: null },
};

export const courseState: CourseState = {
  totalLessons: 19,
  completedLessons: 3,
  currentLessonId: "the-initial-build",
  totalReadingTime: "2h 10min",
  lastSessionDate: "2026-07-29T14:00:00Z",
  streak: 5,
};

export const bookmarks: Bookmark[] = [
  {
    id: "bm-1",
    lessonId: "claude-code-vs-free-path",
    lessonTitle: "Claude Code vs. the Free Path",
    chapter: 2,
    excerpt: "If you're taking this seriously as a way to make money, budget for Claude Code from day one — it pays for itself on your first small client project.",
    timestamp: "2026-07-28T16:05:00Z",
  },
  {
    id: "bm-2",
    lessonId: "version-control",
    lessonTitle: "Version Control: Why GitHub Isn't Optional",
    chapter: 6,
    excerpt: "An agent can make several changes across multiple files in a single instruction. Without commits along the way, if one of those changes is wrong, you may have no clean way to isolate and undo just that piece.",
    timestamp: "2026-07-29T14:15:00Z",
  },
];

export const recentActivity: RecentActivity[] = [
  {
    lessonId: "version-control",
    lessonTitle: "Version Control: Why GitHub Isn't Optional",
    chapter: 6,
    action: "continued",
    timestamp: "2026-07-29T14:00:00Z",
  },
  {
    lessonId: "the-initial-build",
    lessonTitle: "The Initial Build",
    chapter: 5,
    action: "continued",
    timestamp: "2026-07-29T11:00:00Z",
  },
  {
    lessonId: "prompting-vs-prompt-engineering",
    lessonTitle: "The Mindset Shift: Prompting vs. Prompt Engineering",
    chapter: 4,
    action: "completed",
    timestamp: "2026-07-29T10:00:00Z",
  },
  {
    lessonId: "why-this-stack",
    lessonTitle: "Why This Stack, and Why Almost All of It Is Free",
    chapter: 3,
    action: "completed",
    timestamp: "2026-07-29T09:00:00Z",
  },
  {
    lessonId: "claude-code-vs-free-path",
    lessonTitle: "Claude Code vs. the Free Path",
    chapter: 2,
    action: "completed",
    timestamp: "2026-07-28T16:00:00Z",
  },
];
