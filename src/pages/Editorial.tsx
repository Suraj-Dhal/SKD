import { motion } from "framer-motion";
import { stagger } from "@/constants/motion";
import { journals } from "@/data/site";

const Editorial = () => (
  <section className="container-site py-16">
    <div className="eyebrow">EDITORIAL ROLES</div>
    <h1 className="mt-3 text-4xl md:text-6xl font-bold">Four journals, two continents of indexing.</h1>

    <div className="mt-8 card-hairline bg-surface border-l-4 border-l-blue-deep p-5 max-w-3xl">
      <p className="text-sm text-text-muted">
        Two of these journals are published by IGI Global, an internationally indexed academic publisher with
        peer-reviewed titles in computing and management.
      </p>
    </div>

    <div className="mt-12 space-y-12">
      {journals.map((j, i) => (
        <motion.div key={j.name} {...stagger(i)} className="grid md:grid-cols-12 gap-6 md:gap-10 items-center">
          <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}>
            <div className="aspect-[3/4] rounded-xl border border-hairline bg-surface p-8 flex flex-col justify-between hover-lift">
              <div className="eyebrow">JOURNAL</div>
              <div className="text-blue-deep font-bold text-2xl leading-tight">{j.name}</div>
              <div className="text-text-muted italic text-sm">{j.publisher}</div>
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:[&]:col-start-auto">
            <div className="eyebrow">{`Journal 0${i + 1}`}</div>
            <h2 className="mt-3 text-2xl md:text-3xl font-semibold">{j.name}</h2>
            <dl className="mt-5 grid grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="eyebrow">Publisher</dt>
                <dd className="mt-1 text-text">{j.publisher}</dd>
              </div>
              <div>
                <dt className="eyebrow">ISSN</dt>
                <dd className="mt-1 font-mono-num text-text">{j.issn}</dd>
              </div>
              <div>
                <dt className="eyebrow">Domain</dt>
                <dd className="mt-1 text-text">{j.domain}</dd>
              </div>
            </dl>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Editorial;
