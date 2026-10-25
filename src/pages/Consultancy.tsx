import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/constants/motion";
import { TimelineTextBlock } from "@/components/sections/TimelinePanel";
import { consultancy } from "@/data/site";

// 2011 -> 0, 2014 -> 36 months
const baseYear = 2011;
const totalMonths = 48;
const startMonth = (s: string) => {
  const m: Record<string, number> = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  const parts = s.split(" ");
  return (parseInt(parts[2]) - baseYear) * 12 + m[parts[1]];
};

const Consultancy = () => (
  <section className="container-site py-16">
    <div className="eyebrow">FIELD RESEARCH</div>
    <h1 className="mt-3 text-4xl md:text-6xl font-bold">Five projects, four years.</h1>

    <motion.div {...fadeUp} className="mt-10 card-hairline bg-card p-6 overflow-hidden">
      <div className="flex justify-between font-mono-num text-xs text-text-faint mb-3">
        {[2011, 2012, 2013, 2014, 2015].map((y) => (
          <span key={y}>{y}</span>
        ))}
      </div>
      <div className="space-y-3">
        {consultancy.map((p, i) => {
          const sm = startMonth(p.start);
          const left = (sm / totalMonths) * 100;
          const width = (p.duration / totalMonths) * 100;
          return (
            <div key={p.num} className="relative h-7 bg-surface rounded">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${width}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                style={{ left: `${left}%` }}
                className="absolute top-0 h-full bg-blue rounded text-white text-[11px] font-mono-num flex items-center px-2 whitespace-nowrap overflow-hidden"
              >
                Project {p.num}
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>

    <p className="mt-10 max-w-3xl text-text-muted leading-relaxed">
      Beyond academia, Dr. Dhal has led five field-research consultancy projects spanning corporate social
      responsibility, rural infrastructure impact, and elementary education quality. Clients include Power Grid
      Corporation of India and the Government of Odisha.
    </p>

    {consultancy.map((p, i) => (
      <TimelineTextBlock
        key={p.num}
        imageSide={i % 2 === 0 ? "left" : "right"}
        marker={`0${p.num}`}
        eyebrow={`PROJECT 0${p.num}`}
        heading={p.title}
        visualTitle={`${p.duration} month field study`}
        visualItems={[
          { year: `0${p.num}`, label: p.title, detail: `Started ${p.start}` },
          { year: `${p.duration}M`, label: "Research duration", detail: "Field assessment and reporting" },
        ]}
      >
        <p>
          <span className="font-mono-num text-text">{p.duration} months</span> · started {p.start}
        </p>
        <p>{p.body}</p>
      </TimelineTextBlock>
    ))}
  </section>
);

export default Consultancy;
