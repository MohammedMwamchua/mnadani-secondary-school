import React, { useEffect, useId, useRef, useState } from "react";
import { Building2, BookOpen, Trophy, GraduationCap, Music, Users, Layers, Briefcase, Camera, Video, X } from "lucide-react";
import { C, serif } from "../config/theme";

export const CATEGORY_ICONS = {
  campus: Building2,
  classrooms: BookOpen,
  sports: Trophy,
  graduation: GraduationCap,
  cultural: Music,
  assembly: Users,
  clubs: Layers,
  staff: Briefcase,
};

export function AlbumCard({ album, onOpen }) {
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

export function ViewPhotosButton({ count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold rounded-md transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D6FA8]"
      style={{ color: C.blue }}
    >
      <Camera size={13} /> View {count} photo{count === 1 ? "" : "s"}
    </button>
  );
}

export function AlbumLightbox({ album, onClose }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    // Guarded because React StrictMode runs effects twice in development.
    if (!dialog.open) dialog.showModal();
  }, []);

  const closeOnBackdropClick = (e) => {
    // Browsers without closedby="any" (Safari) need backdrop clicks handled manually.
    if ("closedBy" in HTMLDialogElement.prototype) return;
    const dialog = dialogRef.current;
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    const inside = r.top <= e.clientY && e.clientY <= r.bottom && r.left <= e.clientX && e.clientX <= r.right;
    if (!inside) dialog.close();
  };

  const Icon = album.icon ?? CATEGORY_ICONS[album.category] ?? Building2;
  const photos = album.photos ?? [];
  const videos = album.videos ?? [];
  const isEmpty = photos.length === 0 && videos.length === 0;

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={closeOnBackdropClick}
      className="w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-4xl max-h-[92vh] m-auto p-0 border-0 overflow-y-auto rounded-2xl sm:rounded-3xl shadow-2xl backdrop:bg-[rgba(10,20,30,0.72)]"
      style={{ background: C.white, color: C.ink }}
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
            <h3 id={titleId} className="font-semibold text-lg truncate" style={serif}>{album.name}</h3>
            <div className="text-xs" style={{ color: C.inkSoft }}>
              {photos.length} photo{photos.length === 1 ? "" : "s"}
              {videos.length > 0 && ` · ${videos.length} video${videos.length === 1 ? "" : "s"}`}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => dialogRef.current.close()}
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

        {photos.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {photos.map((p) => (
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

        {videos.length > 0 && (
          <div className={photos.length > 0 ? "mt-7" : ""}>
            {photos.length > 0 && (
              <div className="text-xs font-semibold mb-3" style={{ color: C.blueDeep }}>Videos</div>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              {videos.map((v) => (
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
    </dialog>
  );
}
