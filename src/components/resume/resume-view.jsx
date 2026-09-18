"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Mail, MapPin, Phone, Printer } from "lucide-react";
import { site, socials } from "@/lib/data";
import { resume } from "@/lib/resume";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { BrandIcon, brandIcons } from "@/components/icons/brand-icons";
import { cn } from "@/lib/utils";

const COMPACT_BULLETS = 3;

function Block({ label, children, className }) {
  return (
    <section className={cn("break-inside-avoid", className)}>
      <h2 className="section-label border-b border-line pb-2">{label}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Bullets({ items }) {
  return (
    <ul className="space-y-1.5" role="list">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-4 text-pretty text-[0.875rem] leading-relaxed text-muted before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-faint"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ResumeView() {
  const [detailed, setDetailed] = useState(true);

  const contacts = [
    { label: site.email, href: `mailto:${site.email}`, icon: Mail },
    ...(resume.showPhone
      ? [{ label: resume.phone, href: `tel:${resume.phone.replace(/\s/g, "")}`, icon: Phone }]
      : []),
  ];

  return (
    <>
      {/* Screen-only toolbar. */}
      <div className="print:hidden">
        <div className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between gap-3 px-4 sm:px-8">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[0.8125rem] text-muted transition-colors hover:text-text"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
              Portfolio
            </Link>

            <div className="flex items-center gap-1.5">
              {/* Two densities: one that fits a page, one that tells the story. */}
              <div
                role="group"
                aria-label="Detail level"
                className="flex items-center rounded-full border border-line p-0.5"
              >
                {[
                  ["Compact", false],
                  ["Detailed", true],
                ].map(([label, value]) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setDetailed(value)}
                    aria-pressed={detailed === value}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs transition-colors",
                      detailed === value
                        ? "bg-text text-bg"
                        : "text-muted hover:text-text",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:bg-bg-subtle hover:text-text"
              >
                <Printer size={13} />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-3xl px-5 pt-10 pb-20 sm:px-8 print:max-w-none print:px-0 print:pt-0 print:pb-0">
        {/* Header */}
        <header className="break-inside-avoid">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h1 className="text-[1.75rem] leading-tight font-semibold tracking-[-0.03em] sm:text-[2rem]">
                {site.name}
              </h1>
              <p className="mt-1 text-base text-muted">{site.role}</p>
            </div>
            <Image
              src="/assets/signature.png"
              alt=""
              width={1200}
              height={389}
              className="signature-ink mt-1 hidden h-9 w-auto shrink-0 opacity-80 sm:block"
            />
          </div>

          <ul
            className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.8125rem] text-muted"
            role="list"
          >
            <li className="inline-flex items-center gap-1.5">
              <MapPin size={13} className="text-faint" />
              {site.location}
            </li>
            {contacts.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="link-underline inline-flex items-center gap-1.5 hover:text-text"
                >
                  <Icon size={13} className="text-faint" />
                  {label}
                </a>
              </li>
            ))}
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1.5 hover:text-text"
                >
                  <BrandIcon name={social.brand} className="size-3 text-faint" />
                  {social.handle}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-pretty text-[0.9rem] leading-relaxed text-muted">
            {resume.summary}
          </p>
        </header>

        <div className="mt-9 space-y-9">
          <Block label="Experience">
            <div className="space-y-7">
              {resume.experience.map((job) => (
                <article key={job.company} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-[0.95rem] font-semibold tracking-[-0.01em]">
                      {job.role}
                      <span className="text-muted"> · {job.company}</span>
                    </h3>
                    <p className="section-label shrink-0">{job.period}</p>
                  </div>
                  <p className="mt-1 text-[0.8125rem] text-muted">
                    {job.location} · {job.type}
                  </p>

                  <div className="mt-3">
                    <Bullets
                      items={
                        detailed
                          ? job.highlights
                          : job.highlights.slice(0, COMPACT_BULLETS)
                      }
                    />
                  </div>

                  <ul
                    className="mt-3.5 flex flex-wrap items-center gap-3"
                    role="list"
                  >
                    {job.tech.map((key) => (
                      <li key={key} title={brandIcons[key]?.title} className="text-faint">
                        <BrandIcon name={key} className="size-4" />
                        <span className="sr-only">{brandIcons[key]?.title}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Block>

          <Block label="Projects">
            <div className="space-y-6">
              {resume.projects.map((project) => (
                <article key={project.name} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-[0.95rem] font-semibold tracking-[-0.01em]">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline"
                      >
                        {project.name}
                      </a>
                    </h3>
                    <p className="section-label">{project.note}</p>
                  </div>
                  <div className="mt-2.5">
                    <Bullets
                      items={
                        detailed
                          ? project.highlights
                          : project.highlights.slice(0, 2)
                      }
                    />
                  </div>
                </article>
              ))}
            </div>
          </Block>

          <Block label="Skills">
            <dl className="space-y-2.5">
              {resume.skills.map((row) => (
                <div
                  key={row.group}
                  className="flex flex-col gap-x-4 gap-y-1 sm:flex-row"
                >
                  <dt className="section-label shrink-0 sm:w-24 sm:pt-0.5">
                    {row.group}
                  </dt>
                  <dd className="text-[0.875rem] text-muted">
                    {row.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <div className="grid gap-9 sm:grid-cols-2">
            <Block label="Education">
              {resume.education.map((entry) => (
                <div key={entry.institution}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-[0.95rem] font-semibold tracking-[-0.01em]">
                      {entry.institution}
                    </h3>
                    <p className="section-label shrink-0">{entry.period}</p>
                  </div>
                  <p className="mt-1 text-[0.875rem] text-muted">
                    {entry.qualification}
                  </p>
                  <p className="mt-0.5 text-[0.8125rem] text-faint">{entry.detail}</p>
                </div>
              ))}
            </Block>

            <Block label="Languages">
              <ul className="space-y-1.5" role="list">
                {resume.languages.map((language) => (
                  <li key={language.name} className="text-[0.875rem] text-muted">
                    <span className="text-text">{language.name}</span> —{" "}
                    {language.level}
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          <Block label="Community">
            <ul className="space-y-1.5" role="list">
              {resume.community.map((item) => (
                <li
                  key={item}
                  className="relative pl-4 text-[0.875rem] leading-relaxed text-muted before:absolute before:top-[0.6em] before:left-0 before:size-1 before:rounded-full before:bg-faint"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Block>
        </div>

        {/* Print-only footer so a printed copy still points home. */}
        <p className="mt-10 hidden text-[0.75rem] text-faint print:block">
          {site.url} · {site.email}
        </p>
      </main>
    </>
  );
}
