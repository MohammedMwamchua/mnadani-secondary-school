import React, { useMemo, useState } from "react";
import { C } from "../config/theme";
import { Section, PageHero, PlaceholderNote, CategoryChip } from "../components/ui";
import { AlbumCard, AlbumLightbox } from "../components/Albums";
import { useFetch } from "../lib/useFetch";
import { fetchGalleryAlbums } from "../lib/api";

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
