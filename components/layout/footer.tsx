import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dusk to-[#0a0a0c]" />
      <div className="relative max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="font-mono text-sm text-parchment mb-3">
              <span className="text-gold">~</span>/course
            </div>
            <p className="font-mono text-xs text-muteddark leading-relaxed max-w-xs">
              A practical, no-hype guide to building and deploying real websites
              with AI.
            </p>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-wider text-muteddark uppercase mb-3">
              Course
            </div>
            <div className="space-y-2">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/#buy">Pricing</FooterLink>
            </div>
          </div>
          <div>
            <div className="font-mono text-[11px] tracking-wider text-muteddark uppercase mb-3">
              Connect
            </div>
            <div className="space-y-2">
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/login">Login</FooterLink>
              <FooterLink href="/register">Register</FooterLink>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="font-mono text-[11px] text-muteddark tracking-wide">
            FROM ZERO TO DEPLOYED — NO HYPE, JUST THE PROCESS.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block font-mono text-xs text-muteddark hover:text-parchment transition-colors"
    >
      {children}
    </Link>
  );
}
