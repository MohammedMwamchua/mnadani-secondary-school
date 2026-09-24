import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, Camera, Compass, ChevronRight, Calendar } from "lucide-react";
import { C, serif } from "../config/theme";
import { Card, Section, MottoStrip, Button, Kicker, PlaceholderNote } from "../components/ui";
import { pathFor } from "../lib/routes";
import { useFetch } from "../lib/useFetch";
import { fetchNewsPosts, fetchHomeBanner, fetchQuickLinks } from "../lib/api";
import { newsCategoryMeta } from "../lib/newsCategoryMeta";
import { formatDate } from "../lib/format";

const QUICK_LINK_ICONS = { "/academics": BookOpen, "/alumni": Users, "/gallery": Camera };

function HeroPanel({ slide }) {
  const [broken, setBroken] = useState(false);
  const showImage = Boolean(slide?.photo) && !broken;

  return (
    <div
      className="rounded-[22px] p-7 sm:p-10 text-white min-h-[320px] sm:min-h-[380px] flex flex-col justify-between relative overflow-hidden"
      style={!showImage ? { background: `linear-gradient(155deg, ${C.blue} 0%, ${C.blueDeep} 100%)` } : undefined}
    >
      {showImage && (
        <>
          <img
            src={slide.photo}
            alt={slide.alt || slide.title || ""}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setBroken(true)}
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(155deg, rgba(29,111,168,0.82) 0%, rgba(18,79,128,0.88) 100%)` }}
          />
        </>
      )}
      <div
        className="absolute -right-10 -top-10 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />
      <div className="relative">
        <div
          className="font-semibold leading-[0.85] text-[clamp(4.5rem,16vw,8.125rem)]"
          style={serif}
        >
          '07
        </div>
        <p className="mt-2 text-sm max-w-[26ch]" style={{ color: "rgba(255,255,255,0.82)" }}>
          {slide?.text || "The year Mnadani Secondary School opened its doors to the community."}
        </p>
      </div>
      <div
        className="relative flex flex-wrap gap-x-6 gap-y-4 pt-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.22)" }}
      >
        {[["S2732", "NECTA Centre No."], ["Day School", "Government-run"], ["Dodoma", "City Council"]].map(([a, b]) => (
          <div key={a}>
            <div className="font-semibold text-lg sm:text-xl" style={serif}>{a}</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.78)" }}>{b}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickLinkCard({ c }) {
  const [broken, setBroken] = useState(false);
  const Icon = QUICK_LINK_ICONS[c.path] ?? Compass;
  const showImage = Boolean(c.photo) && !broken;

  return (
    <Link to={c.path || "#"} className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1D6FA8]">
      <Card className="h-full hover:shadow-md hover:-translate-y-1 overflow-hidden p-0">
        {showImage ? (
          <img src={c.photo} alt={c.title} className="w-full h-32 object-cover" onError={() => setBroken(true)} />
        ) : null}
        <div className="p-5">
          {!showImage && (
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: C.blueTint }}>
              <Icon size={20} color={C.blue} />
            </div>
          )}
          <h3 className={`font-semibold text-lg ${showImage ? "" : "mt-4"}`} style={serif}>{c.title}</h3>
          <p className="mt-1 text-sm" style={{ color: C.inkSoft }}>{c.text}</p>
          <div className="flex items-center gap-1 mt-4 text-sm font-semibold" style={{ color: C.blueDeep }}>
            Explore <ChevronRight size={15} />
          </div>
        </div>
      </Card>
    </Link>
  );
}

function QuickLinksSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl p-5" style={{ background: C.white, border: `1px solid ${C.line}` }}>
          <div className="w-11 h-11 rounded-full" style={{ background: C.blueTint }} />
          <div className="h-4 w-24 rounded mt-4" style={{ background: C.blueTint }} />
          <div className="h-3 w-full rounded mt-2" style={{ background: C.blueTint }} />
        </div>
      ))}
    </div>
  );
}

function NewsTeaserCard({ post }) {
  const [broken, setBroken] = useState(false);
  const meta = newsCategoryMeta(post.category, post.categoryLabel);
  const Icon = meta.icon;
  const showImage = Boolean(post.photo) && !broken;

  return (
    <Card className="relative overflow-hidden hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <span
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, ${meta.accent.solid}, ${meta.accent.deep})` }}
      />
      {showImage ? (
        <img
          src={post.photo}
          alt={post.title}
          className="w-full h-28 object-cover rounded-xl -mt-1 mb-3.5"
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="w-10 h-10 rounded-full flex items-center justify-center mt-3" style={{ background: meta.accent.tint }}>
          <Icon size={17} color={meta.accent.deep} />
        </div>
      )}
      <span
        className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit"
        style={{ color: meta.accent.deep, background: meta.accent.tint }}
      >
        {meta.label}
      </span>
      <h3 className="font-semibold" style={serif}>{post.title}</h3>
      <span className="flex items-center gap-1.5 text-xs mt-2" style={{ color: C.inkSoft }}>
        <Calendar size={12} /> {formatDate(post.date)}
      </span>
    </Card>
  );
}

function NewsTeaserSkeleton() {
  return (
    <div className="grid sm:grid-cols-3 gap-5 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl p-5" style={{ background: C.white, border: `1px solid ${C.line}` }}>
          <div className="w-10 h-10 rounded-full" style={{ background: C.blueTint }} />
          <div className="h-5 w-20 rounded-full mt-3.5" style={{ background: C.blueTint }} />
          <div className="h-4 w-3/4 rounded mt-3" style={{ background: C.blueTint }} />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const news = useFetch(fetchNewsPosts);
  const latestPosts = (news.data ?? []).slice(0, 3);
  const banner = useFetch(fetchHomeBanner);
  const heroSlide = banner.data?.[0];
  const quickLinks = useFetch(fetchQuickLinks);

  return (
    <>
      <section className="pt-14 pb-14 sm:pt-20 sm:pb-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold mb-5" style={{ color: C.blueDeep }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.gold }} />
              Government Day Secondary School · Bochela, Nkuhungu
            </div>
            <h1
              className="font-semibold leading-tight text-[clamp(2.1rem,4.5vw+0.5rem,3rem)]"
              style={serif}
            >
              Educating Dodoma's next generation,{" "}
              <em style={{ color: C.blueDeep, fontStyle: "italic" }}>one class at a time.</em>
            </h1>
            <p className="mt-5 text-base sm:text-lg max-w-md" style={{ color: C.inkSoft }}>
              Mnadani Secondary School has served the Bochela and Nkuhungu community since 2007 —
              a place where students from across the ward come each day to learn, grow, and
              prepare for what comes next.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button to={pathFor("history")} variant="primary" className="py-3.5">
                Read our story
              </Button>
              <Button to={pathFor("contact")} variant="secondary" className="py-3.5">
                Visit the school
              </Button>
            </div>
          </div>

          <HeroPanel slide={heroSlide} />
        </div>
      </section>

      <MottoStrip />

      <Section kicker="Quick links" title="Explore the school">
        {quickLinks.loading && <QuickLinksSkeleton />}

        {!quickLinks.loading && quickLinks.error && (
          <PlaceholderNote>
            This section couldn't be loaded right now — please check back soon.
          </PlaceholderNote>
        )}

        {!quickLinks.loading && !quickLinks.error && quickLinks.data.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {quickLinks.data.map((c) => (
              <QuickLinkCard key={c.id} c={c} />
            ))}
          </div>
        )}
      </Section>

      {(news.loading || latestPosts.length > 0) && (
        <Section band>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <Kicker>Latest news</Kicker>
              <h2 className="text-2xl sm:text-3xl font-semibold leading-snug" style={serif}>From the school</h2>
            </div>
            <Button to={pathFor("news")} variant="secondary" className="py-2.5 px-5">
              View all news <ChevronRight size={15} />
            </Button>
          </div>
          {news.loading ? (
            <NewsTeaserSkeleton />
          ) : (
            <div className="grid sm:grid-cols-3 gap-5">
              {latestPosts.map((post) => (
                <NewsTeaserCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </Section>
      )}
    </>
  );
}
