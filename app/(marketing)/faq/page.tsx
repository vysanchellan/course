const faqs = [
  {
    q: "Do I need to know how to code?",
    a: "Some familiarity helps, but you don't need to be a professional developer. The guide is written for people who understand the basics of how websites work and want a repeatable process for building them with AI assistance.",
  },
  {
    q: "What tools do I need?",
    a: "A computer, an internet connection, and Claude Pro ($20/month). Every other tool in the stack is free — Next.js, TypeScript, Tailwind CSS, GitHub, Vercel, and Supabase.",
  },
  {
    q: "Is this a video course or a PDF?",
    a: "It's a written guide delivered as a web application. The content is formatted for reading, with code examples, terminal blocks, and callouts. A PDF version will be available as a bonus download later.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. If the guide doesn't help you build and deploy a real website, I'll refund your purchase within 30 days. No questions asked.",
  },
  {
    q: "What if I get stuck?",
    a: "The guide includes a section on debugging and troubleshooting. You'll also have access to a private community where you can ask questions and share your progress.",
  },
];

export default function FAQPage() {
  return (
    <div className="bg-parchment">
      <div className="max-w-2xl mx-auto px-6 md:px-16 py-24">
        <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-6">
          FAQ
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-10 leading-tight">
          Frequently asked questions.
        </h1>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-ink/10 rounded-md bg-parchment p-6"
            >
              <h3 className="font-mono text-sm font-medium text-ink mb-3">
                {faq.q}
              </h3>
              <p className="font-serif text-base leading-relaxed text-ink/70">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
