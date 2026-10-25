import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/constants/motion";
import { topPapers } from "@/data/site";

const max = 132;

export const TopPapersList = ({ count = 5 }: { count?: number }) => (
  <ol className="divide-y divide-hairline border-y border-hairline">
    {topPapers.slice(0, count).map((p, i) => (
      <motion.li key={p.rank} {...stagger(i)} className="grid grid-cols-12 gap-4 py-6">
        <div className="col-span-1 font-mono-num text-3xl text-text-faint">{String(p.rank).padStart(2, "0")}</div>
        <div className="col-span-12 md:col-span-9 -mt-1">
          <h4 className="font-semibold text-text leading-snug">{p.title}</h4>
          <div className="mt-2 h-1 bg-surface rounded overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(p.citations / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.08 }}
              className="h-full bg-blue"
            />
          </div>
          <div className="mt-2 text-sm italic text-text-muted">{p.venue}</div>
          <span className="inline-block mt-3 text-[10px] font-mono-num uppercase tracking-wider px-2 py-1 bg-blue-tint text-blue-deep rounded">
            {p.tag}
          </span>
        </div>
        <div className="col-span-12 md:col-span-2 md:text-right font-mono-num text-text">
          <div>{p.year}</div>
          <div className="text-blue-deep font-semibold">{p.citations} cites</div>
        </div>
      </motion.li>
    ))}
  </ol>
);
