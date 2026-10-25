import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { profile, publicationMix, stats } from "@/data/site";

const COLORS = [
  "hsl(var(--blue-deep))",
  "hsl(217 80% 42%)",
  "hsl(217 85% 50%)",
  "hsl(217 88% 60%)",
  "hsl(198 88% 45%)",
  "hsl(var(--gold))",
  "hsl(214 90% 75%)",
];

export const PublicationMixChart = () => (
  <div className="card-hairline bg-card p-6 md:p-8 h-full">
    <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
      <h3 className="font-semibold text-lg text-text">Publication mix</h3>
      <a href={profile.researchgate} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono-num text-text-faint uppercase tracking-wider hover:text-blue-deep hover:underline">ResearchGate</a>
    </div>
    <div className="grid grid-cols-2 gap-4 items-center">
      <div className="relative [&_svg]:outline-none [&_*]:outline-none">
        <ResponsiveContainer width="100%" height={240} aria-label="Donut chart of publication mix: 53 research articles, 21 research journal or conference proceedings, 9 books written, 5 consultancy works, 38 Scopus items, 10 patents, and 5 board of study and academic council roles">
          <PieChart>
            <Pie
              data={publicationMix}
              dataKey="v"
              nameKey="name"
              innerRadius="66%"
              outerRadius="90%"
              paddingAngle={1}
              animationBegin={120}
              animationDuration={1000}
              animationEasing="ease-out"
              stroke="hsl(var(--card))"
              strokeWidth={2}
              isAnimationActive
              activeShape={false}
            >
              {publicationMix.map((_, i) => <Cell key={i} fill={COLORS[i]} focusable={false} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-[clamp(28px,3.6vw,42px)] leading-none font-bold text-blue-deep">{stats.outputTotal}</div>
          <div className="text-[9px] font-mono-num uppercase tracking-wider text-text-muted mt-1">Outputs</div>
        </div>
      </div>
      <ul className="space-y-2">
        {publicationMix.map((p, i) => (
          <li key={p.name} className="flex items-center justify-between gap-2 text-xs font-mono-num">
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: COLORS[i] }} />{p.name}</span>
            <span className="text-text-muted">{p.v}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
