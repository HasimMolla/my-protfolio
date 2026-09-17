import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/**
 * One page section: a tracked-out mono label, a hairline rule that runs to the
 * edge, an optional lead sentence, then the content.
 */
export function Section({ id, label, lead, children, className }) {
  return (
    // Anchor offset comes from `scroll-padding-top` on <html>; adding
    // scroll-margin here too would stack and land sections 192px down.
    <section id={id} className={cn("py-8 sm:py-10", className)}>
      <Reveal>
        <div className="flex items-center gap-4">
          <h2 className="section-label shrink-0">{label}</h2>
          <span aria-hidden="true" className="h-px flex-1 bg-line" />
        </div>
        {lead ? (
          <p className="mt-5 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted">
            {lead}
          </p>
        ) : null}
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}
