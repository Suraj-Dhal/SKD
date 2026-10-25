import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/sunil-logo.webp";

const navGroups = [
  {
    label: "About",
    base: "/about",
    items: [
      { to: "/about/overview", label: "Biography / Overview" },
      { to: "/about/experience", label: "Experience" },
      { to: "/about/awards", label: "Awards" },
    ],
  },
  {
    label: "Work",
    base: "/work",
    items: [
      { to: "/work/impact", label: "Impact" },
      { to: "/work/consultancy", label: "Consultancy" },
      { to: "/work/editorial", label: "Editorial" },
    ],
  },
  {
    label: "Publications",
    base: "/publications",
    items: [
      { to: "/publications/research", label: "Research Publications" },
      { to: "/publications/books", label: "Books" },
      { to: "/publications/scholars", label: "Scholars" },
    ],
  },
  {
    label: "Speaking",
    base: "/speaking",
    to: "/speaking",
  },
  {
    label: "Contact",
    base: "/contact",
    to: "/contact",
  },
];

export const TopNav = () => {
  const location = useLocation();
  const currentGroup = navGroups.find((group) => location.pathname.startsWith(group.base));
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(currentGroup?.label ?? "About");

  return (
    <header className="sticky top-0 z-50 h-[72px] bg-background border-b border-hairline">
      <div className="container-site h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Sunil K. Dhal" className="h-9 w-9 rounded-full object-cover border border-hairline" />
          <span className="font-semibold text-sm text-text">Sunil K. Dhal</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navGroups.map((group) => {
            const isActive = location.pathname.startsWith(group.base);
            const menuId = `nav-${group.label.toLowerCase().replace(/\s+/g, "-")}`;

            if (!("items" in group)) {
              return (
                <NavLink
                  key={group.label}
                  to={group.to}
                  className={({ isActive: itemActive }) =>
                    `text-sm transition-colors ${itemActive || isActive ? "text-blue-deep font-medium" : "text-text-muted hover:text-blue-deep"}`
                  }
                >
                  {group.label}
                </NavLink>
              );
            }

            return (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setActiveMenu(group.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={activeMenu === group.label}
                  aria-controls={menuId}
                  onClick={() => setActiveMenu(activeMenu === group.label ? null : group.label)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") setActiveMenu(null);
                  }}
                  className={`flex items-center gap-1 text-sm transition-colors ${isActive ? "text-blue-deep font-medium" : "text-text-muted hover:text-blue-deep"}`}
                >
                  {group.label}{" "}
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${activeMenu === group.label ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {activeMenu === group.label && (
                    <motion.div
                      id={menuId}
                      role="menu"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                    >
                      <div className="card-hairline bg-card shadow-lift py-2 min-w-[220px]">
                        {group.items.map((item) => (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            role="menuitem"
                            onClick={() => setActiveMenu(null)}
                            className={({ isActive: itemActive }) =>
                              `block px-4 py-2 text-sm transition-colors ${itemActive ? "bg-surface text-blue-deep font-medium" : "text-text-muted hover:text-blue-deep hover:bg-surface"}`
                            }
                          >
                            {item.label}
                          </NavLink>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => {
            setMobileSection(currentGroup?.label ?? "About");
            setOpen(true);
          }}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="container-site flex items-center justify-between h-[72px] border-b border-hairline">
              <span className="font-semibold text-sm">Sunil K. Dhal</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
                <X size={22} />
              </button>
            </div>
            <nav className="container-site flex flex-col gap-3 py-8">
              {navGroups.map((group) => {
                if (!("items" in group)) {
                  return (
                    <Link
                      key={group.label}
                      to={group.to}
                      onClick={() => setOpen(false)}
                      className="border-b border-hairline py-4 text-2xl font-semibold text-text hover:text-blue-deep"
                    >
                      {group.label}
                    </Link>
                  );
                }

                const expanded = mobileSection === group.label;
                return (
                  <div key={group.label} className="border-b border-hairline pb-3">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setMobileSection(expanded ? null : group.label)}
                      className="flex w-full items-center justify-between py-3 text-left text-2xl font-semibold text-text"
                    >
                      {group.label}
                      <ChevronDown size={20} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pb-3">
                            {group.items.map((item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setOpen(false)}
                                className="py-2 text-base text-text-muted hover:text-blue-deep"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
