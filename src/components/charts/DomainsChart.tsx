import { motion } from "framer-motion";
import { profile, researchDomains } from "@/data/site";

const max = Math.max(...researchDomains.map(d => d.v));

export const DomainsChart = () => (
  <div className="card-hairline bg-card p-6 md:p-8">
    <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
      <h3 className="font-semibold text-lg text-text">Research domains, by publication count</h3>
      <a href={profile.researchgate} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono-num text-text-faint uppercase tracking-wider hover:text-blue-deep hover:underline">Source: ResearchGate</a>
    </div>
    <div className="space-y-3" aria-label="Horizontal bar chart of research domains by publication count">
      {researchDomains.map((d, i) => {
        const color = i < 3 ? "hsl(var(--blue-deep))" : i < 6 ? "hsl(var(--blue))" : "hsl(var(--blue-bright))";
        return (
          <div key={d.name} className="flex items-center gap-4">
            <div className="w-56 shrink-0 text-sm text-text-muted">{d.name}</div>
            <div className="flex-1 h-8 bg-surface rounded relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(d.v / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded"
                style={{ background: color }}
              />
            </div>
            <div className="w-8 text-right font-mono-num text-sm text-text">{d.v}</div>
          </div>
        );
      })}
    </div>
  </div>
);
