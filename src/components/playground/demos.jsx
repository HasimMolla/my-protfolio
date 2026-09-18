"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Choice, DemoFrame, Slider } from "@/components/playground/demo-frame";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------- components */

export function ButtonDemo() {
  const [variant, setVariant] = useState("solid");
  const [size, setSize] = useState("md");
  const [loading, setLoading] = useState(false);

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-[0.8125rem]",
    lg: "px-5 py-2.5 text-sm",
  };
  const variants = {
    solid: "bg-text text-bg hover:opacity-85",
    outline: "border border-line text-muted hover:border-line-strong hover:bg-bg-subtle hover:text-text",
    ghost: "text-muted hover:bg-bg-subtle hover:text-text",
  };

  return (
    <DemoFrame
      title="Button"
      note="Three variants, three sizes, and a loading state that keeps its width so the layout doesn't jump."
      code={`<Button variant="${variant}" size="${size}"${loading ? " loading" : ""}>\n  Get started\n</Button>`}
      controls={
        <>
          <Choice
            label="Variant"
            value={variant}
            onChange={setVariant}
            options={[
              { value: "solid", label: "Solid" },
              { value: "outline", label: "Outline" },
              { value: "ghost", label: "Ghost" },
            ]}
          />
          <Choice
            label="Size"
            value={size}
            onChange={setSize}
            options={[
              { value: "sm", label: "S" },
              { value: "md", label: "M" },
              { value: "lg", label: "L" },
            ]}
          />
          <Choice
            label="State"
            value={loading ? "loading" : "idle"}
            onChange={(v) => setLoading(v === "loading")}
            options={[
              { value: "idle", label: "Idle" },
              { value: "loading", label: "Loading" },
            ]}
          />
        </>
      }
    >
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-2 rounded-full font-medium transition-all",
          sizes[size],
          variants[variant],
        )}
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : null}
        Get started
        {!loading ? <ArrowUpRight size={14} /> : null}
      </button>
    </DemoFrame>
  );
}

export function TabsDemo() {
  const [active, setActive] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview", body: "A shared layoutId slides the indicator between tabs instead of cross-fading it." },
    { id: "activity", label: "Activity", body: "Each panel animates in on its own, so switching never shows an empty box." },
    { id: "settings", label: "Settings", body: "The whole thing is four elements — no tab library required." },
  ];

  return (
    <DemoFrame
      title="Tabs"
      note="The indicator is a single element shared between triggers, animated with a layout transition."
      code={`<Tabs defaultValue="overview">\n  <TabsList>\n    <TabsTrigger value="overview">Overview</TabsTrigger>\n  </TabsList>\n  <TabsContent value="overview">…</TabsContent>\n</Tabs>`}
    >
      <div className="w-full max-w-sm">
        <div role="tablist" className="flex items-center gap-1 rounded-full border border-line bg-surface p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active === tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative flex-1 rounded-full px-3 py-1.5 text-xs transition-colors",
                active === tab.id ? "text-bg" : "text-muted hover:text-text",
              )}
            >
              {active === tab.id ? (
                <motion.span
                  layoutId="playground-tab"
                  className="absolute inset-0 -z-10 rounded-full bg-text"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-3 min-h-14 text-[0.8125rem] leading-relaxed text-muted">
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
            >
              {tabs.find((tab) => tab.id === active)?.body}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </DemoFrame>
  );
}

/* --------------------------------------------------------------- experiments */

export function SpringDemo() {
  const [stiffness, setStiffness] = useState(260);
  const [damping, setDamping] = useState(20);
  const [toggled, setToggled] = useState(false);
  const reduced = useReducedMotion();

  return (
    <DemoFrame
      title="Spring physics"
      note="Drag the numbers, then tap the square. Low damping overshoots; high stiffness snaps."
      code={`transition={{ type: "spring", stiffness: ${stiffness}, damping: ${damping} }}`}
      controls={
        <>
          <Slider label="Stiffness" value={stiffness} min={40} max={600} step={10} onChange={setStiffness} />
          <Slider label="Damping" value={damping} min={4} max={60} onChange={setDamping} />
        </>
      }
    >
      <button
        type="button"
        onClick={() => setToggled((v) => !v)}
        aria-label="Toggle the animated square"
        className="flex h-20 w-full max-w-xs items-center rounded-xl border border-line bg-surface px-3"
      >
        <motion.span
          animate={reduced ? {} : { x: toggled ? "calc(100% + 9rem)" : 0 }}
          transition={{ type: "spring", stiffness, damping }}
          className="size-10 rounded-lg bg-text"
        />
      </button>
    </DemoFrame>
  );
}

export function StaggerDemo() {
  const [stagger, setStagger] = useState(0.06);
  const [direction, setDirection] = useState("up");
  const [run, setRun] = useState(0);
  const offsets = { up: { y: 14 }, down: { y: -14 }, left: { x: 14 }, right: { x: -14 } };

  return (
    <DemoFrame
      title="Stagger"
      note="The delay between children is what makes a list feel composed instead of dumped on screen."
      code={`variants={{\n  visible: { transition: { staggerChildren: ${stagger} } },\n}}`}
      controls={
        <>
          <Slider
            label="Stagger"
            value={stagger}
            min={0}
            max={0.3}
            step={0.01}
            onChange={setStagger}
            format={(v) => `${v.toFixed(2)}s`}
          />
          <Choice
            label="From"
            value={direction}
            onChange={setDirection}
            options={[
              { value: "up", label: "Up" },
              { value: "down", label: "Down" },
              { value: "left", label: "Left" },
            ]}
          />
          <button
            type="button"
            onClick={() => setRun((n) => n + 1)}
            className="self-end rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:bg-bg-subtle hover:text-text"
          >
            Replay
          </button>
        </>
      }
    >
      <motion.ul
        key={run}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: stagger } } }}
        className="flex w-full max-w-xs flex-col gap-2"
        role="list"
      >
        {["Read the brief", "Sketch the thing", "Ship it", "Fix what broke"].map((item) => (
          <motion.li
            key={item}
            variants={{
              hidden: { opacity: 0, ...offsets[direction] },
              visible: { opacity: 1, x: 0, y: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-lg border border-line bg-surface px-3 py-2 text-[0.8125rem] text-muted"
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </DemoFrame>
  );
}
