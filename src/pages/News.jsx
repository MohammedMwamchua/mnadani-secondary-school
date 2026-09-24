import React, { useMemo, useState } from "react";
import { Calendar, Sparkles } from "lucide-react";
import { C, serif } from "../config/theme";
import { Section, PageHero, PlaceholderNote, CategoryChip } from "../components/ui";
import { useFetch } from "../lib/useFetch";
import { fetchNewsPosts } from "../lib/api";
import { newsCategoryMeta } from "../lib/newsCategoryMeta";
import { formatDate } from "../lib/format";

function FeaturedBanner({ post }) {
  const [broken, setBroken] = useState(false);
  const meta = newsCategoryMeta(post.category, post.categoryLabel);
  const Icon = meta.icon;
  const showImage = Boolean(post.photo) && !broken;

  return (
    <div
      className="relative rounded-3xl overflow-hidden grid md:grid-cols-[360px_1fr] shadow-md"
      style={{ border: `1px solid ${C.line}`, background: C.white }}
    >
      <div className="relative h-48 md:h-full overflow-hidden">
        {showImage ? (
          <img
            src={post.photo}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setBroken(true)}
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(155deg, ${meta.accent.solid} 0%, ${meta.accent.deep} 100%)` }}
          >
            <svg className="absolute inset-0 w-full h-full opacity-[0.16]" preserveAspectRatio="none">
              <defs>
                <pattern id="news-dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="#fff" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#news-dots)" />
            </svg>
            <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.08)" }} />
            <div className="absolute -left-8 -top-8 w-28 h-28 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.07)" }} />
            <div
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.25)" }}
            >
              <Icon size={38} color="#fff" strokeWidth={1.7} />
            </div>
          </div>
        )}
      </div>

      <div className="p-6 sm:p-9 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full"
            style={{ background: `linear-gradient(155deg, ${C.gold}, #a9791f)`, color: "#fff" }}
          >
            <Sparkles size={12} /> Top story
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: C.inkSoft }}>
            <Calendar size={13} /> {formatDate(post.date)}
          </span>
        </div>
        <span
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit"
          style={{ color: meta.accent.deep, background: meta.accent.tint }}
        >
          {meta.label}
        </span>
        <h2 className="text-2xl sm:text-[2rem] font-semibold leading-snug max-w-2xl" style={serif}>{post.title}</h2>
        <p className="mt-3 text-sm sm:text-base max-w-xl leading-relaxed" style={{ color: C.inkSoft }}>{post.excerpt}</p>
      </div>
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <div
      className="rounded-3xl overflow-hidden grid md:grid-cols-[360px_1fr] animate-pulse"
      style={{ border: `1px solid ${C.line}`, background: C.white }}
    >
      <div className="h-48 md:h-full" style={{ background: C.blueTint }} />
      <div className="p-6 sm:p-9">
        <div className="h-5 w-24 rounded-full" style={{ background: C.blueTint }} />
        <div className="h-7 w-3/4 rounded mt-4" style={{ background: C.blueTint }} />
        <div className="h-4 w-full rounded mt-4" style={{ background: C.blueTint }} />
        <div className="h-4 w-2/3 rounded mt-2" style={{ background: C.blueTint }} />
      </div>
    </div>
  );
}

function NewsCard({ post }) {
  const [broken, setBroken] = useState(false);
  const meta = newsCategoryMeta(post.category, post.categoryLabel);
  const Icon = meta.icon;
  const showImage = Boolean(post.photo) && !broken;

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
      style={{ background: C.white, border: `1px solid ${C.line}` }}
    >
      <span
        className="absolute top-0 left-0 right-0 h-1 z-10"
        style={{ background: `linear-gradient(90deg, ${meta.accent.solid}, ${meta.accent.deep})` }}
      />
      {showImage && (
        <img
          src={post.photo}
          alt={post.title}
          className="w-full h-36 object-cover"
          onError={() => setBroken(true)}
        />
      )}
      <div className={`p-5 flex flex-col flex-1 ${showImage ? "" : "pt-6"}`}>
        {!showImage && (
          <div className="w-11 h-11 rounded-full flex items-center justify-center mb-3.5" style={{ background: meta.accent.tint }}>
            <Icon size={19} color={meta.accent.deep} />
          </div>
        )}
        <span
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 w-fit"
          style={{ color: meta.accent.deep, background: meta.accent.tint }}
        >
          {meta.label}
        </span>
        <h3 className="font-semibold text-lg leading-snug" style={serif}>{post.title}</h3>
        <p className="text-sm mt-2 flex-1 leading-relaxed" style={{ color: C.inkSoft }}>{post.excerpt}</p>
        <span
          className="flex items-center gap-1.5 text-xs mt-4 pt-4"
          style={{ color: C.inkSoft, borderTop: `1px solid ${C.line}` }}
        >
          <Calendar size={13} /> {formatDate(post.date)}
        </span>
      </div>
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 animate-pulse">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl p-5" style={{ background: C.white, border: `1px solid ${C.line}` }}>
          <div className="w-11 h-11 rounded-full" style={{ background: C.blueTint }} />
          <div className="h-5 w-20 rounded-full mt-3.5" style={{ background: C.blueTint }} />
          <div className="h-4 w-3/4 rounded mt-3" style={{ background: C.blueTint }} />
          <div className="h-3 w-full rounded mt-3" style={{ background: C.blueTint }} />
        </div>
      ))}
    </div>
  );
}

export default function News() {
  const news = useFetch(fetchNewsPosts);
  const posts = news.data ?? [];
  const topStory = posts[0];
  const rest = posts.slice(1);

  const [activeCategory, setActiveCategory] = useState("all");

  const categories = useMemo(() => {
    const counts = {};
    const labels = {};
    for (const p of posts) {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
      labels[p.category] = p.categoryLabel;
    }
    return [
      { key: "all", label: "All", count: posts.length },
      ...Object.keys(counts).map((key) => ({ key, label: labels[key], count: counts[key] })),
    ];
  }, [posts]);

  const filteredRest = activeCategory === "all" ? rest : rest.filter((p) => p.category === activeCategory);
  const activeLabel = categories.find((c) => c.key === activeCategory)?.label ?? activeCategory;

  return (
    <>
      <PageHero
        title="Keeping the Mnadani community informed."
        lead="Official announcements, examination results, and event updates from the school administration, published here as they happen."
      />

      <Section>
        {news.loading && <FeaturedSkeleton />}

        {!news.loading && news.error && (
          <PlaceholderNote>
            This section couldn't be loaded right now — please check back soon.
          </PlaceholderNote>
        )}

        {!news.loading && !news.error && posts.length === 0 && (
          <div
            className="rounded-2xl px-6 py-10 text-center"
            style={{ border: "1px dashed #b9d8ec", background: C.blueTintSoft }}
          >
            <p className="text-sm" style={{ color: C.inkSoft }}>
              No news posted yet — check back soon.
            </p>
          </div>
        )}

        {!news.loading && !news.error && topStory && <FeaturedBanner post={topStory} />}
      </Section>

      {!news.loading && !news.error && posts.length > 0 && (
        <Section kicker="More updates" title="Recent posts" lead="Browse by category, or see everything the school has posted.">
          <div className="flex flex-wrap gap-2.5 mb-8">
            {categories.map((c) => (
              <CategoryChip
                key={c.key}
                label={c.label}
                count={c.count}
                active={activeCategory === c.key}
                onClick={() => setActiveCategory(c.key)}
              />
            ))}
          </div>

          {filteredRest.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredRest.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div
              className="rounded-2xl px-6 py-8 text-center"
              style={{ border: "1px dashed #b9d8ec", background: C.blueTintSoft }}
            >
              <p className="text-sm" style={{ color: C.inkSoft }}>
                {topStory?.category === activeCategory
                  ? <>All caught up — the top story above already covers <strong>{activeLabel}</strong>.</>
                  : <>No other updates in <strong>{activeLabel}</strong> yet.</>}
              </p>
            </div>
          )}
        </Section>
      )}

      {news.loading && (
        <Section kicker="More updates" title="Recent posts">
          <GridSkeleton />
        </Section>
      )}
    </>
  );
}
