export default function ContactPage() {
  return (
    <div className="bg-dusk min-h-screen">
      <div className="max-w-2xl mx-auto px-6 md:px-16 py-24">
        <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-6">
          Contact
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4 leading-tight text-parchment">
          Get in touch.
        </h1>
        <p className="font-sans text-lg text-[#c9c6bd]/60 leading-relaxed mb-10">
          Have a question about the guide? Want to discuss a custom project?
          Send a message and I&rsquo;ll get back to you within 24 hours.
        </p>

        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-xs font-medium text-[#c9c6bd]/70 uppercase tracking-wider mb-1.5">
                Name
              </label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-sm font-mono text-sm text-parchment placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-medium text-[#c9c6bd]/70 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-sm font-mono text-sm text-parchment placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-medium text-[#c9c6bd]/70 uppercase tracking-wider mb-1.5">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-3.5 py-2.5 bg-transparent border border-white/10 rounded-sm font-mono text-sm text-parchment placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"
                placeholder="What&rsquo;s on your mind?"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gold text-[#171310] font-mono text-sm font-bold px-6 py-3 rounded-sm hover:bg-goldsoft transition-colors"
            >
              Send message &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
