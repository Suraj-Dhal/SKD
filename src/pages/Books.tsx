import { useState } from "react";
import { motion } from "framer-motion";
import { stagger } from "@/constants/motion";
import { books } from "@/data/site";

const filters = ["All", "Authored", "Edited", "Government Publication"];

const Books = () => {
  const [f, setF] = useState("All");
  const list = f === "All" ? books : books.filter((b) => b.type === f);
  return (
    <section className="container-site py-16">
      <div className="eyebrow">BOOKS & PATENT</div>
      <h1 className="mt-3 text-4xl md:text-6xl font-bold">Nine books across two decades.</h1>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((x) => (
          <button
            key={x}
            onClick={() => setF(x)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono-num uppercase ${f === x ? "bg-blue-deep text-white" : "bg-surface text-text-muted"}`}
          >
            {x}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((b, i) => (
          <motion.div
            key={b.title}
            {...stagger(i)}
            className="relative aspect-[3/4] rounded-xl bg-blue-deep p-6 hover-lift overflow-hidden group cursor-default"
          >
            <span className="absolute top-4 right-4 font-mono-num text-xs text-white/60">{b.year}</span>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-white font-semibold leading-tight text-lg">{b.title}</div>
              <div className="mt-2 text-white/60 italic text-sm">{b.publisher}</div>
              <div className="mt-3 text-[10px] font-mono-num uppercase tracking-wider text-blue-tint">{b.type}</div>
              <div className="mt-3 h-px bg-blue-bright/0 group-hover:bg-blue-bright transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 card-hairline bg-surface p-8 md:p-12">
        <div className="eyebrow">PATENT</div>
        <h3 className="mt-3 text-2xl md:text-3xl font-semibold">
          Biometric Attendance Device with Touch-Free Body Temperature Screening.
        </h3>
        <p className="mt-4 text-text-muted leading-relaxed max-w-3xl">
          Filed May 2022 with co-inventors Anand Nayyar, Soumya Ranjan Nayak, and Saraju Prasad. A biometric attendance
          system integrating touch-free body temperature screening — designed in response to safety needs that emerged
          during the COVID-19 era.
        </p>
        <a
          href="https://www.researchgate.net/profile/Sunil-Dhal"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-blue-deep hover:underline"
        >
          View patent on ResearchGate →
        </a>
      </div>
    </section>
  );
};

export default Books;
