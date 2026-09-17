import { ArrowUp, ArrowUpRight } from "lucide-react";
import { nav, site, socials } from "@/lib/data";
import { LocalClock } from "@/components/ui/local-clock";
import { SignatureReveal } from "@/components/ui/signature-reveal";
import { BrandIcon } from "@/components/icons/brand-icons";

function Column({ label, children, className }) {
  return (
    <div className={className}>
      <p className="section-label">{label}</p>
      <ul className="mt-3 space-y-2" role="list">
        {children}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-10 border-t border-line pt-6">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
        <Column label="Menu">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="link-underline text-[0.8125rem] text-muted transition-colors hover:text-text"
              >
                {item.label}
              </a>
            </li>
          ))}
        </Column>

        {/* On mobile the two link lists pair up and Contact drops to its own
            full-width row, so the address never has to break mid-word. */}
        <Column
          label="Contact"
          className="order-last col-span-2 sm:order-none sm:col-span-1"
        >
          <li>
            <a
              href={`mailto:${site.email}`}
              className="link-underline text-[0.8125rem] text-muted transition-colors hover:text-text"
            >
              {site.email}
            </a>
          </li>
          <li className="text-[0.8125rem] text-muted">{site.location}</li>
        </Column>

        <Column label="Socials">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[0.8125rem] text-muted transition-colors hover:text-text"
              >
                <BrandIcon
                  name={social.brand}
                  className="size-3.5 shrink-0 text-faint transition-colors group-hover:text-text"
                />
                <span className="link-underline">{social.label}</span>
                <ArrowUpRight
                  size={11}
                  className="text-faint opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </a>
            </li>
          ))}
        </Column>
      </div>

      {/* Signed off by hand — drawn on as it scrolls into view. */}
      <SignatureReveal className="mx-auto mt-10 w-3/5 opacity-[0.16] dark:opacity-[0.22]" />

      <div className="mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-5 pb-10">
        <p className=" text-xs tracking-wide text-faint">
          © {new Date().getFullYear()} {site.name}.
        </p>

        <div className="flex items-center gap-5">
          <p className=" text-xs tracking-wide text-faint tabular-nums">
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
