import { motion } from "framer-motion";
import { fadeUp } from "@/constants/motion";
import { TimelineTextBlock } from "@/components/sections/TimelinePanel";

const stats = [
  { n: 1971, l: "BORN" },
  { n: 1992, l: "FIRST DEGREE" },
  { n: 2014, l: "PHD AWARDED" },
  { n: 28, l: "YEARS TEACHING", suffix: "+" },
];

const About = () => (
  <>
    <section className="container-site pt-16">
      <motion.div {...fadeUp} className="eyebrow">
        BIOGRAPHY
      </motion.div>
      <motion.h1 {...fadeUp} className="mt-3 text-4xl md:text-6xl font-bold leading-tight">
        From Kendrapara to Cuttack — a quiet arc through computation and management.
      </motion.h1>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <motion.div key={s.l} {...fadeUp} className="card-hairline bg-surface p-6">
            <div className="font-mono-num text-3xl text-blue-deep font-bold">
              {s.n}
              {s.suffix ?? ""}
            </div>
            <div className="mt-2 eyebrow">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
    <div className="container-site">
      <TimelineTextBlock imageSide="left" marker="1971-1996" eyebrow="ORIGINS" heading="From Kendrapara to Cuttack.">
        <p>
          Born in July 1971 and educated at Kendrapara College in Odisha, Sunil Kumar Dhal earned his +3 Science with
          Mathematics in 1992 with 75 percent. He went next to Visva-Bharati University in Santiniketan — the
          institution Tagore founded — for a Post-Graduate Diploma in Computer Science, completing it with distinction
          in 1996. The dual training, in mathematics and in computation, set the shape of everything that followed.
        </p>
      </TimelineTextBlock>
      <TimelineTextBlock
        imageSide="right"
        marker="1998-2001"
        eyebrow="FOUNDATIONS"
        heading="Mathematics first, then computation."
      >
        <p>
          An M.Sc. in Mathematics from Utkal University followed in 1998. Then an M.Tech in Computer Science from the
          same university in 2001, with 80 percent and a distinction. The order matters. A computer scientist trained in
          mathematics first frames problems as optimization and inference rather than as code. That habit threads
          through the next twenty-five years of his work.
        </p>
      </TimelineTextBlock>
      <TimelineTextBlock
        imageSide="left"
        marker="2014"
        eyebrow="DOCTORATE"
        heading="A computational model for portfolio risk."
      >
        <p>
          The PhD was awarded in 2014 under Dr. Manojranjan Nayak at Utkal University. Thesis title: Design of
          computation model on value at risk of portfolios. In plain language, he built a mathematical model that
          estimates the worst plausible loss on a portfolio using particle-filter techniques. It is the seed of his
          lifelong interest in the place where computation meets finance.
        </p>
      </TimelineTextBlock>
      <TimelineTextBlock
        imageSide="right"
        marker="1997-PRESENT"
        eyebrow="TEACHING"
        heading="Twenty-eight years in front of a class."
      >
        <p>
          The teaching career began in 1997 at Kalinga Computer Academy, Bhubaneswar. Then College of Engineering
          Bhubaneswar from 1999, Regional College of Management from 2004, progressively senior roles at five
          institutions, and a return to Sri Sri University as Professor in 2014. Subjects taught span the breadth:
          Artificial Intelligence and Machine Learning, Business Analytics, Decision Science, Research Methodology,
          Multivariate Analysis, Predictive Analysis, Programming in C and C++, Python, Data Structures, Management
          Information Systems, Enterprise Resource Planning, and Software Project Management.
        </p>
      </TimelineTextBlock>
      <TimelineTextBlock
        imageSide="left"
        marker="2024-PRESENT"
        eyebrow="TODAY"
        heading="Program Head, MBA — Sri Sri University."
      >
        <p>
          Currently leading the MBA program at Sri Sri University since 2024. Previously Director of the Research
          Development Cell from 2022 to 2024, and Director of the Academic Quality Assurance Cell from 2014 to 2016.
          Continues to publish, supervise doctorates, and consult. His Google Scholar profile shows 517 citations and an
          h-index of 11.
        </p>
      </TimelineTextBlock>
    </div>
    <div className="container-site pb-20">
      <a
        href="/documents/sunil-kumar-dhal-cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-deep hover:underline"
      >
        Download full CV (PDF) →
      </a>
    </div>
  </>
);

export default About;
