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
  title: "Playground",
  description:
    "Live component demos and interaction experiments — each one editable in the browser, with its source.",
  alternates: { canonical: "/playground" },
  openGraph: {
    title: `Playground — ${site.name}`,
    description: "Components and interaction experiments you can actually poke at.",
    url: `${site.url}/playground`,
  },
};

export default function PlaygroundPage() {
  return (
    <>
      <PageHeader />
      <main className="mx-auto w-full max-w-3xl px-5 pt-10 pb-20 sm:px-8">
        <PageTitle
          title="Playground."
          lead="Bits I build to work something out. Every demo is live — change the controls and the preview changes with them."
        />

        <Section
          label="Components"
          lead="Pieces from the same toolkit as Nirmaan UI, with their props wired to real controls."
        >
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
          label="Experiments"
          lead="Motion, mostly. The fastest way to understand a spring is to drag its numbers around."
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
