/** Page title block, matching the hero's type scale. */
export function PageTitle({ title, lead }) {
  return (
    <header>
      <h1 className="text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[2.4rem]">
        {title}
      </h1>
      {lead ? (
        <p className="mt-3 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-muted">
          {lead}
        </p>
      ) : null}
    </header>
  );
}
