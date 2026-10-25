import { Link } from "react-router-dom";
import { profile } from "@/data/site";

const footerSections = [
  ["Biography", "/about/overview"],
  ["Experience", "/about/experience"],
  ["Awards", "/about/awards"],
  ["Impact", "/work/impact"],
  ["Consultancy", "/work/consultancy"],
  ["Editorial", "/work/editorial"],
  ["Research Publications", "/publications/research"],
  ["Books", "/publications/books"],
  ["Scholars", "/publications/scholars"],
  ["Speaking", "/speaking"],
  ["Contact", "/contact"],
];

export const Footer = () => (
  <footer className="bg-surface border-t border-hairline mt-24">
    <div className="container-site py-16 grid md:grid-cols-3 gap-10">
      <div>
        <Link to="/" className="font-semibold text-text hover:text-blue-deep">Dr. Sunil Kumar Dhal</Link>
        <div className="mt-2 text-sm text-text-muted font-serif italic">Twenty-eight years bridging computation and commerce.</div>
        <Link to="/contact" className="mt-4 block text-sm text-text-muted leading-relaxed hover:text-blue-deep">
          Faculty of Management Studies, Sri Sri University<br />
          Godisahi, Cuttack, Odisha, India
        </Link>
      </div>
      <div>
        <div className="eyebrow mb-3">Sections</div>
        <ul className="space-y-2 text-sm">
          {footerSections.map(([l, to]) => (
            <li key={to}><Link to={to} className="text-text-muted hover:text-blue-deep">{l}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <div className="eyebrow mb-3">Scholarly profiles</div>
        <ul className="space-y-2 text-sm">
          <li><a href={profile.scholar} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-blue-deep">Google Scholar →</a></li>
          <li><a href={profile.scopus} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-blue-deep">Scopus →</a></li>
          <li><a href={profile.researchgate} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-blue-deep">ResearchGate →</a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-blue-deep">LinkedIn →</a></li>
          <li><a href={profile.university} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-blue-deep">Sri Sri University →</a></li>
          <li><a href={`mailto:${profile.email}`} className="text-text-muted hover:text-blue-deep">{profile.email}</a></li>
        </ul>
      </div>
    </div>
    <div className="container-site pb-10">
      <div className="font-mono-num text-xs text-text-faint">© 2025 Sunil Kumar Dhal · Updated October 2025</div>
    </div>
  </footer>
);
