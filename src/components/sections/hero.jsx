"use client";

import Image from "next/image";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import { linkPreviews, site, socials } from "@/lib/data";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/ui/reveal";
import { LinkPreview } from "@/components/ui/link-preview";
import { FlipPortrait } from "@/components/ui/flip-portrait";
import { BrandIcon } from "@/components/icons/brand-icons";
import { cn } from "@/lib/utils";

function Meta({ label, children, className }) {
  return (
    <div className={cn("space-y-1", className)}>
      <p className="section-label">{label}</p>
      <div className="text-sm text-text">{children}</div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="pt-4 pb-2 sm:pt-7">
      <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <div className="min-w-0 flex-1">
          <TextReveal
            as="h1"
            text={`Hey, I'm ${site.shortName}.`}
            delay={0.1}
            className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[2.5rem]"
          />

          <Reveal delay={0.55} y={10}>
            <p className="mt-2.5 text-lg text-muted">
              {site.role} based in{" "}
              <span className="font-serif text-[1.15em] text-text italic">
                Kolkata
              </span>
              .
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={20} className="shrink-0">
          <FlipPortrait />
        </Reveal>
      </div>

      {/* Quick facts, in the spirit of a CV header. */}
      <Reveal delay={0.3}>
        <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-4 sm:grid-cols-3">
          <Meta label="Location">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} className="text-faint" />
              {site.location}
            </span>
          </Meta>
          {/* Two columns can't hold the address without breaking it mid-word,
              so on mobile it drops to its own full-width row. */}
          <Meta
            label="Email"
            className="order-last col-span-2 sm:order-none sm:col-span-1"
          >
            <a
              href={`mailto:${site.email}`}
              className="link-underline inline-flex items-center gap-1.5 hover:text-text"
            >
              <Mail size={13} className="shrink-0 text-faint" />
              {site.email}
            </a>
          </Meta>
          <Meta label="Currently">
            <span className="text-muted">
              Building at <span className="text-text">Martian Corporation</span>
            </span>
          </Meta>
        </dl>
      </Reveal>

      {/* The letter. Serif italics carry the emphasis instead of bold. */}
      <Reveal delay={0.36}>
        <div className="mt-6 space-y-4 text-[0.95rem] leading-[1.7] text-muted text-pretty">
          <p>
            I build the part of a product people actually touch. For the past two
            years I&apos;ve led frontend at Martian Corporation across{" "}
            <span className="font-serif text-[1.1em] text-text italic">
              EdTech, PropTech and Healthcare
            </span>
            , taking each one from an empty repository to something a team uses
            every day.
          </p>
          <p>
            Most of that is React and Next.js — but I&apos;ve stopped
            introducing myself by framework. Stacks turn over faster than ever,
            and the skills that carry are the portable ones: reading an
            unfamiliar codebase quickly, asking sharper questions, and knowing
            what to hand to AI versus what to reason through myself. I work with
            it daily as a tool, not a shortcut, and I&apos;ll pick up whatever a
            problem actually calls for.
          </p>
          <p>
            On the side I build{" "}
            <LinkPreview
              href={linkPreviews["nirmaan-ui"].href}
              image={linkPreviews["nirmaan-ui"].image}
            >
              Nirmaan UI
            </LinkPreview>{" "}
            and{" "}
            <LinkPreview
              href={linkPreviews.mypyqbuddy.href}
              image={linkPreviews.mypyqbuddy.image}
            >
              MyPYQBuddy
            </LinkPreview>
            . Always happy to talk about frontend, systems, or something
            you&apos;re trying to get off the ground —{" "}
            <a href={`mailto:${site.email}`} className="link-prose text-text">
              say hello
            </a>
            .
          </p>
        </div>
      </Reveal>

      

      <Reveal delay={0.5}>
        <ul className="mt-5 flex flex-wrap items-center gap-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[0.8125rem] text-muted transition-colors hover:border-line-strong hover:bg-bg-subtle hover:text-text"
              >
                <BrandIcon
                  name={social.brand}
                  className="size-3.5 transition-transform duration-300 group-hover:scale-110"
                />
                {social.label}
                <ArrowUpRight
                  size={12}
                  className="text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
