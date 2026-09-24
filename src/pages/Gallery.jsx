import React, { useEffect, useMemo, useState } from "react";
import { Building2, BookOpen, Trophy, GraduationCap, Music, Users, Layers, Briefcase, Camera, Video, X } from "lucide-react";
import { C, serif } from "../config/theme";
import { Section, PageHero, PlaceholderNote, CategoryChip } from "../components/ui";
import { useFetch } from "../lib/useFetch";
import { fetchGalleryAlbums } from "../lib/api";

const CATEGORY_ICONS = {
  campus: Building2,
  classrooms: BookOpen,
  sports: Trophy,
  graduation: GraduationCap,
  cultural: Music,
  assembly: Users,
  clubs: Layers,
  staff: Briefcase,
};

function AlbumCard({ album, onOpen }) {
  const [broken, setBroken] = useState(false);
  const Icon = CATEGORY_ICONS[album.category] ?? Building2;
  const showCover = Boolean(album.cover) && !broken;
  const hasMedia = album.photoCount > 0 || album.videoCount > 0;

  return (
    <button
      type="button"
      onClick={() => onOpen(album)}
      className="group relative aspect-square rounded-2xl overflow-hidden text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1D6FA8]"
      style={{ border: `1px solid ${C.line}` }}
    >
      {showCover ? (
        <img
          src={album.cover}
          alt={album.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setBroken(true)}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: `linear-gradient(155deg, ${C.blueTint}, ${C.blueTintSoft})` }}
        >
          <Icon size={30} color={C.blueDeep} style={{ opacity: 0.5 }} />
        </div>
      )}
      <div
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-90"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 42%, rgba(10,25,35,0.75) 100%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="block text-white font-semibold text-sm leading-tight" style={serif}>{album.name}</span>
        <div className="flex items-center gap-3 mt-1.5">
          {album.photoCount > 0 && (
            <span className="flex items-center gap-1 text-[11px]" style={{ color: "rgba(255,255,255,0.85)" }}>
              <Camera size={11} /> {album.photoCount}
            </span>
          )}
          {album.videoCount > 0 && (
            <span className="flex items-center gap-1 text-[11px]" style={{ color: "rgba(255,255,255,0.85)" }}>
              <Video size={11} /> {album.videoCount}
            </span>
          )}
          {!hasMedia && (
            <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.7)" }}>No media yet</span>
          )}
        </div>
      </div>
    </button>
  );
}

function AlbumLightbox({ album, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const Icon = CATEGORY_ICONS[album.category] ?? Building2;
  const isEmpty = album.photos.length === 0 && album.videos.length === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6"
      style={{ background: "rgba(10,20,30,0.72)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl shadow-2xl"
        style={{ background: C.white }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-7 py-4 sm:py-5"
          style={{ background: C.white, borderBottom: `1px solid ${C.line}` }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.blueTint }}>
              <Icon size={17} color={C.blueDeep} />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-lg truncate" style={serif}>{album.name}</h3>
              <div className="text-xs" style={{ color: C.inkSoft }}>
                {album.photoCount} photo{album.photoCount === 1 ? "" : "s"}
                {album.videoCount > 0 && ` · ${album.videoCount} video${album.videoCount === 1 ? "" : "s"}`}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 hover:bg-[#EEF7FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D6FA8]"
            style={{ color: C.inkSoft }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 sm:p-7">
          {isEmpty && (
            <div className="rounded-2xl px-6 py-10 text-center" style={{ border: "1px dashed #b9d8ec", background: C.blueTintSoft }}>
              <p className="text-sm" style={{ color: C.inkSoft }}>
                No photos or videos in this album yet.
              </p>
            </div>
          )}

          {album.photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {album.photos.map((p) => (
                <div key={p.id} className="relative aspect-square rounded-xl overflow-hidden" style={{ background: C.blueTintSoft }}>
                  <img src={p.src} alt={p.caption || album.name} className="w-full h-full object-cover" />
                  {p.caption && (
                    <span
                      className="absolute bottom-0 left-0 right-0 px-2 py-1.5 text-[11px] leading-tight text-white"
                      style={{ background: "linear-gradient(180deg, rgba(0,0,0,0), rgba(10,25,35,0.78))" }}
                    >
                      {p.caption}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {album.videos.length > 0 && (
            <div className={album.photos.length > 0 ? "mt-7" : ""}>
              {album.photos.length > 0 && (
                <div className="text-xs font-semibold mb-3" style={{ color: C.blueDeep }}>Videos</div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                {album.videos.map((v) => (
                  <div key={v.id} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${C.line}` }}>
                    <video src={v.src} controls preload="metadata" className="w-full aspect-video bg-black" />
                    {v.caption && (
                      <div className="px-3 py-2 text-xs" style={{ color: C.inkSoft }}>{v.caption}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-pulse">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-2xl" style={{ background: C.blueTint }} />
      ))}
    </div>
  );
}

export default function Gallery() {
  const gallery = useFetch(fetchGalleryAlbums);
  const albums = gallery.data ?? [];
  const [activeCategory, setActiveCategory] = useState("all");
  const [openAlbum, setOpenAlbum] = useState(null);

  const categories = useMemo(() => {
    const counts = {};
    const labels = {};
    for (const a of albums) {
      counts[a.category] = (counts[a.category] ?? 0) + 1;
      labels[a.category] = a.categoryLabel;
    }
    return [
      { key: "all", label: "All", count: albums.length },
      ...Object.keys(counts).map((key) => ({ key, label: labels[key], count: counts[key] })),
    ];
  }, [albums]);

  const filtered = activeCategory === "all" ? albums : albums.filter((a) => a.category === activeCategory);

  return (
    <>
      <PageHero
        title="Moments from around the school."
        lead="Photos and short videos from campus life, events, and everyday moments — browse by category or open an album to see everything inside."
      />
      <Section>
        {gallery.loading && <GallerySkeleton />}

        {!gallery.loading && gallery.error && (
          <PlaceholderNote>
            This section couldn't be loaded right now — please check back soon.
          </PlaceholderNote>
        )}

        {!gallery.loading && !gallery.error && albums.length === 0 && (
          <div
            className="rounded-2xl px-6 py-10 text-center"
            style={{ border: "1px dashed #b9d8ec", background: C.blueTintSoft }}
          >
            <p className="text-sm" style={{ color: C.inkSoft }}>
              Photo and video albums are coming soon.
            </p>
          </div>
        )}

        {!gallery.loading && !gallery.error && albums.length > 0 && (
          <>
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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filtered.map((a) => (
                <AlbumCard key={a.id} album={a} onOpen={setOpenAlbum} />
              ))}
            </div>
          </>
        )}
      </Section>

      {openAlbum && <AlbumLightbox album={openAlbum} onClose={() => setOpenAlbum(null)} />}
    </>
  );
}
