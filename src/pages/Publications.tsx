import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { stagger } from "@/constants/motion";
import { allPublications, profile, stats } from "@/data/site";

const domains = ["All", "Cloud Computing", "WSN", "Machine Learning", "Time Series", "HR", "ERP Systems", "Pharmaceutical Sciences", "Other"];
const max = 132;

const Publications = () => {
  const [domain, setDomain] = useState("All");
  const [sort, setSort] = useState<"recent" | "cited">("recent");
  const list = useMemo(() => {
    let l = [...allPublications];
    if (domain !== "All") l = l.filter(p => p.domain === domain);
    l.sort((a, b) => sort === "recent" ? b.year - a.year : (b.citations ?? 0) - (a.citations ?? 0));
    return l;
  }, [domain, sort]);

  return (
    <section className="container-site py-16">
      <div className="eyebrow">PUBLICATIONS</div>
      <h1 className="mt-3 text-4xl md:text-6xl font-bold">All {stats.publications} research articles, 2007 — 2026.</h1>

      <div className="mt-8 flex flex-wrap gap-2">
        {domains.map(d => (
          <button key={d} onClick={() => setDomain(d)} className={`px-3 py-1.5 rounded-full text-xs font-mono-num uppercase tracking-wider transition-colors ${domain === d ? "bg-blue-deep text-white" : "bg-surface text-text-muted hover:bg-surface-2"}`}>{d}</button>
        ))}
        <div className="ml-auto flex gap-2">
          <button onClick={() => setSort("recent")} className={`px-3 py-1.5 rounded-full text-xs font-mono-num uppercase ${sort === "recent" ? "bg-blue-deep text-white" : "bg-surface text-text-muted"}`}>Most recent</button>
          <button onClick={() => setSort("cited")} className={`px-3 py-1.5 rounded-full text-xs font-mono-num uppercase ${sort === "cited" ? "bg-blue-deep text-white" : "bg-surface text-text-muted"}`}>Most cited</button>
        </div>
      </div>

      <ol className="mt-8 divide-y divide-hairline border-y border-hairline">
        {list.map((p, i) => (
          <motion.li key={i} {...stagger(Math.min(i, 10))} className="grid grid-cols-12 gap-3 py-4 items-center">
            <div className="col-span-2 md:col-span-1 font-mono-num text-text-faint">{p.year}</div>
            <div className="hidden md:block md:col-span-2"><div className="h-1 bg-surface rounded overflow-hidden"><div className="h-full bg-blue" style={{ width: `${((p.citations ?? 0) / max) * 100}%` }} /></div></div>
            <div className="col-span-10 md:col-span-7">
              <div className="font-semibold text-text text-sm md:text-base">{p.title}</div>
              <div className="text-xs italic text-text-muted">{p.venue}</div>
            </div>
            <div className="col-span-12 md:col-span-2 md:text-right font-mono-num text-sm text-blue-deep font-semibold">{p.citations ?? "—"}</div>
          </motion.li>
        ))}
      </ol>
      <div className="text-xs text-text-faint mt-4 font-mono-num">Showing {list.length} of {allPublications.length}</div>

      <div className="mt-10 flex flex-wrap gap-3">
        <a href={profile.scholar} target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-blue-deep text-white rounded-lg hover:bg-blue">View Google Scholar →</a>
        <a href={profile.researchgate} target="_blank" rel="noopener noreferrer" className="px-5 py-3 bg-blue-deep text-white rounded-lg hover:bg-blue">View ResearchGate →</a>
        <a href="/Sunil_Kumar_Dhal.pdf" target="_blank" rel="noopener noreferrer" className="px-5 py-3 border border-blue-deep text-blue-deep rounded-lg hover:bg-blue-tint">Download publication list (PDF) →</a>
      </div>
    </section>
  );
};

export default Publications;
