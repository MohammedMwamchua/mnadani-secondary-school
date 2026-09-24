import React from "react";
import { Briefcase, MapPin, Phone, Star, Quote } from "lucide-react";
import { C, serif } from "../config/theme";
import { Card, Section, PageHero, Button, Tag, PhotoAvatar, PlaceholderNote } from "../components/ui";
import { pathFor } from "../lib/routes";
import { useFetch } from "../lib/useFetch";
import { fetchAlumni } from "../lib/api";

function AlumniSpotlightCard({ a }) {
  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-md"
      style={{ border: `1px solid ${C.line}`, background: C.white }}
    >
      <div className="grid sm:grid-cols-[auto_1fr] gap-6 sm:gap-8 p-6 sm:p-8 items-center">
        <div className="relative mx-auto sm:mx-0 flex-shrink-0">
          <PhotoAvatar src={a.photo} alt={a.name} size={112} className="!mb-0 ring-4 ring-white" />
          <span
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: `linear-gradient(155deg, ${C.gold}, #a9791f)`, boxShadow: "0 0 0 3px #fff" }}
          >
            <Star size={14} color="#fff" fill="#fff" />
          </span>
        </div>
        <div className="text-center sm:text-left">
          <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-x-3 gap-y-1.5">
            <h3 className="font-semibold text-2xl" style={serif}>{a.name}</h3>
            <Tag>Class of {a.year}</Tag>
          </div>
          {a.now && (
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm mt-1.5" style={{ color: C.inkSoft }}>
              <Briefcase size={13} className="flex-shrink-0" /> {a.now}
            </div>
          )}
          {a.location && (
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs mt-1" style={{ color: C.inkSoft }}>
              <MapPin size={12} className="flex-shrink-0" /> {a.location}
            </div>
          )}
          {a.phone && (
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs mt-1" style={{ color: C.inkSoft }}>
              <Phone size={12} className="flex-shrink-0" /> {a.phone}
            </div>
          )}
        </div>
      </div>
      {a.message && (
        <div className="px-6 sm:px-8 pb-7 sm:pb-8">
          <div className="relative rounded-2xl p-5 sm:p-6" style={{ background: C.blueTintSoft, border: `1px solid ${C.line}` }}>
            <Quote size={40} className="absolute -top-2.5 -left-1.5 pointer-events-none" style={{ color: C.blueDeep, opacity: 0.1 }} />
            <p className="relative text-sm sm:text-base leading-relaxed" style={{ color: C.ink, fontStyle: "italic", ...serif }}>
              "{a.message}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function AlumniCard({ a }) {
  return (
    <div
      className="group relative rounded-2xl p-5 flex items-center gap-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
      style={{ background: C.white, border: `1px solid ${C.line}` }}
    >
      {a.highlighted && (
        <span
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: `linear-gradient(155deg, ${C.gold}, #a9791f)`, boxShadow: "0 0 0 3px #fff" }}
        >
          <Star size={12} color="#fff" fill="#fff" />
        </span>
      )}
      <PhotoAvatar src={a.photo} alt={a.name} size={72} className="!mb-0 flex-shrink-0" />
      <div className="min-w-0 flex-1">
        <Tag>Class of {a.year}</Tag>
        <h3 className="font-semibold break-words" style={serif}>{a.name}</h3>
        {a.now && (
          <div className="flex items-start gap-1.5 text-sm mt-1" style={{ color: C.inkSoft }}>
            <Briefcase size={13} className="flex-shrink-0 mt-0.5" /> <span className="break-words">{a.now}</span>
          </div>
        )}
        {a.location && (
          <div className="flex items-start gap-1.5 text-xs mt-1" style={{ color: C.inkSoft }}>
            <MapPin size={12} className="flex-shrink-0 mt-0.5" /> <span className="break-words">{a.location}</span>
          </div>
        )}
        {a.phone && (
          <div className="flex items-start gap-1.5 text-xs mt-1" style={{ color: C.inkSoft }}>
            <Phone size={12} className="flex-shrink-0 mt-0.5" /> <span className="break-words">{a.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function AlumniSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="rounded-3xl p-6 sm:p-8 mb-8" style={{ background: C.white, border: `1px solid ${C.line}` }}>
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="w-24 h-24 rounded-full flex-shrink-0" style={{ background: C.blueTint }} />
          <div className="w-full">
            <div className="h-5 w-40 rounded mx-auto sm:mx-0" style={{ background: C.blueTint }} />
            <div className="h-4 w-28 rounded mt-3 mx-auto sm:mx-0" style={{ background: C.blueTint }} />
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl p-5 flex items-center gap-4" style={{ background: C.white, border: `1px solid ${C.line}` }}>
            <div className="w-[72px] h-[72px] rounded-full flex-shrink-0" style={{ background: C.blueTint }} />
            <div className="flex-1">
              <div className="h-4 w-20 rounded-full" style={{ background: C.blueTint }} />
              <div className="h-4 w-28 rounded mt-2" style={{ background: C.blueTint }} />
              <div className="h-3 w-24 rounded mt-3" style={{ background: C.blueTint }} />
              <div className="h-3 w-20 rounded mt-2" style={{ background: C.blueTint }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Alumni() {
  const alumni = useFetch(fetchAlumni);
  const list = alumni.data ?? [];
  const featured = list.filter((a) => a.featured);
  const rest = list.filter((a) => !a.featured);

  return (
    <>
      <PageHero
        title="Former students, still part of the Mnadani story."
        lead="Wherever life has taken you since leaving Mnadani, this is a space to reconnect."
      />
      <Section title="Where our graduates are today" lead="A few of the many students who've gone on from Mnadani since 2007.">
        {alumni.loading && <AlumniSkeleton />}

        {!alumni.loading && alumni.error && (
          <PlaceholderNote>
            This section couldn't be loaded right now — please check back soon.
          </PlaceholderNote>
        )}

        {!alumni.loading && !alumni.error && list.length === 0 && (
          <div
            className="rounded-2xl px-6 py-10 text-center"
            style={{ border: "1px dashed #b9d8ec", background: C.blueTintSoft }}
          >
            <p className="text-sm" style={{ color: C.inkSoft }}>
              No alumni stories yet — check back soon.
            </p>
          </div>
        )}

        {!alumni.loading && !alumni.error && list.length > 0 && (
          <>
            {featured.length > 0 && (
              <div className="space-y-5 mb-8">
                {featured.map((a) => (
                  <AlumniSpotlightCard key={a.id} a={a} />
                ))}
              </div>
            )}

            {rest.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
                {rest.map((a) => (
                  <AlumniCard key={a.id} a={a} />
                ))}
              </div>
            )}
          </>
        )}
      </Section>
      <Section band>
        <Card className="flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-6 p-7 sm:p-8">
          <div>
            <h3 className="text-xl font-semibold" style={serif}>Share your memories</h3>
            <p className="text-sm mt-1" style={{ color: C.inkSoft }}>Help build the alumni archive — photos, stories, and where you are today.</p>
          </div>
          <Button to={pathFor("alumniSubmit")} variant="primary" className="whitespace-nowrap flex-shrink-0">
            Submit your story
          </Button>
        </Card>
      </Section>
    </>
  );
}
