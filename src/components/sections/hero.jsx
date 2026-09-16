"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import { site, socials } from "@/lib/data";
import { TextReveal } from "@/components/ui/text-reveal";
import { Reveal } from "@/components/ui/reveal";
import { BrandIcon } from "@/components/icons/brand-icons";
import { cn } from "@/lib/utils";

function Meta({ label, children, className }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <p className="section-label">{label}</p>
      <div className="text-sm text-text">{children}</div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="pt-6 pb-4 sm:pt-10">
      <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <div className="min-w-0 flex-1">
          <TextReveal
            as="h1"
            text={`Hey, I'm ${site.shortName}.`}
            delay={0.1}
            className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[2.6rem]"
          />

          <Reveal delay={0.55} y={10}>
            <p className="mt-3 text-lg text-muted">
              {site.role} based in{" "}
              <span className="font-serif text-[1.15em] text-text italic">
                Kolkata
              </span>
              .
            </p>
          </Reveal>

          <Reveal delay={0.65} y={10}>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-bg-subtle px-3 py-1.5 text-xs text-muted">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              {site.availableLabel}
            </span>
          </Reveal>
        </div>

        {/* Portrait, tilted very slightly so it reads as a pinned print. */}
        <Reveal delay={0.2} y={20} className="shrink-0">
          <motion.div
            whileHover={{ rotate: 0, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative w-32 rotate-[-2.5deg] rounded-xl border border-line bg-surface p-1.5 shadow-card sm:w-40"
          >
            <Image
              src="/assets/portrait.jpg"
              alt={`${site.name}, ${site.role}`}
              width={1100}
              height={1467}
              preload
              loading="eager"
              sizes="(max-width: 640px) 128px, 160px"
              className="h-auto w-full rounded-lg object-cover"
            />
          </motion.div>
        </Reveal>
      </div>

      {/* Quick facts, in the spirit of a CV header. */}
      <Reveal delay={0.3}>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 sm:grid-cols-3">
          <Meta label="Location">
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={13} className="text-faint" />
              {site.location}
            </span>
          </Meta>
          {/* Two columns can't hold the address without breaking it mid-word,
              so on mobile it drops to its own full-width row. */}
          <Meta label="Email" className="order-last col-span-2 sm:order-none sm:col-span-1">
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
              Frontend at{" "}
              <span className="text-text">Martian Corporation</span>
            </span>
          </Meta>
        </dl>
      </Reveal>

      {/* The letter. Serif italics carry the emphasis instead of bold. */}
      <Reveal delay={0.36}>
        <div className="mt-8 space-y-5 text-[0.975rem] leading-[1.75] text-muted text-pretty">
          <p>
            I build the front of web products — the part people actually touch.
            For the past two years that has meant leading frontend at Martian
            Corporation across{" "}
            <span className="font-serif text-[1.1em] text-text italic">
              EdTech, PropTech and Healthcare
            </span>
            , taking each product from an empty repository to something a team
            depends on every day.
          </p>
          <p>
            Most of it lives in React and Next.js: a learning platform with lead
            tracking and course progress, a property CRM with analytics and
            payments, a hospital system juggling appointments and doctor
            schedules. Unglamorous software, used constantly — which is exactly
            the kind I like getting right.
          </p>
          <p>
            On the side I build{" "}
            <a
              href="https://nirmaan-ui.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="link-prose text-text"
            >
              Nirmaan UI
            </a>
            , a component library for people who would rather ship than
            re-solve the same layout problem, and{" "}
            <a
              href="https://mypyqbuddy.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-prose text-text"
            >
              MyPYQBuddy
            </a>
            , an exam-prep platform for life-science students.
          </p>
          <p>
            Always happy to talk about frontend, design systems, or a product
            you are trying to get off the ground.{" "}
            <a
              href={`mailto:${site.email}`}
              className="link-prose text-text"
            >
              Say hello
            </a>{" "}
            — or find me below.
          </p>
        </div>
      </Reveal>

      {/* Signs off the letter above. */}
      <Reveal delay={0.44}>
        <Image
          src="/assets/signature.png"
          alt={`${site.name}'s signature`}
          width={1200}
          height={389}
          // Same file as the nav mark, so this costs no extra request — but it
          // can win LCP on a tall viewport, and Next matches that heuristic by
          // src, so it needs to be eager too.
          loading="eager"
          className="signature-ink mt-7 h-12 w-auto opacity-90 sm:h-14"
        />
      </Reveal>

      <Reveal delay={0.5}>
        <ul className="mt-8 flex flex-wrap items-center gap-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[0.8125rem] text-muted transition-colors hover:border-line-strong hover:bg-bg-subtle hover:text-text"
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
