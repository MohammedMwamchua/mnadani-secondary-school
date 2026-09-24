import React from "react";
import { Calendar, BadgeCheck, Building2, GraduationCap, Users, Quote, ArrowRight } from "lucide-react";
import { C, serif } from "../config/theme";
import { Card, Section, PageHero, Button, PlaceholderNote } from "../components/ui";
import { useFetch } from "../lib/useFetch";
import { fetchSiteInfo } from "../lib/api";
import { pathFor } from "../lib/routes";

function AboutSkeleton() {
  return (
    <div className="px-6 -mt-8 relative z-10">
      <div className="max-w-5xl mx-auto animate-pulse space-y-5">
        <div className="h-24 rounded-2xl" style={{ background: C.blueTint }} />
        <div className="h-48 rounded-2xl" style={{ background: C.blueTint }} />
      </div>
    </div>
  );
}

export default function About() {
  const site = useFetch(fetchSiteInfo);
  const info = site.data;

  return (
    <>
      <PageHero
        title="Rooted in Bochela, built for the whole city."
        lead="As a government day school, Mnadani has always been about access — a solid secondary education for students who live right here in Bochela and Nkuhungu, and across Dodoma City."
      />

      {site.loading && <AboutSkeleton />}

      {!site.loading && site.error && (
        <div className="px-6">
          <div className="max-w-5xl mx-auto mt-8">
            <PlaceholderNote>
              This page couldn't be loaded right now — please check back soon.
            </PlaceholderNote>
          </div>
        </div>
      )}

      {!site.loading && !site.error && info && (
        <>
          <div className="px-6 relative z-10 -mt-8">
            <div
              className="max-w-5xl mx-auto rounded-2xl grid sm:grid-cols-3 shadow-lg"
              style={{ background: C.white, border: `1px solid ${C.line}` }}
            >
              {[
                { icon: Calendar, n: info.foundedYear || "—", label: "Year founded" },
                { icon: BadgeCheck, n: info.nectaCentreNumber || "—", label: "NECTA Centre number" },
                { icon: Building2, n: "Day School", label: "Government-run" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-4 p-6 ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-[#D6E7F2]" : ""}`}
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.blueTint }}>
                    <s.icon size={20} color={C.blue} />
                  </div>
                  <div>
                    <div className="font-semibold text-2xl leading-none" style={{ ...serif, color: C.blueDeep }}>{s.n}</div>
                    <div className="text-xs mt-1.5" style={{ color: C.inkSoft }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Section kicker="Who we are" title="A school built on access">
            <div className="grid md:grid-cols-[1fr_340px] gap-10 md:gap-14">
              <div className="space-y-4 text-[15px] sm:text-base leading-relaxed" style={{ color: C.inkSoft }}>
                {info.introduction
                  ? info.introduction.split(/\n\s*\n/).map((p, i) => <p key={i}>{p}</p>)
                  : <p>Introduction coming soon.</p>}
              </div>

              <Card className="relative overflow-hidden h-fit">
                <Quote
                  size={72}
                  className="absolute -top-3 -right-3 pointer-events-none"
                  style={{ color: C.blueDeep, opacity: 0.06 }}
                />
                <div className="relative space-y-6">
                  {info.vision && (
                    <div>
                      <div className="text-xs font-semibold tracking-wide uppercase" style={{ color: C.blueDeep }}>Vision</div>
                      <p className="text-lg font-semibold mt-1.5 leading-snug" style={serif}>
                        &ldquo;{info.vision}&rdquo;
                      </p>
                    </div>
                  )}
                  {info.motto && (
                    <div className={info.vision ? "pt-6" : ""} style={info.vision ? { borderTop: `1px solid ${C.line}` } : undefined}>
                      <div className="text-xs font-semibold tracking-wide uppercase" style={{ color: C.blueDeep }}>Motto</div>
                      <p className="text-lg font-semibold mt-1.5 leading-snug" style={serif}>
                        &ldquo;{info.motto}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </Section>

          <Section band kicker="Our foundations" title="Mission & governance">
            <div className="grid sm:grid-cols-2 gap-5">
              <Card className="hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.blueTint }}>
                    <GraduationCap size={18} color={C.blueDeep} />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: C.blueDeep }}>Mission</h3>
                    <p className="text-sm mt-1" style={{ color: C.inkSoft }}>
                      {info.mission || "Coming soon."}
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.blueTint }}>
                    <Users size={18} color={C.blueDeep} />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: C.blueDeep }}>Administered by</h3>
                    <p className="text-sm mt-1" style={{ color: C.inkSoft }}>
                      {info.administeredBy}, under the Prime Minister's Office — Regional Administration and Local Government.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {info.headteacherMessage && (
              <Card className="relative overflow-hidden mt-5">
                <Quote size={56} className="absolute -top-2 -right-2 pointer-events-none" style={{ color: C.blueDeep, opacity: 0.06 }} />
                <div className="text-xs font-semibold tracking-wide uppercase mb-2" style={{ color: C.blueDeep }}>
                  A message from the headteacher
                </div>
                <p className="text-sm leading-relaxed" style={{ color: C.inkSoft }}>{info.headteacherMessage}</p>
              </Card>
            )}
          </Section>
        </>
      )}

      <Section>
        <Card className="flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-6 p-7 sm:p-8">
          <div>
            <h3 className="text-xl font-semibold" style={serif}>Want the fuller story?</h3>
            <p className="text-sm mt-1" style={{ color: C.inkSoft }}>See the timeline, past headteachers, and notable teachers since 2007.</p>
          </div>
          <Button to={pathFor("history")} variant="primary" className="whitespace-nowrap flex-shrink-0">
            Read our history <ArrowRight size={15} />
          </Button>
        </Card>
      </Section>
    </>
  );
}
