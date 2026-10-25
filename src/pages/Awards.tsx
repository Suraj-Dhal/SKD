import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { fadeUp } from "@/constants/motion";
import { TimelineTextBlock } from "@/components/TimelinePanel";
import { awards } from "@/data/site";

const years = Array.from({ length: 9 }, (_, i) => 2010 + i);
const cluster: Record<number, number> = { 2013: 1, 2014: 2, 2015: 1, 2016: 1 };

const Awards = () => (
  <>
    <section className="container-site pt-16">
      <div className="eyebrow">RECOGNITION</div>
      <h1 className="mt-3 text-4xl md:text-6xl font-bold">Five awards, four years.</h1>
      <div className="mt-10 flex items-center gap-3">
        {years.map(y => (
          <div key={y} className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: cluster[y] || 0 }).map((_, i) => <div key={i} className="w-2.5 h-2.5 rounded-full bg-gold" />)}
              {!cluster[y] && <div className="w-2.5 h-2.5 rounded-full bg-surface-2" />}
            </div>
            <div className="font-mono-num text-xs text-text-faint">{y}</div>
          </div>
        ))}
      </div>
    </section>
    <div className="container-site">
      {awards.map((a, i) => (
        <TimelineTextBlock
          key={a.title}
          imageSide={i % 2 === 0 ? "left" : "right"}
          marker={`${a.year}`}
          eyebrow={`${a.year}`}
          heading={a.title}
          visualTitle="Recognition milestone"
          accent={<Award size={28} className="text-gold" />}
        >
          <p>{a.body}</p>
        </TimelineTextBlock>
      ))}
    </div>
  </>
);

export default Awards;
