export function Contents() {
  const files = [
    "toolkit-and-workflow.md",
    "why-this-stack-is-free.md",
    "prompting-vs-prompt-engineering.md",
    "the-initial-build.md",
    "version-control.md",
    "deployment.md",
    "domain-and-dns.md",
    "environment-variables.md",
    "connecting-a-database.md",
    "things-that-break.md",
    "production-management.md",
    "pricing.md",
    "getting-paid.md",
  ];

  return (
    <section className="bg-dusk py-24 px-6 md:px-16">
      <div className="max-w-2xl mx-auto">
        <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-6">
          What&rsquo;s Inside
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-parchment mb-10">
          Thirteen sections. No filler.
        </h2>
        <div className="bg-panel border border-panelborder rounded-md p-6 md:p-8 font-mono text-[13px] leading-[2.1] text-[#c9c6bd] overflow-x-auto">
          <div className="text-muteddark mb-1">$ ls ./course</div>
          {files.map((file, i) => (
            <div key={file}>
              <span className="text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              {file}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
