import { motion } from "framer-motion";
import { stagger } from "@/constants/motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { scholars, phdsByYear } from "@/data/site";

const Scholars = () => (
  <section className="container-site py-16">
    <div className="eyebrow">DOCTORAL GUIDANCE</div>
    <h1 className="mt-3 text-4xl md:text-6xl font-bold">Twelve scholars, nine years.</h1>

    <div className="mt-10 card-hairline bg-card p-6">
      <h3 className="font-semibold mb-4">PhDs awarded per year</h3>
      <ResponsiveContainer width="100%" height={180} aria-label="Bar chart of PhDs awarded per year">
        <BarChart data={phdsByYear}>
          <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--hairline))" vertical={false} />
          <XAxis
            dataKey="year"
            stroke="hsl(var(--text-faint))"
            tick={{ fontFamily: "JetBrains Mono", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="hsl(var(--text-faint))"
            tick={{ fontFamily: "JetBrains Mono", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Bar dataKey="count" fill="hsl(var(--blue-deep))" radius={[4, 4, 0, 0]} animationDuration={900} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <p className="mt-8 max-w-3xl text-text-muted leading-relaxed">
      Twelve doctoral scholars have completed or submitted theses under Dr. Dhal's guidance. Their work spans cloud
      computing, financial fraud detection, healthcare analytics, ERP systems, and machine learning. Several have moved
      into senior positions in industry — Nilayam Kumar Kamila is now at Capital One; Santosh Kumar Majhi serves as an
      Associate Professor at Guru Ghasidas Vishwavidyalaya, a central university.
    </p>

    <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {scholars.map((s, i) => {
        const initials = s.name
          .split(" ")
          .filter(Boolean)
          .map((w) => w[0])
          .slice(0, 2)
          .join("");
        const awarded = s.status === "Awarded";
        return (
          <motion.div
            key={s.name}
            {...stagger(i)}
            className="card-hairline bg-surface p-6 h-[200px] flex flex-col justify-between hover-lift"
          >
            <div className="font-bold text-blue-deep" style={{ fontSize: 36 }}>
              {initials.toUpperCase()}
            </div>
            <div className="font-semibold text-text">{s.name}</div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-mono-num uppercase tracking-wider px-2 py-1 rounded ${awarded ? "bg-blue-deep text-white" : "bg-blue-tint text-blue-deep"}`}
              >
                {s.status}
              </span>
              <span className="font-mono-num text-xs text-text-muted">{s.year}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default Scholars;
