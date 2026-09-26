import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Info, Trophy } from "lucide-react";
import { C, serif } from "../config/theme";
import { AlbumLightbox, ViewPhotosButton } from "./Albums";

export function Button({ children, variant = "primary", to, className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold text-sm px-6 py-3 " +
    "transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-offset-2 focus-visible:ring-[#1D6FA8] disabled:opacity-60 disabled:cursor-not-allowed " +
    "disabled:hover:shadow-sm disabled:hover:brightness-100 disabled:active:scale-100";
  const variantClass =
    variant === "primary"
      ? "shadow-sm hover:shadow-md hover:brightness-[1.08]"
      : "hover:bg-[#EEF7FC]";
  const style =
    variant === "primary"
      ? { background: C.blue, color: C.white }
      : { border: `1.5px solid ${C.line}`, background: C.white, color: C.ink };

  const classes = `${base} ${variantClass} ${className}`;
  if (to) {
    return (
      <Link to={to} className={classes} style={style} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} style={style} {...props}>
      {children}
    </button>
  );
}

export function Crest({ size = 38 }) {
  const stroke = C.crestMaroon;
  return (
    <svg width={size} height={size * 1.12} viewBox="0 0 64 72" className="flex-shrink-0">
      <path d="M4 6 H60 V38 C60 56 32 68 32 68 C32 68 4 56 4 38 Z" fill={C.white} stroke={stroke} strokeWidth="2" />

      <path d="M32 8 V60 M6 34 H58" stroke={stroke} strokeWidth="1.4" opacity="0.85" />

      <path
        d="M18 24 L9 21 L9 14 L18 17 L27 14 L27 21 Z M18 17 V24"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12.5 17.3 L15.5 18.3 M20.5 18.3 L23.5 17.3" stroke={stroke} strokeWidth="1" opacity="0.75" />

      <circle cx="44" cy="18" r="6" fill="none" stroke={stroke} strokeWidth="1.5" />
      <circle cx="48.5" cy="15" r="2.3" fill={stroke} />
      <path d="M44 24 V26" stroke={stroke} strokeWidth="1.3" />
      <path d="M39 26 H49 V31 H39 Z M39 28.5 H49" fill="none" stroke={stroke} strokeWidth="1.3" strokeLinejoin="round" />

      <path d="M13 52 L24 39" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M9.5 56.5 L13 52 L15.2 53.8 Z" fill={stroke} />

      <path d="M46 41 Q44 36 48.5 35" fill="none" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="40" cy="44" r="2.6" fill={stroke} /><circle cx="46" cy="44" r="2.6" fill={stroke} /><circle cx="52" cy="44" r="2.6" fill={stroke} />
      <circle cx="43" cy="49" r="2.6" fill={stroke} /><circle cx="49" cy="49" r="2.6" fill={stroke} />
      <circle cx="46" cy="54" r="2.6" fill={stroke} />
    </svg>
  );
}

export function Kicker({ children }) {
  return (
    <div className="text-sm font-semibold mb-2" style={{ color: C.blueDeep }}>
      {children}
    </div>
  );
}

export function Tag({ children }) {
  return (
    <span
      className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
      style={{ color: C.blueDeep, background: C.blueTint }}
    >
      {children}
    </span>
  );
}

export function CategoryChip({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1D6FA8]"
      style={
        active
          ? { background: C.blueDeep, color: "#fff", boxShadow: "0 2px 8px rgba(18,79,128,0.25)" }
          : { background: C.white, color: C.inkSoft, border: `1px solid ${C.line}` }
      }
    >
      {label}
      <span
        className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px]"
        style={active ? { background: "rgba(255,255,255,0.22)" } : { background: C.blueTintSoft, color: C.blueDeep }}
      >
        {count}
      </span>
    </button>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-300 ${className}`}
      style={{ background: C.white, border: `1px solid ${C.line}` }}
    >
      {children}
    </div>
  );
}

export function PageHero({ eyebrow, title, lead }) {
  return (
    <div
      className="pt-12 pb-14 md:pt-16 md:pb-20 px-6"
      style={{ background: C.blueTintSoft, borderBottom: `1px solid ${C.line}` }}
    >
      <div className="max-w-5xl mx-auto">
        {eyebrow && (
          <div className="flex items-center gap-2 text-sm font-semibold mb-4" style={{ color: C.blueDeep }}>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: C.gold }} />
            {eyebrow}
          </div>
        )}
        <h1
          className="font-semibold leading-tight max-w-3xl text-[clamp(2rem,4.5vw+0.5rem,3rem)]"
          style={serif}
        >
          {title}
        </h1>
        {lead && (
          <p className="mt-5 text-base sm:text-lg max-w-2xl" style={{ color: C.inkSoft }}>
            {lead}
          </p>
        )}
      </div>
    </div>
  );
}

export function Section({ id, kicker, title, lead, children, band = false }) {
  return (
    <section
      id={id}
      className="py-12 md:py-16 px-6"
      style={
        band
          ? { background: C.blueTintSoft, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }
          : {}
      }
    >
      <div className="max-w-5xl mx-auto">
        {title && (
          <div className="mb-8 md:mb-10 max-w-2xl">
            {kicker && <Kicker>{kicker}</Kicker>}
            <h2 className="text-2xl sm:text-3xl font-semibold leading-snug" style={serif}>
              {title}
            </h2>
            {lead && (
              <p className="mt-3" style={{ color: C.inkSoft }}>
                {lead}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export function MottoStrip() {
  return (
    <div className="px-6 py-7" style={{ background: C.blueTint, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-5 md:gap-12 items-center justify-center text-center">
        <div>
          <div className="text-xs font-semibold" style={{ color: C.blueDeep }}>School Motto</div>
          <div className="font-semibold text-lg" style={serif}>&ldquo;Academic and Discipline Excellency&rdquo;</div>
        </div>
        <div className="hidden md:block w-px h-9" style={{ background: C.line }} />
        <div>
          <div className="text-xs font-semibold" style={{ color: C.blueDeep }}>Vision</div>
          <div className="font-semibold text-lg" style={serif}>&ldquo;Come to Learn, Go to Serve&rdquo;</div>
        </div>
      </div>
    </div>
  );
}

export function InitialsAvatar({ initials, size = 44, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 rounded-full mb-3.5 ${className}`}
      style={{
        width: size, height: size,
        background: `linear-gradient(155deg, ${C.blue} 0%, ${C.blueDeep} 100%)`,
        color: C.white, fontWeight: 600, fontSize: size * 0.32, ...serif,
      }}
    >
      {initials}
    </div>
  );
}

export function PhotoAvatar({ src, alt, size = 56, initials, className = "" }) {
  const [broken, setBroken] = useState(false);
  const showImage = Boolean(src) && !broken;

  if (showImage) {
    return (
      <div
        className={`flex items-center justify-center flex-shrink-0 rounded-full mb-3.5 overflow-hidden ${className}`}
        style={{ width: size, height: size, background: C.blueTint }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" onError={() => setBroken(true)} />
      </div>
    );
  }

  if (initials) {
    return <InitialsAvatar initials={initials} size={size} className={className} />;
  }

  return (
    <div
      className={`flex items-center justify-center flex-shrink-0 rounded-full mb-3.5 overflow-hidden ${className}`}
      style={{ width: size, height: size, background: C.blueTint, border: "1.5px dashed #b9d8ec" }}
    >
      <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 24 24" fill="none" stroke={C.blueDeep} strokeWidth="1.6">
        <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    </div>
  );
}

export function PlaceholderNote({ children }) {
  return (
    <div
      className="mt-6 flex items-start gap-2.5 rounded-xl px-4 py-3"
      style={{ border: "1px dashed #b9d8ec", background: C.blueTintSoft }}
    >
      <Info size={15} className="mt-0.5 flex-shrink-0" style={{ color: C.blueDeep }} />
      <p className="text-xs" style={{ color: C.inkSoft }}>{children}</p>
    </div>
  );
}

export function AwardCard({ title, meta, body, image, extraPhotos = [] }) {
  const [broken, setBroken] = useState(false);
  const [viewing, setViewing] = useState(false);
  const showImage = Boolean(image) && !broken;
  const allPhotos = [...(showImage ? [{ id: "cover", src: image, caption: "" }] : []), ...extraPhotos];

  const photoViewer = extraPhotos.length > 0 && (
    <>
      <ViewPhotosButton count={allPhotos.length} onClick={() => setViewing(true)} />
      {viewing && (
        <AlbumLightbox album={{ name: title, icon: Trophy, photos: allPhotos }} onClose={() => setViewing(false)} />
      )}
    </>
  );

  const TrophyIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.blueDeep} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5H5a2 2 0 0 0 0 4h.5M16 5h3a2 2 0 0 1 0 4h-.5" />
      <path d="M10 14v2M14 14v2M8 20h8M10 16h4v4h-4z" />
    </svg>
  );

  if (showImage) {
    return (
      <div
        className="rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
        style={{ background: C.white, border: `1px solid ${C.line}` }}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-36 object-cover"
          onError={() => setBroken(true)}
        />
        <div className="p-5">
          <div className="font-semibold text-[15px]">{title}</div>
          <div className="text-xs mt-0.5" style={{ color: C.inkSoft }}>{meta}</div>
          <div className="text-sm mt-1.5" style={{ color: C.inkSoft }}>{body}</div>
          {photoViewer}
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-5 flex gap-3.5 items-start"
      style={{ background: C.white, border: "1px dashed #b9d8ec" }}
    >
      <div className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: C.blueTint }}>
        <TrophyIcon />
      </div>
      <div>
        <div className="font-semibold text-[15px]">{title}</div>
        <div className="text-xs mt-0.5" style={{ color: C.inkSoft }}>{meta}</div>
        <div className="text-sm mt-1.5" style={{ color: C.inkSoft }}>{body}</div>
        {photoViewer}
      </div>
    </div>
  );
}
