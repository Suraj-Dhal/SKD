import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Counter } from "@/components/sections/Counter";
import { CitationsChart } from "@/components/charts/CitationsChart";
import { PublicationMixChart } from "@/components/charts/PublicationMixChart";
import { DomainsChart } from "@/components/charts/DomainsChart";
import { TopPapersList } from "@/components/sections/TopPapersList";
import { fadeUp } from "@/constants/motion";
import { profile, stats } from "@/data/site";
import portrait from "@/assets/sunil-portrait.webp";

const Home = () => {
  return (
    <>
      <section className="container-site min-h-[calc(100vh-72px)] py-16">
        <div className="grid md:grid-cols-12 gap-10 w-full items-center">
          <motion.div {...fadeUp} className="md:col-span-7 relative">
            <div className="absolute inset-0 bg-blue-tint rounded-xl" style={{ transform: "translate(16px, 16px)" }} />
            <div className="relative aspect-[4/5] max-w-[480px] rounded-xl overflow-hidden border border-hairline bg-surface">
              <img src={portrait} alt="Dr. Sunil Kumar Dhal, Professor at Sri Sri University" className="w-full h-full object-cover" />
            </div>
          </motion.div>
          <motion.div {...fadeUp} className="md:col-span-5 space-y-6">
            <div className="eyebrow">PROFESSOR · FACULTY OF MANAGEMENT SCIENCE · SRI SRI UNIVERSITY</div>
            <h1 className="font-bold text-text leading-[1.05]" style={{ fontSize: "clamp(40px, 6vw, 64px)" }}>
              Dr. Sunil Kumar Dhal
            </h1>
            <p className="font-serif italic text-text-muted text-[28px] leading-tight">
              Twenty-eight years bridging computation and commerce.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/work/impact" className="inline-flex items-center gap-2 px-5 py-3 bg-blue-deep text-white rounded-lg hover:bg-blue transition-colors">
                View Research Impact <ArrowRight size={16} />
              </Link>
              <Link to="/about/overview" className="inline-flex items-center gap-2 px-5 py-3 text-blue-deep hover:underline">
                Read full biography <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="md:col-span-12 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Counter value={stats.publications} label="Research Articles" source="Google Scholar" sourceHref={profile.scholar} />
              <Counter value={stats.proceedings} label="Research Journal / Conference Proceedings" source="Google Scholar" sourceHref={profile.scholar} />
              <Counter value={stats.booksWritten} label="Books Written" source="Books" sourceHref="/publications/books" />
              <Counter value={stats.consultancyWork} label="Consultancy Work" source="LinkedIn" sourceHref={profile.linkedin} />
              <Counter value={stats.scopus} label="Scopus" source="Scopus Author Profile" sourceHref={profile.scopus} />
              <Counter value={stats.patents} label="Patents" source="ResearchGate" sourceHref={profile.researchgate} />
              <Counter value={stats.boardAcademicCouncil} label="Board of Study & Academic Council" source="Sri Sri University" sourceHref={profile.university} />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-site section-y">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7"><CitationsChart /></div>
          <div className="md:col-span-5"><PublicationMixChart /></div>
          <div className="md:col-span-12"><DomainsChart /></div>
        </div>
      </section>

      <section className="container-site section-y">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-text">Top 5 most-cited papers</h2>
        </div>
        <TopPapersList count={5} />
        <div className="mt-8">
          <Link to="/publications/research" className="text-blue-deep hover:underline inline-flex items-center gap-2">
            See all {stats.publications} research articles <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="container-site section-y text-center max-w-3xl">
        <blockquote className="font-serif italic text-text" style={{ fontSize: "clamp(24px, 3vw, 32px)" }}>
          "Teaching is not transferring information. It is shaping the questions a student is brave enough to ask."
        </blockquote>
        <div className="mt-6 eyebrow">— Dr. Sunil Kumar Dhal</div>
      </section>
    </>
  );
};

export default Home;
