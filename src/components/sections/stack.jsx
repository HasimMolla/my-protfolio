import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { stack } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { BrandIcon, brandHex } from "@/components/icons/brand-icons";

export function Stack() {
  return (
    <Section
      id="stack"
      label="Stack"
      lead="What I reach for. Mostly the React side of the web, plus the tooling that keeps a codebase pleasant six months in."
    >
      <RevealGroup stagger={0.03} className="flex flex-wrap gap-2" role="list">
        {stack.map((item) => (
          <RevealItem key={item.name} as="span" role="listitem" y={10}>
            <a
              href={item.href}
              target="_blank"
              // nofollow: these are references, not endorsements I want to
              // pass link equity to.
              rel="noopener noreferrer nofollow"
              // Each chip carries its own brand colour for both themes, so the
              // tint needs no client-side theme detection.
              style={{
                "--brand": item.brand ? brandHex(item.brand, false) : "var(--text)",
                "--brand-dark": item.brand
                  ? brandHex(item.brand, true)
                  : "var(--text)",
              }}
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 text-[0.8125rem] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-text"
            >
              {item.brand ? (
                <BrandIcon
                  name={item.brand}
                  className="size-4 shrink-0 text-[var(--brand)] dark:text-[var(--brand-dark)]"
                />
              ) : (
                <Image
                  src={item.img}
                  alt=""
                  width={64}
                  height={64}
                  className="size-4 shrink-0 rounded-[3px] object-contain"
                />
              )}
              {item.name}
              <ArrowUpRight
                size={11}
                className="shrink-0 text-faint opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </a>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
