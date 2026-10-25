import { motion } from "framer-motion";
import { fadeUp } from "@/constants/motion";

export interface TimelineItem {
  year: string;
  label: string;
  detail?: string;
}

const defaultItems: TimelineItem[] = [
  { year: "1992", label: "Mathematics", detail: "+3 Science, Kendrapara College" },
  { year: "2001", label: "Computer science", detail: "M.Tech, Utkal University" },
  { year: "2014", label: "Sri Sri University", detail: "Professor and academic leadership" },
  { year: "2024", label: "MBA program", detail: "Program Head" },
];

interface TimelinePanelProps {
  kicker?: string;
  title?: string;
  items?: TimelineItem[];
  className?: string;
  compact?: boolean;
}

export const TimelinePanel = ({
  kicker = "ACADEMIC ARC",
  title = "Computation and management",
  items = defaultItems,
  className = "",
  compact = false,
}: TimelinePanelProps) => (
  <div
    className={`relative rounded-xl border border-hairline bg-surface overflow-hidden ${compact ? "p-5" : "p-6 md:p-8"} ${className}`}
  >
    <div className="absolute left-0 top-0 h-full w-1 bg-blue-deep" aria-hidden="true" />
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="eyebrow">{kicker}</div>
        <div
          className={`${compact ? "mt-2 text-xl" : "mt-3 text-2xl md:text-3xl"} font-semibold text-text leading-tight`}
        >
          {title}
        </div>
      </div>
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-hairline bg-card font-mono-num text-sm text-blue-deep">
        SKD
      </div>
    </div>

    <ol className={`${compact ? "mt-6 space-y-5" : "mt-9 space-y-6"}`}>
      {items.map((item, index) => (
        <li key={`${item.year}-${item.label}`} className="grid grid-cols-[72px_1fr] gap-4">
          <div className="font-mono-num text-sm font-semibold text-blue-deep">{item.year}</div>
          <div className="relative pb-1 pl-6">
            {index < items.length - 1 && (
              <div className="absolute left-[5px] top-5 h-[calc(100%+20px)] w-px bg-hairline" aria-hidden="true" />
            )}
            <div
              className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-blue-deep bg-surface"
              aria-hidden="true"
            />
            <div className="text-sm font-semibold text-text">{item.label}</div>
            {item.detail && <div className="mt-1 text-sm leading-relaxed text-text-muted">{item.detail}</div>}
          </div>
        </li>
      ))}
    </ol>
  </div>
);

interface TimelineTextBlockProps {
  imageSide?: "left" | "right";
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
  accent?: React.ReactNode;
  marker?: string;
  visualTitle?: string;
  visualItems?: TimelineItem[];
}

export const TimelineTextBlock = ({
  imageSide = "left",
  eyebrow,
  heading,
  children,
  accent,
  marker,
  visualTitle,
  visualItems,
}: TimelineTextBlockProps) => (
  <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center section-y">
    <motion.div {...fadeUp} className={`md:col-span-5 ${imageSide === "right" ? "md:order-2" : ""}`}>
      <TimelinePanel
        compact
        kicker={eyebrow}
        title={visualTitle ?? heading}
        items={visualItems ?? [{ year: marker ?? "NOW", label: heading }]}
      />
    </motion.div>
    <motion.div {...fadeUp} className="md:col-span-6 md:col-start-7 md:[&]:col-start-auto">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-text leading-tight flex items-center gap-3">
        {heading}
        {accent}
      </h2>
      <div className="mt-5 space-y-4 text-text-muted leading-relaxed">{children}</div>
    </motion.div>
  </div>
);
