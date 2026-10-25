import { motion } from "framer-motion";
import { experience } from "@/data/site";

const maxYears = Math.max(...experience.map((e) => e.years));

const phaseForRange = (range: string) => {
  const start = Number(range.slice(0, 4));
  if (start < 2004) return "Foundation";
  if (start < 2014) return "Institutional Growth";
  return "Sri Sri University Leadership";
};

const detailForRole = (role: string) => {
  if (role.includes("Program Head")) return "Leads MBA program direction, academic coordination, student experience, and management education delivery.";
  if (role.includes("Research Development")) return "Strengthened research systems, faculty research coordination, publication culture, and institutional research processes.";
  if (role === "Professor") return "Continues teaching, doctoral supervision, research publication, consulting, and cross-disciplinary academic leadership.";
  if (role.includes("Faculty of Commerce")) return "Guided faculty-level academic planning, curriculum delivery, departmental coordination, and management studies growth.";
  if (role.includes("Quality Assurance")) return "Directed academic quality processes, documentation, internal review systems, and institutional quality initiatives.";
  if (role.includes("Head")) return "Led department administration, course planning, faculty coordination, and student academic progress.";
  if (role.includes("Associate Dean")) return "Supported MCA academic administration, program coordination, and departmental operations.";
  if (role.includes("Associate Professor")) return "Handled teaching, academic mentoring, department-level responsibilities, and institutional development work.";
  if (role.includes("Asst. Professor")) return "Built early academic foundations through teaching, student mentoring, and computing curriculum delivery.";
  return "Delivered computing education, practical training, and early career academic instruction.";
};

const Experience = () => (
  <section className="container-site py-16">
    <div className="mx-auto max-w-4xl text-center">
      <div className="eyebrow">CAREER CHRONOLOGY</div>
      <h1 className="mt-3 text-4xl font-bold md:text-6xl">Twenty-eight years, fourteen roles.</h1>
      <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-text-muted">
        A chronological view of Dr. Sunil Kumar Dhal's academic appointments, department leadership, quality assurance work, research development roles, and current MBA program leadership.
      </p>
    </div>

    <div className="relative mx-auto mt-16 max-w-7xl">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-hairline md:left-[4.9rem]" />
      <div className="space-y-7">
        {experience.map((e, i) => (
          <motion.article
            key={`${e.range}-${e.role}`}
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: i * 0.035, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid gap-5 pl-12 md:grid-cols-[260px_1fr] md:gap-10 md:pl-28"
          >
            <div className="absolute left-4 top-9 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-card bg-blue-deep shadow-lift md:left-[4.9rem]" />
            <div className="pt-6 md:text-right">
              <div className="font-mono-num text-base font-semibold text-blue-deep">{e.range}</div>
              <div className="mt-2 text-sm text-text-muted">{e.inst}</div>
              <div className="mt-4 inline-flex rounded-full border border-hairline bg-surface px-3 py-1 text-[10px] font-mono-num uppercase tracking-wider text-text-faint">
                {e.years} year{e.years > 1 ? "s" : ""}
              </div>
            </div>
            <div className="card-hairline bg-card p-6 md:p-8 hover-lift">
              <div className="text-[10px] font-mono-num uppercase tracking-wider text-gold">{phaseForRange(e.range)}</div>
              <h2 className="mt-3 text-2xl font-semibold leading-snug text-text md:text-3xl">{e.role}</h2>
              <p className="mt-2 text-lg text-text-muted">{e.inst}</p>
              <p className="mt-5 max-w-4xl leading-relaxed text-text-muted">{detailForRole(e.role)}</p>
              <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-surface">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.max(12, (e.years / maxYears) * 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="h-full rounded-full bg-blue-deep"
                />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>

    <div className="mx-auto mt-20 max-w-4xl text-center">
      <div className="eyebrow">ACADEMIC GOVERNANCE</div>
      <h2 className="mt-3 text-3xl font-semibold text-text">Board, council, and doctoral committee roles.</h2>
    </div>

    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="card-hairline bg-surface p-6">
        <h3 className="text-2xl font-semibold mb-4">Boards of Studies</h3>
        <ul className="space-y-2 text-text-muted">
          <li>Regional College of Management (2004-06, 2010-11)</li>
          <li>Sri Sri University Faculty of Management Studies (2012-present)</li>
          <li>Sri Sri University Faculty of Engineering Technology (2020-present)</li>
          <li>Srusti Business Management (2020-present)</li>
        </ul>
      </div>
      <div className="card-hairline bg-surface p-6">
        <h3 className="text-2xl font-semibold mb-4">Doctoral Research Committees</h3>
        <ul className="space-y-2 text-text-muted">
          <li>Sri Sri University Faculty of Management Studies (2014-present)</li>
          <li>SSU Faculty of Emerging Technology (2024-present)</li>
          <li>SSU Faculty of Engineering and Technology (2020-2024)</li>
          <li>Srusti Business Management for Computer Science (2024-present)</li>
        </ul>
      </div>
    </div>
  </section>
);

export default Experience;
