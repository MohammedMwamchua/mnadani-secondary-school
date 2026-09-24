import React, { useState } from "react";
import {
  Award, Calendar, Trophy, ClipboardCheck, ClipboardList, ShieldCheck, Users,
  GraduationCap, Compass, Briefcase, BookOpen,
} from "lucide-react";
import { C, serif } from "../config/theme";
import { Card, Section, PageHero, Tag, AwardCard, PlaceholderNote } from "../components/ui";
import { useFetch } from "../lib/useFetch";
import { fetchAwards, fetchSubjects } from "../lib/api";

const RESULTS = [
  { icon: Award, stat: "S2732", label: "Registered NECTA exam centre" },
  { icon: Calendar, stat: "Annual", label: "CSEE Form 4 candidates each year" },
  { icon: Trophy, stat: "2023", label: "Most recent published results on record" },
];

const APPROACH = [
  { icon: ClipboardCheck, title: "Structured progression", body: "A steady path from Form 1 through Form 4, each year building the knowledge and exam technique needed for CSEE." },
  { icon: ClipboardList, title: "Continuous assessment", body: "Regular tests and mock examinations track every student's progress well ahead of the national exam." },
  { icon: ShieldCheck, title: "Discipline & academics together", body: "Matching the school's own motto — a focused, well-ordered environment where learning can actually happen." },
  { icon: Users, title: "Subject specialist teachers", body: "Dedicated teachers across languages, sciences, humanities, mathematics, business, and religious education." },
];

const PATHWAYS = [
  { icon: GraduationCap, title: "Advanced level (Form 5–6)", body: "Students who qualify can continue to A-level studies, working toward the Advanced Certificate of Secondary Education (ACSEE)." },
  { icon: Compass, title: "Vocational & technical training", body: "Many students move into vocational colleges such as VETA, training directly for a trade or technical career." },
  { icon: Briefcase, title: "Employment & apprenticeships", body: "A CSEE qualification opens the door to entry-level employment and on-the-job training across many sectors." },
  { icon: BookOpen, title: "Further study", body: "For those who continue through A-level, university and other higher-education routes follow from there." },
];

function SubjectCard({ s }) {
  const [broken, setBroken] = useState(false);
  const showImage = Boolean(s.photo) && !broken;

  if (showImage) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md" style={{ background: C.white, border: `1px solid ${C.line}` }}>
        <img src={s.photo} alt={s.title} className="w-full h-32 object-cover" onError={() => setBroken(true)} />
        <div className="p-5">
          <Tag>{s.tag}</Tag>
          <h3 className="font-semibold text-lg" style={serif}>{s.title}</h3>
          <p className="text-sm mt-2" style={{ color: C.inkSoft }}>{s.body}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="hover:shadow-md">
      <Tag>{s.tag}</Tag>
      <h3 className="font-semibold text-lg" style={serif}>{s.title}</h3>
      <p className="text-sm mt-2" style={{ color: C.inkSoft }}>{s.body}</p>
    </Card>
  );
}

function CardsSkeleton({ count = 6 }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl p-5" style={{ background: C.white, border: `1px solid ${C.line}` }}>
          <div className="h-5 w-20 rounded-full" style={{ background: C.blueTint }} />
          <div className="h-4 w-3/4 rounded mt-3" style={{ background: C.blueTint }} />
          <div className="h-3 w-full rounded mt-3" style={{ background: C.blueTint }} />
        </div>
      ))}
    </div>
  );
}

export default function Academics() {
  const subjects = useFetch(fetchSubjects);
  const awards = useFetch(() => fetchAwards("academic"));

  return (
    <>
      <PageHero
        title="A curriculum built for CSEE, and life after it."
        lead="Core subjects taught across all forms, aligned with the national syllabus."
      />
      <Section kicker="Our approach" title="Built around the CSEE, from Form 1">
        <div className="grid sm:grid-cols-2 gap-5">
          {APPROACH.map((p) => (
            <Card key={p.title} className="hover:shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.blueTint }}>
                  <p.icon size={18} color={C.blueDeep} />
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: C.blueDeep }}>{p.title}</h3>
                  <p className="text-sm mt-1" style={{ color: C.inkSoft }}>{p.body}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
      <Section kicker="Subjects" title="What students study">
        {subjects.loading && <CardsSkeleton />}

        {!subjects.loading && subjects.error && (
          <PlaceholderNote>
            This section couldn't be loaded right now — please check back soon.
          </PlaceholderNote>
        )}

        {!subjects.loading && !subjects.error && subjects.data.length === 0 && (
          <PlaceholderNote>
            Subject information is coming soon.
          </PlaceholderNote>
        )}

        {!subjects.loading && !subjects.error && subjects.data.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {subjects.data.map((s) => (
              <SubjectCard key={s.id} s={s} />
            ))}
          </div>
        )}
      </Section>
      <Section band kicker="Results" title="Academic achievements">
        <div className="grid sm:grid-cols-3 gap-5">
          {RESULTS.map((s) => (
            <Card key={s.label} className="text-center hover:shadow-md">
              <div className="w-11 h-11 mx-auto rounded-full flex items-center justify-center" style={{ background: C.blueTint }}>
                <s.icon size={20} color={C.blue} />
              </div>
              <div className="font-semibold text-2xl mt-3" style={serif}>{s.stat}</div>
              <div className="text-sm mt-1" style={{ color: C.inkSoft }}>{s.label}</div>
            </Card>
          ))}
        </div>
      </Section>
      <Section kicker="Beyond Form 4" title="Where a CSEE from Mnadani can lead" lead="The national exam is a stepping stone, not an endpoint — here's what typically follows it.">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {PATHWAYS.map((p) => (
            <Card key={p.title} className="hover:shadow-md">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: C.blueTint }}>
                <p.icon size={18} color={C.blueDeep} />
              </div>
              <h3 className="font-semibold mt-3" style={{ color: C.blueDeep }}>{p.title}</h3>
              <p className="text-sm mt-1" style={{ color: C.inkSoft }}>{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>
      <Section kicker="Recognition" title="Awards & honours" lead="Academic awards and recognition earned by the school and its top students.">
        {awards.loading && <CardsSkeleton count={3} />}

        {!awards.loading && awards.error && (
          <PlaceholderNote>
            This section couldn't be loaded right now — please check back soon.
          </PlaceholderNote>
        )}

        {!awards.loading && !awards.error && awards.data.length === 0 && (
          <PlaceholderNote>
            Academic awards and honours are coming soon.
          </PlaceholderNote>
        )}

        {!awards.loading && !awards.error && awards.data.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {awards.data.map((a) => (
              <AwardCard key={a.id} title={a.title} meta={a.meta} body={a.body} image={a.image} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
