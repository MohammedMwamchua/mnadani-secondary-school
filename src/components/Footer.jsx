import React from "react";
import { Link } from "react-router-dom";
import { C, serif } from "../config/theme";
import { Crest } from "./ui";
import { NAV } from "../data/content";
import { pathFor } from "../lib/routes";

export default function Footer() {
  return (
    <footer className="px-6 pt-14 md:pt-16 pb-8" style={{ background: C.ink, color: "rgba(255,255,255,0.75)" }}>
      <div className="max-w-5xl mx-auto">
        <div
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 pb-10"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
        >
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <Crest size={34} />
              <div className="text-white font-semibold" style={serif}>Mnadani Secondary School</div>
            </div>
            <p className="text-sm max-w-[32ch]" style={{ color: "rgba(255,255,255,0.6)" }}>
              Bochela, Nkuhungu Ward, Dodoma City. P.O. Box 3399, Dodoma. A Dodoma City Council school, est. 2007.
            </p>
          </div>

          {[
            { title: "School", items: ["about", "history", "academics", "students"] },
            { title: "Community", items: ["news", "alumni", "gallery"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-xs font-semibold mb-4 tracking-wide uppercase">{col.title}</h4>
              {col.items.map((id) => (
                <Link
                  key={id}
                  to={pathFor(id)}
                  className="block text-sm py-1.5 mb-1 text-left transition-colors duration-200 hover:text-white"
                  style={{ color: "rgba(255,255,255,0.68)" }}
                >
                  {NAV.find((n) => n.id === id)?.label}
                </Link>
              ))}
            </div>
          ))}

          <div>
            <h4 className="text-white text-xs font-semibold mb-4 tracking-wide uppercase">Contact</h4>
            <div className="text-sm py-1.5 mb-1" style={{ color: "rgba(255,255,255,0.68)" }}>Bochela, Nkuhungu, Dodoma</div>
            <div className="text-sm py-1.5 mb-1" style={{ color: "rgba(255,255,255,0.68)" }}>P.O. Box 3399, Dodoma</div>
            <div className="text-sm py-1.5 mb-1" style={{ color: "rgba(255,255,255,0.68)" }}>NECTA Centre: S2732</div>
            <a
              href="mailto:info@mnadanisecondary.sc.tz"
              className="block text-sm py-1.5 mb-1 transition-colors duration-200 hover:text-white"
              style={{ color: "rgba(255,255,255,0.68)" }}
            >
              info@mnadanisecondary.sc.tz
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-between pt-6 text-xs text-center sm:text-left" style={{ color: "rgba(255,255,255,0.5)" }}>
          <span>© 2026 Mnadani Secondary School.</span>
          <span>Bochela · Nkuhungu · Dodoma City</span>
        </div>
      </div>
    </footer>
  );
}
