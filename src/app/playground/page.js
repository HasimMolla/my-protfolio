import { site } from "@/lib/data";
import { PageTitle } from "@/components/ui/page-title";
import { Reveal } from "@/components/ui/reveal";
import {
  ComponentsPreview,
  PlaygroundCard,
  SignaturePreview,
} from "@/components/playground/playground-card";

export const metadata = {
  title: "Playground",
  description:
    "Interactive things — a signature wall you can draw on, and live component demos you can edit in the browser.",
  alternates: { canonical: "/playground" },
  openGraph: {
    title: `Playground — ${site.name}`,
    description: "Things you can actually poke at.",
    url: `${site.url}/playground`,
  },
};

export default function PlaygroundPage() {
  return (
      <main className="mx-auto w-full max-w-3xl px-5 pt-10 pb-20 sm:px-8">
        <PageTitle
          title="Playground"
          lead="small things I build to work something out."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Reveal className="h-full">
            <PlaygroundCard
              href="/wall"
              title="Signature wall"
              description="Draw your own signature with a mouse, finger or stylus. It joins the wall, replayed exactly the way you drew it."
              meta="Interactive"
            >
              <SignaturePreview />
            </PlaygroundCard>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <PlaygroundCard
              href="/playground/components"
              title="Components"
              description="Buttons, tabs and motion experiments with their props wired to real controls. Change a setting, watch the preview change, copy the source."
              meta="Live demos"
            >
              <ComponentsPreview />
            </PlaygroundCard>
          </Reveal>
        </div>
      </main>
  );
}
