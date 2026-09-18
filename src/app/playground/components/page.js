import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/data";
import { PageHeader, PageTitle } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import {
  ButtonDemo,
  SpringDemo,
  StaggerDemo,
  TabsDemo,
} from "@/components/playground/demos";

export const metadata = {
  title: "Components",
  description:
    "Live component demos and motion experiments — each one editable in the browser, with its source.",
  alternates: { canonical: "/playground/components" },
  openGraph: {
    title: `Components — ${site.name}`,
    description: "Components and motion experiments you can edit in the browser.",
    url: `${site.url}/playground/components`,
  },
};

export default function ComponentsPage() {
  return (
    <>
      <PageHeader />
      <main className="mx-auto w-full max-w-3xl px-5 pt-10 pb-20 sm:px-8">
        <Link
          href="/playground"
          className="group inline-flex items-center gap-1.5 text-[0.8125rem] text-muted transition-colors hover:text-text"
        >
          <ArrowLeft
            size={13}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Playground
        </Link>

        <div className="mt-5">
          <PageTitle
            title="Components."
            lead="Pieces from the same toolkit as Nirmaan UI, with their props wired to real controls. Change a setting and the preview changes with it."
          />
        </div>

        <Section label="Components">
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal className="h-full">
              <ButtonDemo />
            </Reveal>
            <Reveal delay={0.08} className="h-full">
              <TabsDemo />
            </Reveal>
          </div>
        </Section>

        <Section
          label="Motion"
          lead="The fastest way to understand a spring is to drag its numbers around."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal className="h-full">
              <SpringDemo />
            </Reveal>
            <Reveal delay={0.08} className="h-full">
              <StaggerDemo />
            </Reveal>
          </div>
        </Section>
      </main>
    </>
  );
}
