export default function ContactPage() {
  return (
    <div className="bg-parchment">
      <div className="max-w-2xl mx-auto px-6 md:px-16 py-24">
        <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-6">
          Contact
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-medium mb-4 leading-tight">
          Get in touch.
        </h1>
        <p className="font-serif text-lg text-ink/60 leading-relaxed mb-10">
          Have a question about the guide? Want to discuss a custom project?
          Send a message and I&rsquo;ll get back to you within 24 hours.
        </p>

        {/* TODO: Replace with actual form submission in Phase 2 */}
        <div className="border border-ink/10 rounded-md p-6 bg-parchment">
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-xs font-medium text-ink/70 uppercase tracking-wider mb-1.5">
                Name
              </label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 bg-transparent border border-ink/20 rounded-sm font-mono text-sm text-ink placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-medium text-ink/70 uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3.5 py-2.5 bg-transparent border border-ink/20 rounded-sm font-mono text-sm text-ink placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block font-mono text-xs font-medium text-ink/70 uppercase tracking-wider mb-1.5">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-3.5 py-2.5 bg-transparent border border-ink/20 rounded-sm font-mono text-sm text-ink placeholder:text-muteddark/50 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"
                placeholder="What's on your mind?"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-ink text-parchment font-mono text-sm font-medium px-6 py-3 rounded-sm hover:bg-ink/85 transition-colors"
            >
              Send message →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
