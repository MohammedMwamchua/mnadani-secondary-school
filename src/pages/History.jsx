import React, { useState } from "react";
import { Calendar, Clock, Users, ClipboardCheck, GraduationCap, Sparkles, Camera } from "lucide-react";
import { C, serif } from "../config/theme";
import { Card, Section, PageHero, Tag, PhotoAvatar, PlaceholderNote } from "../components/ui";
import { useFetch } from "../lib/useFetch";
import { fetchHistoryEvents, fetchHeadteachers, fetchNotableTeachers, fetchGalleryAlbums } from "../lib/api";

const TIMELINE_ICONS = [ClipboardCheck, Users, GraduationCap, Sparkles];

function CampusPhotoTile({ photo }) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        className="aspect-square rounded-2xl flex items-center justify-center"
        style={{ background: C.blueTintSoft, border: `1px solid ${C.line}` }}
      >
        <Camera size={20} style={{ color: C.blueDeep, opacity: 0.4 }} />
      </div>
    );
  }

  return (
    <div
      className="group relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      style={{ border: `1px solid ${C.line}` }}
    >
      <img
        src={photo.src}
        alt={photo.caption || "Campus photo"}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={() => setBroken(true)}
      />
      {photo.caption && (
        <>
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(10,25,35,0.72) 100%)" }}
          />
          <span className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white truncate">
            {photo.caption}
          </span>
        </>
      )}
    </div>
  );
}

function CampusSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-2xl" style={{ background: C.blueTint }} />
      ))}
    </div>
  );
}

function TimelineSkeleton() {
  return (
    <div className="space-y-6 max-w-md mx-auto md:max-w-lg animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-start gap-6">
          <div className="w-14 h-14 rounded-full flex-shrink-0" style={{ background: C.blueTint }} />
          <div className="flex-1 rounded-2xl p-5" style={{ background: C.blueTintSoft, border: `1px solid ${C.line}` }}>
            <div className="h-3 w-16 rounded-full" style={{ background: C.blueTint }} />
            <div className="h-4 w-48 max-w-full rounded mt-3" style={{ background: C.blueTint }} />
            <div className="h-3 w-full rounded mt-3" style={{ background: C.blueTint }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function RowListSkeleton() {
  return (
    <div className="space-y-6 sm:space-y-7 max-w-3xl animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="w-14 h-14 rounded-full flex-shrink-0" style={{ background: C.blueTint }} />
          <div className="flex-1 rounded-2xl p-5 sm:p-6" style={{ background: C.blueTintSoft, border: `1px solid ${C.line}` }}>
            <div className="h-4 w-40 max-w-full rounded" style={{ background: C.blueTint }} />
            <div className="h-3 w-20 rounded-full mt-3" style={{ background: C.blueTint }} />
            <div className="h-3 w-full rounded mt-3" style={{ background: C.blueTint }} />
            <div className="h-3 w-2/3 rounded mt-2" style={{ background: C.blueTint }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function History() {
  const timeline = useFetch(fetchHistoryEvents);
  const headteachers = useFetch(fetchHeadteachers);
  const notableTeachers = useFetch(fetchNotableTeachers);
  const campusGallery = useFetch(() => fetchGalleryAlbums("campus"));
  const campusPhotos = campusGallery.data?.[0]?.photos ?? [];

  const headteacherCount = headteachers.loading ? "…" : String((headteachers.data ?? []).length);

  const STATS = [
    { icon: Calendar, n: "2007", label: "Year founded" },
    { icon: Clock, n: "18+", label: "Years serving Bochela" },
    { icon: Users, n: headteacherCount, label: "Headteachers to date" },
  ];

  return (
    <>
      <PageHero
        title="Nearly two decades of teaching Bochela's students."
        lead="From a newly registered day school in 2007 to a community fixture in Nkuhungu — this is how Mnadani has grown."
      />

      <div className="px-6 relative z-10 -mt-8">
        <div
          className="max-w-5xl mx-auto rounded-2xl grid sm:grid-cols-3 shadow-lg"
          style={{ background: C.white, border: `1px solid ${C.line}` }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex items-center gap-4 p-6 ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-[#D6E7F2]" : ""}`}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: C.blueTint }}
              >
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

      <Section title="Timeline" kicker="How we've grown" lead="Key milestones since the school's founding in 2007.">
        {timeline.loading && <TimelineSkeleton />}

        {!timeline.loading && timeline.error && (
          <PlaceholderNote>
            This section couldn't be loaded right now — please check back soon.
          </PlaceholderNote>
        )}

        {!timeline.loading && !timeline.error && timeline.data.length === 0 && (
          <PlaceholderNote>
            The school's timeline is coming soon.
          </PlaceholderNote>
        )}

        {!timeline.loading && !timeline.error && timeline.data.length > 0 && (
          <div className="relative">
            <div
              className="absolute top-2 bottom-2 w-0.5 rounded-full left-7 md:left-1/2 md:-translate-x-1/2"
              style={{ background: `linear-gradient(180deg, ${C.blue}, ${C.gold})`, opacity: 0.35 }}
            />

            {timeline.data.map((t, i) => {
              const Icon = TIMELINE_ICONS[i % TIMELINE_ICONS.length];
              const isLast = i === timeline.data.length - 1;
              const alignRight = i % 2 === 1;
              const contentClass = alignRight
                ? "md:col-start-3 md:mr-auto md:max-w-md"
                : "md:col-start-1 md:ml-auto md:max-w-md";

              return (
                <div
                  key={t.id ?? t.title}
                  className="relative grid grid-cols-[56px_1fr] md:grid-cols-[1fr_56px_1fr] gap-6 md:gap-10 py-6 md:py-8 items-start"
                >
                  <div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center md:col-start-2"
                    style={{ background: `linear-gradient(155deg, ${C.blue}, ${C.blueDeep})`, boxShadow: "0 4px 14px rgba(29,111,168,0.35)" }}
                  >
                    {isLast && (
                      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: C.blue, opacity: 0.35 }} />
                    )}
                    <Icon size={20} color="#fff" />
                  </div>

                  <div className={contentClass}>
                    <Card className="hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                      <Tag>{t.mark}</Tag>
                      <h3 className="font-semibold text-lg" style={serif}>{t.title}</h3>
                      <p className="text-sm mt-1.5" style={{ color: C.inkSoft }}>{t.body}</p>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>

      <Section band kicker="Leadership through the years" title="Former Headteachers">
        {headteachers.loading && <RowListSkeleton />}

        {!headteachers.loading && headteachers.error && (
          <PlaceholderNote>
            This section couldn't be loaded right now — please check back soon.
          </PlaceholderNote>
        )}

        {!headteachers.loading && !headteachers.error && headteachers.data.length === 0 && (
          <PlaceholderNote>
            Former headteachers will be listed here soon.
          </PlaceholderNote>
        )}

        {!headteachers.loading && !headteachers.error && headteachers.data.length > 0 && (
          <div className="relative max-w-3xl">
            <div
              className="absolute top-3 bottom-3 left-7 w-px hidden sm:block"
              style={{ background: `linear-gradient(180deg, ${C.blue}, ${C.gold})`, opacity: 0.3 }}
            />
            <div className="space-y-6 sm:space-y-7">
              {headteachers.data.map((h, i) => (
                <div key={h.id ?? h.name} className="group relative flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="relative z-10 flex-shrink-0 self-start">
                    <PhotoAvatar src={h.photo} alt={h.name} initials={h.initials} size={56} className="!mb-0" />
                    <span
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                      style={{ background: `linear-gradient(155deg, ${C.gold}, #a9791f)`, color: "#fff", boxShadow: "0 0 0 3px #fff", ...serif }}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <div
                    className="flex-1 min-w-0 rounded-2xl p-5 sm:p-6 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5"
                    style={{ background: C.white, border: `1px solid ${C.line}` }}
                  >
                    <h3 className="font-semibold text-lg" style={serif}>{h.name}</h3>
                    <div className="mt-1.5">
                      <Tag>{h.period}</Tag>
                    </div>
                    <p className="text-sm mt-2.5 leading-relaxed" style={{ color: C.inkSoft }}>{h.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="my-10" style={{ borderTop: `1px solid ${C.line}` }} />

        <div className="mb-8 max-w-2xl">
          <div className="text-sm font-semibold mb-2" style={{ color: C.blueDeep }}>Remembered fondly</div>
          <h2 className="text-3xl font-semibold leading-snug" style={serif}>Notable Teachers</h2>
          <p className="mt-3" style={{ color: C.inkSoft }}>Teachers whose years at Mnadani left a lasting mark on students and colleagues.</p>
        </div>

        {notableTeachers.loading && <RowListSkeleton />}

        {!notableTeachers.loading && notableTeachers.error && (
          <PlaceholderNote>
            This section couldn't be loaded right now — please check back soon.
          </PlaceholderNote>
        )}

        {!notableTeachers.loading && !notableTeachers.error && notableTeachers.data.length === 0 && (
          <PlaceholderNote>
            Notable teachers will be listed here soon.
          </PlaceholderNote>
        )}

        {!notableTeachers.loading && !notableTeachers.error && notableTeachers.data.length > 0 && (
          <div className="relative max-w-3xl">
            <div
              className="absolute top-3 bottom-3 left-7 w-px hidden sm:block"
              style={{ background: `linear-gradient(180deg, ${C.blue}, ${C.gold})`, opacity: 0.3 }}
            />
            <div className="space-y-6 sm:space-y-7">
              {notableTeachers.data.map((t, i) => (
                <div key={t.id ?? t.name} className="group relative flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <div className="relative z-10 flex-shrink-0 self-start">
                    <PhotoAvatar src={t.photo} alt={t.name} size={56} className="!mb-0" />
                    <span
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                      style={{ background: `linear-gradient(155deg, ${C.gold}, #a9791f)`, color: "#fff", boxShadow: "0 0 0 3px #fff", ...serif }}
                    >
                      {i + 1}
                    </span>
                  </div>

                  <div
                    className="flex-1 min-w-0 rounded-2xl p-5 sm:p-6 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5"
                    style={{ background: C.white, border: `1px solid ${C.line}` }}
                  >
                    <h3 className="font-semibold text-lg" style={serif}>{t.name}</h3>
                    <div className="mt-1.5">
                      <Tag>{t.meta}</Tag>
                    </div>
                    <p className="text-sm mt-2.5 leading-relaxed" style={{ color: C.inkSoft }}>{t.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section kicker="A visual record" title="Campus through the years">
        {campusGallery.loading && <CampusSkeleton />}

        {!campusGallery.loading && campusGallery.error && (
          <PlaceholderNote>
            This section couldn't be loaded right now — please check back soon.
          </PlaceholderNote>
        )}

        {!campusGallery.loading && !campusGallery.error && campusPhotos.length === 0 && (
          <PlaceholderNote>
            Campus photos are coming soon.
          </PlaceholderNote>
        )}

        {!campusGallery.loading && !campusGallery.error && campusPhotos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {campusPhotos.map((p) => (
              <CampusPhotoTile key={p.id} photo={p} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
