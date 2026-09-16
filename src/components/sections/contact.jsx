import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site, socials } from "@/lib/data";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { CopyEmail } from "@/components/ui/copy-email";
import { BrandIcon } from "@/components/icons/brand-icons";

export function Contact() {
  return (
    <Section id="contact" label="Contact">
      <Reveal>
        <SpotlightCard className="p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <Image
              src="/assets/avatar.jpg"
              alt={site.name}
              width={640}
              height={640}
              sizes="56px"
              className="size-12 shrink-0 rounded-full border border-line object-cover sm:size-14"
            />
            <div className="min-w-0">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-balance sm:text-2xl">
                Let&apos;s build something{" "}
                <span className="font-serif text-[1.1em] italic">worth using</span>.
              </h3>
              <p className="mt-2 text-pretty text-[0.9rem] leading-relaxed text-muted">
                Open to product roles and freelance work — and equally happy
                with a conversation that goes nowhere in particular. If
                you&apos;re building something and the stack isn&apos;t one I
                know yet, that&apos;s usually a point in its favour.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-text px-4 py-2 text-[0.8125rem] font-medium text-bg transition-opacity hover:opacity-85"
            >
              {site.email}
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <CopyEmail email={site.email} />
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-5" role="list">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-[0.8125rem] text-muted transition-colors hover:text-text"
                >
                  <BrandIcon name={social.brand} className="size-3.5" />
                  <span className="link-underline">{social.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </Reveal>
    </Section>
  );
}
