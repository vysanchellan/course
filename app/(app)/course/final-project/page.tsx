import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/actions/auth";
import { isAdmin } from "@/lib/actions/admin";
import { getLessonsWithProgress } from "@/lib/actions/lessons";
import { Callout } from "@/components/reader/callout";
import { CodeBlock } from "@/components/reader/code-block";
import { lessons } from "@/lib/data";

export default async function FinalProjectPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const allLessons = await getLessonsWithProgress();
  const total = allLessons.length;
  const completed = allLessons.filter((l: any) => l.progress?.completed).length;
  const admin = await isAdmin();

  // Only unlock if lessons exist AND all completed (or admin)
  const unlocked = (total > 0 && completed >= total) || admin;

  if (!unlocked) {
    const nextLesson = allLessons.find((l: any) => !l.progress?.completed);
    return (
      <div className="px-6 md:px-12 py-10 max-w-3xl mx-auto">
        <div className="text-center py-20">
          <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-4">
            // final project
          </div>
          <h1 className="font-serif text-3xl font-medium text-parchment mb-4">
            Capstone: Build & Ship a Real Client Site
          </h1>
          <div className="max-w-md mx-auto bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl p-8 mb-6">
            <div className="font-serif text-5xl font-medium text-gold mb-2">
              {completed}/{total}
            </div>
            <p className="font-mono text-sm text-muteddark mb-4">
              Complete all {total} lessons to unlock the final project.
            </p>
            <div className="h-2 rounded-full bg-panelborder overflow-hidden mb-6">
              <div
                className="h-full bg-gold rounded-full transition-all"
                style={{ width: `${(completed / total) * 100}%` }}
              />
            </div>
            {nextLesson && (
              <Link
                href={`/course/${nextLesson.slug}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-goldsoft text-ink font-mono text-sm font-bold px-6 py-3 rounded-sm hover:shadow-lg hover:shadow-gold/20 transition-all"
              >
                Continue to {nextLesson.title} &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 lg:px-16 py-10 md:py-14 max-w-4xl mx-auto">
      <div className="mb-10">
        <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-3">
          Capstone
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-medium leading-tight text-parchment mb-3">
          Build &amp; Ship a Real Client Site
        </h1>
        <p className="font-serif text-lg text-[#c9c6bd]/60 italic">
          A complete worked example — from blank prompt to deployed, live site with a real domain.
        </p>
        <div className="flex items-center gap-4 mt-5">
          <span className="font-mono text-xs text-muteddark">30 min to build</span>
        </div>
      </div>

      <div className="prose-course-dark space-y-6 [&>div]:my-8 [&>pre]:my-8">
        <p>
          This is the capstone: you&rsquo;re going to build a real client website from start to finish.
          Every step you&rsquo;ve learned in the preceding lessons comes together here.
        </p>
        <p>
          The project: a photography portfolio for a fictional freelance photographer named Elena.
          She needs a one-page portfolio site with a gallery, about section, contact form, and booking link.
        </p>

        <h2 className="font-serif text-2xl font-medium text-parchment mt-12 mb-4">Step 1: The Prompt</h2>
        <p>
          Open your AI agent and give it this prompt:
        </p>
        <Callout variant="note" title="prompt.txt">
          Build a single-page portfolio website for a freelance photographer.
          Tech stack: Next.js 15, TypeScript, Tailwind CSS. Deploy to Vercel.
          The page should have: a hero section with full-bleed background image placeholder, a gallery grid
          (3 columns, 9 items with aspect-ratio 4:3), an about section with a circular headshot placeholder,
          a contact form with name/email/message fields, social media links, and a sticky navigation bar
          that links to each section. Use a minimalist, editorial design with a dark color scheme.
        </Callout>
        <p>
          Watch the agent build it. Don&rsquo;t intervene — let it run. Once it finishes, review what was generated.
        </p>

        <h2 className="font-serif text-2xl font-medium text-parchment mt-12 mb-4">Step 2: Review &amp; Refine</h2>
        <p>
          Check the output for these things:
        </p>
        <Callout variant="warning" title="review_checklist">
          Does the gallery actually render 9 images or just placeholder boxes? Are section IDs set up for smooth scroll
          (hero, gallery, about, contact)? Is the nav highlighting the active section? Is the form wired up
          (even to a dummy endpoint)? If any of these are missing, prompt the agent to fix them one at a time.
        </Callout>
        <p>
          Once the basic structure is solid, refine the visual design. Ask the agent to make specific changes:
        </p>
        <CodeBlock
          language="prompt"
          code='Make the hero use a dark gradient overlay on the background image. Change the gallery grid to use aspect-video. Add a subtle hover scale effect on gallery items. Make the nav bar glass-morphism with backdrop-blur. Use these colors: background #0B0B0D, accent #C9A24B, text #F3EEE1.'
        />

        <h2 className="font-serif text-2xl font-medium text-parchment mt-12 mb-4">Step 3: Version Control</h2>
        <p>
          Initialize Git and make your first commit:
        </p>
        <CodeBlock
          language="bash"
          code={`git init
git add -A
git commit -m "feat: initial photography portfolio scaffold"`}
        />
        <p>
          Create a repository on GitHub, connect it, and push:
        </p>
        <CodeBlock
          language="bash"
          code={`git remote add origin https://github.com/your-username/photography-portfolio.git
git branch -M main
git push -u origin main`}
        />
        <div className="font-mono text-sm text-diffadd bg-diffadd/10 border border-diffadd/20 rounded-sm px-4 py-3 my-8">
          ✓ Done. Your project is now backed up and visible on GitHub.
        </div>

        <h2 className="font-serif text-2xl font-medium text-parchment mt-12 mb-4">Step 4: Deploy to Vercel</h2>
        <p>
          Go to vercel.com, import your GitHub repository, and deploy. This should take under 2 minutes.
          Vercel detects Next.js automatically — no configuration needed.
        </p>
        <CodeBlock
          language="bash"
          code={`# Vercel will run these automatically:
vercel --prod

# Or connect via the Vercel dashboard:
# 1. New Project → Import Git Repository
# 2. Select your photography-portfolio repo
# 3. Deploy`}
        />
        <p>
          Once deployed, Vercel gives you a URL like <code className="text-gold">your-project.vercel.app</code>.
          Open it. That&rsquo;s your live site.
        </p>
        <div className="font-mono text-sm text-diffadd bg-diffadd/10 border border-diffadd/20 rounded-sm px-4 py-3 my-8">
          ✓ Your site is live on the public internet. Anyone with the link can see it.
        </div>

        <h2 className="font-serif text-2xl font-medium text-parchment mt-12 mb-4">Step 5: Connect a Domain</h2>
        <p>
          Buy a domain from a registrar like Namecheap or Cloudflare. For this example, let&rsquo;s say you bought
          <code className="text-gold"> elenastudios.com</code>.
        </p>
        <Callout variant="insight" title="domain_setup">
          In your Vercel dashboard: go to your project → Settings → Domains. Enter elenastudios.com.
          Vercel provides DNS records to add at your registrar. Add a CNAME record pointing to
          cname.vercel-dns.com. Wait up to an hour for propagation, then visit elenastudios.com.
        </Callout>

        <h2 className="font-serif text-2xl font-medium text-parchment mt-12 mb-4">Step 6: The Final Commit</h2>
        <p>
          You now have a real, deployed website with a real domain. One last commit to mark the milestone:
        </p>
        <CodeBlock
          language="bash"
          code={`git add -A
git commit -m "feat: photography portfolio v1 — live at elenastudios.com"
git push`}
        />
        <Callout variant="tip" title="done">
          That&rsquo;s it. From a blank prompt to a deployed client site with a custom domain in under
          an hour. This exact process — prompt, review, commit, deploy, domain — is the loop you&rsquo;ll
          repeat for every client project. The tools change. The loop stays the same.
        </Callout>

        <div className="mt-16 pt-8 border-t border-panelborder">
          <Link
            href="/course"
            className="inline-flex items-center gap-2 font-mono text-sm text-gold hover:text-goldsoft transition-colors"
          >
            &larr; Back to course overview
          </Link>
        </div>
      </div>
    </div>
  );
}
