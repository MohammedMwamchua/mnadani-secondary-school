const GOOGLE_MAPS = "https://www.google.com/maps";

export function schoolMapLinks(info) {
  const loc = info?.mapLocation;
  const target = loc
    ? `${loc.lat},${loc.lng}`
    : [info?.schoolName || "Mnadani Secondary School", info?.address].filter(Boolean).join(", ");
  const q = encodeURIComponent(target);
  return {
    view: `${GOOGLE_MAPS}/search/?api=1&query=${q}`,
    directions: `${GOOGLE_MAPS}/dir/?api=1&destination=${q}`,
  };
}
