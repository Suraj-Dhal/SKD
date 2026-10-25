import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot, CartesianGrid } from "recharts";
import { citationsByYear, profile } from "@/data/site";

const PartialYearDot = ({ cx, cy }: { cx?: number; cy?: number }) => {
  if (cx == null || cy == null) return null;

  return (
    <g>
      <circle cx={cx} cy={cy} r="12" fill="hsl(var(--blue-deep))" opacity="0.14">
        <animate attributeName="r" values="8;16;8" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.22;0.04;0.22" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r="5" fill="hsl(var(--blue-deep))" stroke="hsl(var(--card))" strokeWidth="2">
        <animate attributeName="opacity" values="1;0.45;1" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </g>
  );
};

export const CitationsChart = ({ height = 320 }: { height?: number }) => (
  <div className="card-hairline bg-card p-6 md:p-8">
    <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
      <h3 className="font-semibold text-lg text-text">Citations per year, 2016–2026</h3>
      <a href={profile.scholar} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono-num text-text-faint uppercase tracking-wider hover:text-blue-deep hover:underline">Source: Google Scholar</a>
    </div>
    <ResponsiveContainer width="100%" height={height} aria-label="Area chart of annual citations from 2016 to 2026 showing growth from 9 to 98 citations">
      <AreaChart data={citationsByYear} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
        <defs>
          <linearGradient id="citGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--blue))" stopOpacity={0.4} />
            <stop offset="100%" stopColor="hsl(var(--blue))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--hairline))" vertical={false} />
        <XAxis dataKey="year" stroke="hsl(var(--text-faint))" tick={{ fontFamily: "JetBrains Mono", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis ticks={[0, 25, 50, 75, 100]} stroke="hsl(var(--text-faint))" tick={{ fontFamily: "JetBrains Mono", fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--hairline))", borderRadius: 8, fontFamily: "JetBrains Mono" }} />
        <Area type="monotone" dataKey="c" stroke="hsl(var(--blue-deep))" strokeWidth={2} fill="url(#citGrad)" isAnimationActive={false} />
        <ReferenceDot x={2026} y={32} shape={<PartialYearDot />} />
      </AreaChart>
    </ResponsiveContainer>
    <div className="mt-3 text-xs text-text-faint italic">2026 is a partial year; the blinking dot marks the current count.</div>
  </div>
);
