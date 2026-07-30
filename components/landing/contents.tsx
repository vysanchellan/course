export function Contents() {
  const files = [
    { num: "00", name: "introduction.md" },
    { num: "01", name: "the-exact-toolkit-and-workflow.md" },
    { num: "02", name: "claude-code-vs-the-free-path.md" },
    { num: "03", name: "why-this-stack-and-why-almost-all-of-it-is-free.md" },
    { num: "04", name: "the-mindset-shift-prompting-vs-prompt-engineering.md" },
    { num: "05", name: "the-initial-build-20-30-minutes-done-properly.md" },
    { num: "06", name: "version-control-why-github-isnt-optional.md" },
    { num: "07", name: "deployment-going-from-local-to-live.md" },
    { num: "08", name: "buying-a-domain-and-connecting-it-properly.md" },
    { num: "09", name: "environment-variables.md" },
    { num: "10", name: "connecting-a-real-database.md" },
    { num: "11", name: "things-that-break-and-how-to-actually-fix-them.md" },
    { num: "12", name: "production-management.md" },
    { num: "13", name: "pricing-what-to-actually-charge-a-client.md" },
    { num: "14", name: "getting-paid.md" },
    { num: "+", name: "glossary.md" },
    { num: "+", name: "the-one-page-cheat-sheet.md" },
    { num: "+", name: "closing.md" },
  ];

  return (
    <section className="relative py-28 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dusk via-[#0f0e10] to-dusk" />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 50%, #C9A24B 0%, transparent 50%)",
        }}
      />
      <div className="relative max-w-2xl mx-auto">
        <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-6">
          What&rsquo;s Inside
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-parchment mb-10">
          Fourteen sections. Plus glossary, cheat sheet, and closing.
        </h2>
        <div className="bg-white/[0.03] backdrop-blur-sm border border-white/5 rounded-xl p-6 md:p-8 font-mono text-[13px] leading-[2.1] text-[#c9c6bd] overflow-x-auto">
          <div className="text-muteddark mb-1">$ ls ./course</div>
          {files.map((file) => (
            <div key={file.name}>
              <span className="text-gold">{file.num}</span>{" "}
              {file.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
