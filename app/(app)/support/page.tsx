import { redirect } from "next/navigation";
import { getAccessLevel } from "@/lib/access";
import { CopyButton } from "./copy-button";

export default async function SupportPage() {
  const accessLevel = await getAccessLevel();

  if (accessLevel !== "premium" && accessLevel !== "admin") {
    redirect("/pricing");
  }

  const supportEmail = process.env.SUPPORT_EMAIL || "chellanvysan@gmail.com";

  return (
    <div className="px-6 md:px-12 py-10 max-w-2xl mx-auto">
      <div className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase mb-2">
        Support
      </div>
      <h1 className="font-serif text-2xl md:text-3xl font-medium text-parchment mb-6">
        Direct support.
      </h1>
      <p className="font-serif text-lg text-[#c9c6bd]/80 leading-relaxed mb-8">
        Premium buyers get direct email access for questions on their build.
      </p>
      <div className="bg-panel border border-panelborder rounded-md p-6 flex items-center justify-between">
        <a
          href={`mailto:${supportEmail}`}
          className="font-mono text-sm text-gold hover:underline"
        >
          {supportEmail}
        </a>
        <CopyButton text={supportEmail} />
      </div>
    </div>
  );
}
