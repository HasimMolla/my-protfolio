import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { site } from "@/lib/data";
import { LocalClock } from "@/components/ui/local-clock";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-line pt-8 pb-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Image
            src="/assets/signature.png"
            alt={site.name}
            width={1200}
            height={389}
            // Third use of the one preloaded signature file — already in cache,
            // so eager costs no request and keeps every instance consistent.
            loading="eager"
            className="signature-ink h-8 w-auto opacity-70"
          />
          <p className="mt-3 font-mono text-[0.6875rem] tracking-wide text-faint">
            © {new Date().getFullYear()} {site.name} · Built with Next.js &
            Tailwind
          </p>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <p className="font-mono text-[0.6875rem] tracking-wide text-faint">
            Kolkata · <LocalClock />
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-text"
          >
            <ArrowUp
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
