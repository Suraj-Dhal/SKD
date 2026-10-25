import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/constants/motion";
import { Counter } from "@/components/sections/Counter";
import { CitationsChart } from "@/components/charts/CitationsChart";
import { PublicationMixChart } from "@/components/charts/PublicationMixChart";
import { DomainsChart } from "@/components/charts/DomainsChart";
import { TopPapersList } from "@/components/sections/TopPapersList";
import { collaborators, profile, stats } from "@/data/site";

const Impact = () => (
  <>
    <section className="container-site pt-16">
      <motion.div {...fadeUp} className="eyebrow">RESEARCH IMPACT</motion.div>
      <motion.h1 {...fadeUp} className="mt-3 text-4xl md:text-6xl font-bold">Twenty years of measured contribution.</motion.h1>
      <motion.p {...fadeUp} className="mt-6 max-w-2xl text-text-muted leading-relaxed">
        Citation totals as of October 2025. Aggregated from Google Scholar and ResearchGate. Both sources are reported here for transparency.
      </motion.p>
    </section>

    <section className="container-site section-y">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Counter value={stats.publications} label="Research Articles" size="large" source="Google Scholar" sourceHref={profile.scholar} />
        <Counter value={stats.proceedings} label="Research Journal / Conference Proceedings" size="large" source="Google Scholar" sourceHref={profile.scholar} />
        <Counter value={stats.booksWritten} label="Books Written" size="large" source="Books" sourceHref="/publications/books" />
        <Counter value={stats.consultancyWork} label="Consultancy Work" size="large" source="LinkedIn" sourceHref={profile.linkedin} />
        <Counter value={stats.scopus} label="Scopus" size="large" source="Scopus Author Profile" sourceHref={profile.scopus} />
        <Counter value={stats.patents} label="Patents" size="large" source="ResearchGate" sourceHref={profile.researchgate} />
        <Counter value={stats.boardAcademicCouncil} label="Board of Study & Academic Council" size="large" source="Sri Sri University" sourceHref={profile.university} />
      </div>
    </section>

    <section className="container-site section-y">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Citation trajectory</h2>
      <CitationsChart height={420} />
      <p className="mt-4 text-text-muted">From 9 citations in 2016 to 98 in 2025 — an eleven-fold increase across a decade.</p>
    </section>

    <section className="container-site section-y">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Publication mix and domains</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <PublicationMixChart />
          <p className="mt-4 text-text-muted text-sm">The mix summarizes research articles, proceedings, books, consultancy work, Scopus-indexed work, patents, and academic council roles in one auditable view.</p>
        </div>
        <div>
          <DomainsChart />
          <p className="mt-4 text-text-muted text-sm">Cloud computing and wireless sensor networks dominate the body of work, with management information systems and machine learning forming a strong second tier.</p>
        </div>
      </div>
    </section>

    <section className="container-site section-y">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Top ten cited papers</h2>
      <TopPapersList count={10} />
    </section>

    <section className="container-site section-y">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Source comparison — Google Scholar vs ResearchGate</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-hairline bg-surface p-8">
          <a href={profile.scholar} target="_blank" rel="noopener noreferrer" className="eyebrow inline-block hover:text-blue-deep hover:underline">Google Scholar</a>
          <ul className="mt-4 space-y-2 font-mono-num">
            <li>{stats.citations} citations</li><li>h-index: {stats.hIndex}</li><li>h-index since 2021: {stats.hIndexSince2021}</li><li>i10-index: {stats.i10Index}</li>
            <li>Citations since 2021: 383</li><li>Yearly graph available</li>
          </ul>
          <a href={profile.scholar} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-blue-deep hover:underline">View profile →</a>
        </div>
        <div className="card-hairline bg-surface p-8">
          <a href={profile.researchgate} target="_blank" rel="noopener noreferrer" className="eyebrow inline-block hover:text-blue-deep hover:underline">ResearchGate</a>
          <ul className="mt-4 space-y-2 font-mono-num">
            <li>302 citations</li><li>{stats.publications} research articles</li><li>10,402 reads</li><li>{stats.patents} patents listed</li>
          </ul>
          <a href={profile.researchgate} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-blue-deep hover:underline">View profile →</a>
        </div>
      </div>
      <p className="mt-6 text-text-muted text-sm max-w-3xl">The two sources differ because they index different sets of venues. Both are reported here so readers can audit the figures. Google Scholar typically captures broader coverage; ResearchGate adds reads and patent data not visible in Scholar.</p>
    </section>

    <section className="container-site section-y">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Co-authors and collaborators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {collaborators.primary.map((c, i) => (
          <motion.div key={c.name} {...stagger(i)} className="card-hairline bg-card p-5 border-l-2 border-l-blue-deep hover-lift">
            <div className="font-semibold text-text">{c.name}</div>
            <div className="mt-2 text-xs text-text-muted">{c.role}</div>
            <div className="mt-3 text-[10px] font-mono-num uppercase tracking-wider text-blue-deep">VERIFIED · GOOGLE SCHOLAR</div>
          </motion.div>
        ))}
        {collaborators.others.map((c, i) => (
          <motion.div key={c} {...stagger(i + 5)} className="card-hairline bg-card p-5 hover-lift">
            <div className="font-semibold text-text text-sm">{c}</div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="container-site section-y">
      <div className="card-hairline bg-surface p-8">
        <div className="eyebrow">PATENT</div>
        <h3 className="mt-3 text-2xl font-semibold">Biometric Attendance Device with Touch-Free Body Temperature Screening.</h3>
        <p className="mt-4 text-text-muted leading-relaxed max-w-3xl">Filed May 2022 with co-inventors Anand Nayyar, Soumya Ranjan Nayak, and Saraju Prasad. A biometric attendance system integrating touch-free body temperature screening — designed in response to safety needs that emerged during the COVID-19 era.</p>
        <a href={profile.researchgate} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block text-blue-deep hover:underline">View patent on ResearchGate →</a>
      </div>
    </section>
  </>
);

export default Impact;
