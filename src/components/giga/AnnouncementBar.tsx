import Link from "next/link";
import { SITE } from "@/lib/constants";

export function AnnouncementBar() {
  return (
    <div className="fixed top-0 z-[60] w-full border-b border-white/10 bg-[#0c0c0c]/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 py-2.5">
        <p className="text-center text-xs text-[#f5f5f0]/70">
          <span className="font-mono uppercase tracking-widest text-[#f5f5f0]/50">
            New
          </span>
          {" · "}
          {SITE.name} — Enterprise AI ecosystem, live in weeks.{" "}
          <Link href="/demo" className="underline hover:text-[#f5f5f0]">
            Talk to us
          </Link>
        </p>
      </div>
    </div>
  );
}
