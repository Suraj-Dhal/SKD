import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "framer-motion";

interface Props {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  source?: string;
  sourceHref?: string;
  separator?: boolean;
  size?: "default" | "large";
  accent?: React.ReactNode;
}

export const Counter = ({
  value,
  label,
  suffix,
  prefix,
  source,
  sourceHref,
  separator,
  size = "default",
  accent,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [done, setDone] = useState(false);

  return (
    <div ref={ref} className="card-hairline bg-surface p-8 hover-lift">
      <div className="flex items-baseline gap-2">
        <div
          className={`font-mono-num font-bold text-blue-deep leading-none ${size === "large" ? "text-7xl md:text-8xl" : "text-5xl md:text-6xl"}`}
          style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}
          aria-live="polite"
          aria-label={done ? `${value}${suffix ?? ""} ${label}` : undefined}
        >
          {inView ? (
            <CountUp
              start={0}
              end={value}
              duration={1.6}
              separator={separator ? "," : ""}
              prefix={prefix}
              suffix={suffix}
              onEnd={() => setDone(true)}
            />
          ) : (
            "0"
          )}
        </div>
        {accent}
      </div>
      <div className="mt-4 text-[11px] tracking-[0.15em] uppercase text-text-muted font-mono-num">{label}</div>
      {source && sourceHref?.startsWith("/") && (
        <Link
          to={sourceHref}
          className="mt-2 inline-block text-[10px] text-text-faint font-mono-num hover:text-blue-deep hover:underline"
        >
          {source}
        </Link>
      )}
      {source && sourceHref && !sourceHref.startsWith("/") && (
        <a
          href={sourceHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-[10px] text-text-faint font-mono-num hover:text-blue-deep hover:underline"
        >
          {source}
        </a>
      )}
      {source && !sourceHref && <div className="mt-2 text-[10px] text-text-faint font-mono-num">{source}</div>}
    </div>
  );
};
