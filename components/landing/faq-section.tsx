import { Reveal } from "./reveal";

const faqs = [
  {
    q: "will_this_actually_get_me_paid",
    a: "The guide won&rsquo;t get you a client. It gets you to the point where you can take one seriously &mdash; deployed, priced, and not embarrassed when they ask a real question.",
  },
  {
    q: "im_not_technical_is_that_a_problem",
    a: "No. This assumes you can already get an AI to write code. It&rsquo;s everything after that moment that this covers.",
  },
  {
    q: "whats_the_13_dollar_tier_for",
    a: "Direct email access if you get stuck on your own build. Most people don&rsquo;t need it. Some do.",
  },
];

export function FAQSection() {
  return (
    <section className="relative py-24 px-6 md:px-12 overflow-hidden bg-dusk">
      <div className="absolute inset-0 bg-gradient-to-b from-dusk via-[#0f0e10] to-dusk" />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 50%, #C9A24B 0%, transparent 50%)",
        }}
      />
      <Reveal>
        <div className="relative max-w-[44rem] mx-auto">
          <div className="text-center mb-12">
            <div className="font-mono text-[11px] tracking-[0.2em] text-gold uppercase mb-4">
              // faq_database
            </div>
            <h2 className="font-serif font-semibold text-[2.2rem] leading-[1.25] text-parchment max-w-[34rem] mx-auto">
              The stuff you&rsquo;re already wondering.
            </h2>
          </div>
          <div className="space-y-0">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-white/10 py-5">
                <div className="font-mono text-[13px] text-gold mb-2">
                  <span className="text-muteddark"># </span>{faq.q}
                </div>
                <p className="font-sans text-[14.5px] text-[#c9c6bd] leading-[1.7]">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
