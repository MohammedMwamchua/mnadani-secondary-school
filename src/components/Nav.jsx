import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { C, serif } from "../config/theme";
import { Crest } from "./ui";
import { NAV } from "../data/content";
import { pathFor } from "../lib/routes";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-50 transition-shadow duration-300"
      style={{
        background: "rgba(247,251,254,0.86)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.line}`,
        boxShadow: scrolled ? "0 4px 24px rgba(19,42,56,0.09)" : "none",
      }}
    >
      <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${C.blue}, ${C.gold})` }} />

      <div className="max-w-6xl mx-auto px-6 h-[64px] lg:h-[72px] flex items-center justify-between gap-6">
        <button
          className="flex items-center gap-3 flex-shrink-0 min-w-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D6FA8]"
          onClick={() => navigate(pathFor("home"))}
        >
          <Crest size={32} />
          <div className="text-left leading-tight min-w-0">
            <div className="font-semibold text-[15.5px] sm:text-[18px] tracking-tight truncate" style={serif}>
              Mnadani Secondary
            </div>
            <div
              className="text-[9.5px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase truncate"
              style={{ color: C.inkSoft }}
            >
              Dodoma · Tanzania
            </div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-6 flex-shrink-0">
          {NAV.slice(1, -1).map((n) => {
            const active = pathname === pathFor(n.id);
            return (
              <Link
                key={n.id}
                to={pathFor(n.id)}
                className={`relative group py-2 text-[13.5px] font-medium whitespace-nowrap transition-colors duration-200 ${
                  active ? "" : "text-[#4C6272] hover:text-[#124F80]"
                }`}
                style={active ? { color: C.blueDeep } : undefined}
              >
                {n.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full origin-left transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  style={{ background: C.blue }}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          to={pathFor("contact")}
          className="hidden lg:inline-flex items-center gap-1.5 flex-shrink-0 text-[13.5px] font-semibold pl-5 pr-4 py-2.5 rounded-full transition-all duration-200 hover:shadow-md hover:brightness-[1.08] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1D6FA8] group"
          style={{ background: C.blue, color: C.white }}
        >
          Contact Us
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>

        <button
          className="lg:hidden -mr-2 p-2 rounded-lg transition-colors duration-200 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D6FA8]"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className="lg:hidden grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        aria-hidden={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <nav className="px-4 pb-3 pt-1 flex flex-col gap-0.5" style={{ borderTop: `1px solid ${C.line}` }}>
            {NAV.map((n) => {
              const active = pathname === pathFor(n.id);
              return (
                <Link
                  key={n.id}
                  to={pathFor(n.id)}
                  className="px-3 py-2.5 rounded-lg text-[15px] font-medium transition-colors duration-200"
                  style={{ color: active ? C.blueDeep : C.inkSoft, background: active ? C.blueTint : "transparent" }}
                  tabIndex={open ? 0 : -1}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
