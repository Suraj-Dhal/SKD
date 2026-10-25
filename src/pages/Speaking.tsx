import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { geoMercator, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";
import world from "world-atlas/countries-50m.json";
import indiaStates from "@/assets/india-states-official.json";
import { fadeUp } from "@/constants/motion";

type SpeakingLocation = {
  name: string;
  region: string;
  country: "India" | "Nepal";
  lat: number;
  lng: number;
  category: "training" | "visiting" | "conference";
  detail: string;
  labelDx?: number;
  labelDy?: number;
};

const locations: SpeakingLocation[] = [
  {
    name: "Bhubaneswar",
    region: "Odisha",
    country: "India",
    lat: 20.2961,
    lng: 85.8245,
    category: "training",
    detail: "Government, postal, NCTE, OCAC, and UGC training sessions.",
    labelDx: 18,
    labelDy: -72,
  },
  {
    name: "Cuttack",
    region: "Odisha",
    country: "India",
    lat: 20.4625,
    lng: 85.883,
    category: "visiting",
    detail: "Sri Sri University and regional academic leadership roles.",
    labelDx: 34,
    labelDy: -32,
  },
  {
    name: "Talcher",
    region: "Odisha",
    country: "India",
    lat: 20.95,
    lng: 85.23,
    category: "training",
    detail: "Management information processes and quantitative techniques at TTPS Talcher.",
    labelDx: -246,
    labelDy: -52,
  },
  {
    name: "Kaniha",
    region: "Odisha",
    country: "India",
    lat: 21.1,
    lng: 85.1,
    category: "training",
    detail: "Junior and senior management training at NTPC Kaniha.",
    labelDx: -236,
    labelDy: 2,
  },
  {
    name: "Sambalpur",
    region: "Odisha",
    country: "India",
    lat: 21.4669,
    lng: 83.9812,
    category: "training",
    detail: "Mid-Day Meal program assessment and education quality field work.",
    labelDx: -252,
    labelDy: -92,
  },
  {
    name: "Dhenkanal",
    region: "Odisha",
    country: "India",
    lat: 20.6574,
    lng: 85.5969,
    category: "training",
    detail: "NCTE master training for B.Ed principals and headmasters.",
    labelDx: 34,
    labelDy: 18,
  },
  {
    name: "Ghaziabad",
    region: "Uttar Pradesh",
    country: "India",
    lat: 28.6692,
    lng: 77.4538,
    category: "training",
    detail: "IMT Ghaziabad-organized management training programs.",
    labelDx: 16,
    labelDy: -60,
  },
  {
    name: "Kharagpur",
    region: "West Bengal",
    country: "India",
    lat: 22.346,
    lng: 87.232,
    category: "conference",
    detail: "Technical sessions and academic conference participation.",
    labelDx: 22,
    labelDy: -40,
  },
  {
    name: "Kathmandu",
    region: "Bagmati",
    country: "Nepal",
    lat: 27.7172,
    lng: 85.324,
    category: "visiting",
    detail: "Nepal Institute of Engineering and Technology and Kothak Engineering College.",
    labelDx: 18,
    labelDy: -58,
  },
  {
    name: "Srikakulam",
    region: "Andhra Pradesh",
    country: "India",
    lat: 18.2949,
    lng: 83.8938,
    category: "conference",
    detail: "Keynote speaker at Big Data and Hadoop conference, GMRIT.",
    labelDx: 20,
    labelDy: -40,
  },
  {
    name: "Visakhapatnam",
    region: "Andhra Pradesh",
    country: "India",
    lat: 17.6868,
    lng: 83.2185,
    category: "conference",
    detail: "Conference and academic speaking corridor in coastal Andhra Pradesh.",
    labelDx: 24,
    labelDy: 12,
  },
];

const categoryStyles = {
  training: { label: "Training", fill: "hsl(var(--blue-deep))", glow: "rgba(30, 64, 175, 0.32)" },
  visiting: { label: "Visiting Faculty", fill: "hsl(var(--gold))", glow: "rgba(174, 137, 51, 0.34)" },
  conference: { label: "Conference / Keynote", fill: "hsl(var(--blue-bright))", glow: "rgba(37, 99, 235, 0.3)" },
};

const contextCountries = new Set(["India", "Nepal", "Bangladesh", "Bhutan", "Pakistan", "Sri Lanka", "Myanmar"]);

const kashmirDottedLineCover: Array<[number, number]> = [
  [74.45, 35.08],
  [74.68, 34.73],
  [74.95, 34.36],
  [75.18, 34.03],
  [75.39, 33.66],
  [75.59, 33.28],
  [75.78, 32.9],
  [75.95, 32.58],
];

const jammuKashmirUtLineCover: Array<[number, number]> = [
  [75.3, 35.82],
  [75.58, 35.55],
  [75.96, 35.32],
  [76.36, 35.12],
  [76.82, 34.92],
  [77.26, 34.68],
  [77.66, 34.38],
  [78.08, 34.08],
  [78.48, 33.82],
];

const remainingKashmirLineCover: Array<[number, number]> = [
  [74.82, 34.62],
  [75.18, 34.45],
  [75.58, 34.4],
  [75.98, 34.54],
  [76.34, 34.74],
];

type WorldTopology = Topology<{ countries: GeometryCollection<{ name: string }> }>;
type IndiaStatesTopology = Topology<{ data: GeometryCollection<{ NAME_1: string }> }>;

const worldTopology = world as unknown as WorldTopology;
const indiaTopology = indiaStates as unknown as IndiaStatesTopology;

const SpeakingMap = () => {
  const [active, setActive] = useState<string | null>("Bhubaneswar");
  const width = 980;
  const height = 680;

  const { countryPaths, statePaths, internalBoundaryPath, indiaOutlinePath, guidePaths, markerPoints } = useMemo(() => {
    const countries = feature(worldTopology, worldTopology.objects.countries);
    const india = feature(indiaTopology, indiaTopology.objects.data);
    const indiaInternalBoundaries = mesh(indiaTopology, indiaTopology.objects.data, (a, b) => a !== b);
    const indiaExteriorBoundary = mesh(indiaTopology, indiaTopology.objects.data, (a, b) => a === b);
    const subcontinentFeatures = countries.features.filter((d) => contextCountries.has(d.properties.name));
    const focusFeatureCollection: FeatureCollection<Geometry> = {
      type: "FeatureCollection",
      features: [...subcontinentFeatures.filter((d) => d.properties.name !== "India"), ...india.features],
    };
    const projection = geoMercator().fitExtent(
      [
        [64, 54],
        [916, 620],
      ],
      focusFeatureCollection,
    );
    const path = geoPath(projection);
    const pointsToPath = (points: Array<[number, number]>) =>
      points
        .map(([lng, lat], index) => {
          const projected = projection([lng, lat]);
          if (!projected) return "";
          const [x, y] = projected;
          return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
        })
        .join(" ");

    return {
      countryPaths: subcontinentFeatures.map((country) => ({
        name: country.properties.name,
        d: path(country) ?? "",
      })),
      statePaths: india.features.map((state) => ({
        name: state.properties.NAME_1,
        d: path(state) ?? "",
      })),
      internalBoundaryPath: path(indiaInternalBoundaries) ?? "",
      indiaOutlinePath: path(indiaExteriorBoundary) ?? "",
      guidePaths: {
        kashmirCover: pointsToPath(kashmirDottedLineCover),
        jammuKashmirUtCover: pointsToPath(jammuKashmirUtLineCover),
        remainingKashmirCover: pointsToPath(remainingKashmirLineCover),
      },
      markerPoints: locations.map((location) => {
        const [x, y] = projection([location.lng, location.lat]) ?? [0, 0];
        return { ...location, x, y };
      }),
    };
  }, []);

  return (
    <motion.div {...fadeUp} className="mt-10 card-hairline bg-surface overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-hairline bg-card px-5 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="eyebrow">INDIAN SUBCONTINENT</div>
          <p className="mt-2 text-sm text-text-muted">
            Talks, training programs, and visiting faculty roles across India and Nepal.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {Object.entries(categoryStyles).map(([key, style]) => (
            <div key={key} className="flex items-center gap-2 text-xs text-text-muted">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: style.fill }} />
              {style.label}
            </div>
          ))}
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[640px] w-full max-h-[76vh]"
        role="img"
        aria-label="Indian subcontinent map showing speaking and teaching locations in India and Nepal"
      >
        <defs>
          <filter id="pinGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width={width} height={height} fill="hsl(197 82% 86%)" />
        <rect
          x="1"
          y="1"
          width={width - 2}
          height={height - 2}
          fill="none"
          stroke="hsl(218 18% 26%)"
          strokeWidth="1"
          opacity="0.3"
        />

        {countryPaths.map((country) => {
          if (country.name === "India") return null;
          return (
            <path
              key={country.name}
              d={country.d}
              fill="hsl(0 0% 99%)"
              stroke="hsl(218 18% 28%)"
              strokeWidth="0.9"
              opacity="1"
            />
          );
        })}

        {statePaths.map((state) => (
          <path key={`${state.name}-fill`} d={state.d} fill="hsl(56 92% 94%)" fillRule="evenodd" stroke="none" />
        ))}

        <path
          d={internalBoundaryPath}
          fill="none"
          stroke="hsl(0 0% 26%)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="0.72"
          strokeDasharray="2.4 2.4"
          opacity="0.76"
        />

        <path
          d={indiaOutlinePath}
          fill="none"
          stroke="hsl(0 0% 18%)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.15"
          opacity="0.9"
        />

        <path
          d={guidePaths.kashmirCover}
          fill="none"
          stroke="hsl(56 92% 94%)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="7"
          opacity="1"
        />
        <path
          d={guidePaths.jammuKashmirUtCover}
          fill="none"
          stroke="hsl(56 92% 94%)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="7"
          opacity="1"
        />
        <path
          d={guidePaths.remainingKashmirCover}
          fill="none"
          stroke="hsl(56 92% 94%)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="7"
          opacity="1"
        />

        <path
          d={indiaOutlinePath}
          fill="none"
          stroke="hsl(0 0% 18%)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.15"
          opacity="0.9"
        />

        {markerPoints.map((point, index) => {
          const isActive = active === point.name;
          const style = categoryStyles[point.category];
          const popupX = point.x + (point.labelDx ?? 18);
          const popupY = point.y + (point.labelDy ?? -54);
          return (
            <g
              key={point.name}
              className="cursor-pointer outline-none"
              tabIndex={0}
              role="button"
              aria-label={`${point.name}, ${point.region}, ${point.country}: ${point.detail}`}
              onMouseEnter={() => setActive(point.name)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(point.name)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(isActive ? null : point.name)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActive(isActive ? null : point.name);
                }
              }}
            >
              <circle cx={point.x} cy={point.y} r="12" fill={style.fill} opacity="0.14">
                <animate
                  attributeName="r"
                  values="12;22;12"
                  dur="2.8s"
                  repeatCount="indefinite"
                  begin={`${index * 0.18}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0.22;0.04;0.22"
                  dur="2.8s"
                  repeatCount="indefinite"
                  begin={`${index * 0.18}s`}
                />
              </circle>
              <circle cx={point.x} cy={point.y} r="8.5" fill={style.fill} filter="url(#pinGlow)" />
              <circle cx={point.x} cy={point.y} r="4" fill="white" opacity="0.94" />
              <circle cx={point.x} cy={point.y} r="8.5" fill="none" stroke="white" strokeWidth="1.5" opacity="0.9" />

              <g
                className={`transition-opacity duration-150 ${isActive ? "opacity-100" : "opacity-0"}`}
                pointerEvents="none"
              >
                <path
                  d={`M${point.x} ${point.y - 1} L${popupX + 12} ${popupY + 56}`}
                  stroke={style.fill}
                  strokeWidth="1"
                  opacity="0.5"
                />
                <rect
                  x={popupX}
                  y={popupY}
                  width="224"
                  height="86"
                  rx="8"
                  fill="hsl(var(--card))"
                  stroke={style.fill}
                  strokeWidth="1"
                  filter="url(#pinGlow)"
                />
                <text
                  x={popupX + 12}
                  y={popupY + 22}
                  fontFamily="Manrope, sans-serif"
                  fontSize="15"
                  fontWeight="700"
                  fill="hsl(var(--text))"
                >
                  {point.name}
                </text>
                <text
                  x={popupX + 12}
                  y={popupY + 39}
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="10"
                  fill="hsl(var(--text-faint))"
                >
                  {point.region}, {point.country} · {categoryStyles[point.category].label}
                </text>
                <foreignObject x={popupX + 12} y={popupY + 47} width="200" height="34">
                  <p className="m-0 text-[11px] leading-snug text-text-muted">{point.detail}</p>
                </foreignObject>
              </g>
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
};

type DataRow = Record<string, string>;

type DataColumn = {
  key: string;
  label: string;
  className?: string;
};

const trainingPrograms: DataRow[] = [
  { period: "2026", program: "Six-day training program for startups", audience: "IIT Bhubaneswar" },
  {
    period: "2024",
    program: "Six-day program on Data-Driven Decision-Making",
    audience: "Government of Odisha MSME startups",
  },
  {
    period: "2008",
    program: "Training on E-commerce",
    audience: "Junior and senior staff, Indian Postal Department, Bhubaneswar",
  },
  {
    period: "2004-2007",
    program: "Management Information Processes, Optimization, and Quantitative Techniques",
    audience: "Junior and senior management, NTPC Kaniha and TTPS Talcher; organized by IMT Ghaziabad",
  },
  {
    period: "Not specified",
    program: "Computer Awareness Program",
    audience: "Telecommunication Department, Bhubaneswar; organized by SOFTCON",
  },
  {
    period: "Not specified",
    program: "Master Trainer Program",
    audience:
      "National Council for Teacher Education, training B.Ed college principals and headmasters across Bhubaneswar and Dhenkanal",
  },
  {
    period: "Not specified",
    program: "Project Implementation, Monitoring, and Evaluation",
    audience: "Senior and middle-level officers at OCAC, Bhubaneswar",
  },
];

const ugcCourses: DataRow[] = [
  {
    period: "December 2005",
    role: "Resource Person",
    theme: "IT Literacy, Social Science, Social Policy, and Development of Weaker Sections",
    institution: "NISWASS, Bhubaneswar",
  },
  {
    period: "February-March 2014",
    role: "Resource Person",
    theme: "Teaching and Learning Challenges of the 21st Century",
    institution: "Utkal University",
  },
];

const visitingFaculty: DataRow[] = [
  { institution: "Utkal University", area: "MBA, MCA, M.Tech", period: "2001-2009, 2014, 2019" },
  { institution: "GMRIT University", area: "Management / Technical Programs", period: "2008-2009" },
  { institution: "Centurion University", area: "Academic Programs", period: "2020-2021" },
  {
    institution: "Nepal Institute of Engineering and Technology",
    area: "Engineering / Management Programs",
    period: "2004-2006, 2012-2014",
  },
  {
    institution: "Kothak Engineering College, Kathmandu",
    area: "Engineering / Management Programs",
    period: "2013-2014",
  },
  {
    institution: "Indian Institute of Tourism Management, Bhubaneswar",
    area: "Tourism and Management",
    period: "2006-2008",
  },
  {
    institution: "Gopabandhu Academy, Government of Odisha",
    area: "Training for OAS and IAS officers",
    period: "2006-2007",
  },
  {
    institution: "Madhusudan Institute of Co-operative Management, Bhubaneswar",
    area: "Management Programs",
    period: "2000-2007",
  },
  {
    institution: "Orissa University of Agriculture and Technology, Bhubaneswar",
    area: "Academic Programs",
    period: "2011-2013, 2015-2018",
  },
];

const keynoteEvents: DataRow[] = [
  { date: "17-18 December 2014", event: "Keynote Speaker, Big Data and Hadoop Conference", venue: "GMRIT, Srikakulam" },
];

const organizedConferences: DataRow[] = [
  { date: "10 June 2006", event: "Financial Engineering and its Implication", venue: "Hotel Presidency" },
];

const engagementHighlights = [
  {
    title: "Training Programs",
    body: "Major training programs conducted for government departments, public sector organizations, academic institutions, and startups.",
  },
  {
    title: "Visiting Faculty Roles",
    body: "Academic assignments across universities, engineering colleges, management institutes, and government training academies in India and Nepal.",
  },
  {
    title: "UGC Refresher Courses",
    body: "Resource person contributions to UGC refresher programs in IT literacy, social sciences, social policy, and teaching-learning practices.",
  },
  {
    title: "Conferences & Technical Sessions",
    body: "Leadership in academic conferences through keynote addresses, technical session chairing, and conference organization.",
  },
];

const conferenceDomains = ["Data Analytics", "Artificial Intelligence", "Computer Science", "Management", "Innovation"];

const DataTable = ({ columns, rows }: { columns: DataColumn[]; rows: DataRow[] }) => (
  <div className="mt-5 overflow-x-auto rounded-md border border-hairline">
    <table className="w-full min-w-[720px] border-collapse bg-card text-left text-sm">
      <thead>
        <tr className="border-b border-hairline bg-surface">
          {columns.map((column) => (
            <th
              key={column.key}
              className={`px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-text-faint ${column.className ?? ""}`}
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={`${row[columns[0].key]}-${index}`} className="border-b border-hairline last:border-b-0">
            {columns.map((column) => (
              <td
                key={column.key}
                className={`px-4 py-4 align-top leading-relaxed text-text-muted ${column.className ?? ""}`}
              >
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const EngagementSection = ({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) => (
  <motion.section {...fadeUp} className="mt-12 card-hairline bg-card p-5 md:p-6">
    <div className="eyebrow">{eyebrow}</div>
    <h2 className="mt-3 text-2xl font-bold text-text md:text-3xl">{title}</h2>
    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-muted md:text-base">{description}</p>
    {children}
  </motion.section>
);

const Speaking = () => (
  <section className="container-site py-16">
    <div className="eyebrow">TRAINING & VISITING ROLES</div>
    <h1 className="mt-3 text-4xl md:text-6xl font-bold">A teaching life, mapped.</h1>

    <SpeakingMap />

    <motion.div {...fadeUp} className="mt-14 max-w-4xl">
      <div className="eyebrow">ACADEMIC ENGAGEMENTS, TRAINING & CAPACITY BUILDING</div>
      <h2 className="mt-3 text-3xl font-bold text-text md:text-4xl">
        A clearer view of the academic engagement timeline.
      </h2>
      <p className="mt-4 leading-relaxed text-text-muted">
        The engagements below are organized by program type, institution, audience, and year so the speaking and
        training record is easier to scan, compare, and verify.
      </p>
    </motion.div>

    <motion.div {...fadeUp} className="mt-8 grid gap-4 md:grid-cols-2">
      {engagementHighlights.map((item) => (
        <div key={item.title} className="border-l-2 border-gold bg-card px-5 py-4">
          <h3 className="text-lg font-semibold text-text">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.body}</p>
        </div>
      ))}
    </motion.div>

    <EngagementSection
      eyebrow="TRAINING PROGRAMS & CAPACITY BUILDING"
      title="Government, Public Sector & Institutional Training"
      description="Structured training and capacity-building programs for startups, government departments, public sector teams, and academic institutions."
    >
      <DataTable
        columns={[
          { key: "period", label: "Year / Period", className: "w-[150px] font-mono-num text-text" },
          { key: "program", label: "Program / Topic", className: "w-[320px] text-text" },
          { key: "audience", label: "Organization / Audience" },
        ]}
        rows={trainingPrograms}
      />
    </EngagementSection>

    <EngagementSection
      eyebrow="UGC REFRESHER COURSES"
      title="Resource Person Contributions"
      description="UGC refresher course contributions focused on IT literacy, social policy, development themes, and teaching-learning practices."
    >
      <DataTable
        columns={[
          { key: "period", label: "Year / Period", className: "w-[190px] font-mono-num text-text" },
          { key: "role", label: "Role", className: "w-[160px] text-text" },
          { key: "theme", label: "Course / Theme" },
          { key: "institution", label: "Institution", className: "w-[210px]" },
        ]}
        rows={ugcCourses}
      />
    </EngagementSection>

    <EngagementSection
      eyebrow="VISITING FACULTY ENGAGEMENTS"
      title="Universities, Institutes & Training Academies"
      description="Visiting faculty assignments across management, technology, tourism, agriculture, engineering, and government training institutions in India and Nepal."
    >
      <DataTable
        columns={[
          { key: "institution", label: "Institution", className: "w-[360px] text-text" },
          { key: "area", label: "Departments / Area", className: "w-[270px]" },
          { key: "period", label: "Period", className: "w-[210px] font-mono-num text-text" },
        ]}
        rows={visitingFaculty}
      />
    </EngagementSection>

    <EngagementSection
      eyebrow="CONFERENCES, TECHNICAL SESSIONS & KEYNOTES"
      title="Conference Leadership"
      description="Leadership in academic conferences through keynote addresses, technical session chairing, and conference organization across Computer Science, Management, Analytics, AI, and Innovation."
    >
      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-md border border-hairline bg-surface p-5">
          <div className="font-mono-num text-4xl font-bold text-blue-deep">20+</div>
          <p className="mt-2 font-semibold text-text">Technical sessions chaired</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {conferenceDomains.map((domain) => (
              <span
                key={domain}
                className="rounded-full border border-hairline bg-card px-3 py-1 text-xs text-text-muted"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <h3 className="text-lg font-semibold text-text">Keynote Address</h3>
            <DataTable
              columns={[
                { key: "date", label: "Date", className: "w-[210px] font-mono-num text-text" },
                { key: "event", label: "Event", className: "text-text" },
                { key: "venue", label: "Institution / Venue", className: "w-[190px]" },
              ]}
              rows={keynoteEvents}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text">Conferences Organized</h3>
            <DataTable
              columns={[
                { key: "date", label: "Date", className: "w-[180px] font-mono-num text-text" },
                { key: "event", label: "Conference", className: "text-text" },
                { key: "venue", label: "Venue", className: "w-[180px]" },
              ]}
              rows={organizedConferences}
            />
          </div>
        </div>
      </div>
    </EngagementSection>
  </section>
);

export default Speaking;
