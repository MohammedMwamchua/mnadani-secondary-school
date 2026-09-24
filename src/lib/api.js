const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api").replace(/\/+$/, "");

async function getList(path, params) {
  const qs = params ? `?${new URLSearchParams(params).toString()}` : "";
  const res = await fetch(`${API_BASE_URL}/${path}/${qs}`);
  if (!res.ok) throw new Error(`Request to ${path} failed (${res.status})`);
  const data = await res.json();
  return Array.isArray(data) ? data : data.results ?? [];
}

async function getOne(path) {
  const res = await fetch(`${API_BASE_URL}/${path}/`);
  if (!res.ok) throw new Error(`Request to ${path} failed (${res.status})`);
  return res.json();
}

export async function fetchHistoryEvents() {
  const rows = await getList("history-events");
  return rows.map((e) => ({ id: e.id, mark: e.year, title: e.title, body: e.description, photo: e.photo }));
}

export async function fetchHeadteachers() {
  const rows = await getList("headteachers");
  return rows.map((h) => ({
    id: h.id, period: h.period_label, initials: h.initials, name: h.name, note: h.story, photo: h.photo,
  }));
}

export async function fetchNotableTeachers() {
  const rows = await getList("notable-teachers");
  return rows.map((t) => ({
    id: t.id, meta: t.meta_label, name: t.name, note: t.story, photo: t.photo,
  }));
}

export async function fetchAwards(category) {
  const rows = await getList("awards", { category });
  return rows.map((a) => ({ id: a.id, title: a.title, meta: a.meta, body: a.explanation, image: a.photo }));
}

export async function fetchNewsPosts(category) {
  const rows = await getList("news", category ? { category } : undefined);
  return rows.map((p) => ({
    id: p.id, title: p.title, date: p.date,
    category: p.category, categoryLabel: p.category_display,
    excerpt: p.summary, photo: p.cover_photo,
  }));
}

export async function fetchAlumni() {
  const rows = await getList("alumni");
  return rows.map((a) => {
    const now = a.current_role && a.organisation
      ? `${a.current_role} at ${a.organisation}`
      : a.current_role || a.organisation || "";
    return {
      id: a.id,
      name: a.full_name,
      year: a.year_finished,
      now,
      location: [a.city, a.country].filter(Boolean).join(", "),
      photo: a.photo,
      featured: a.featured,
      highlighted: a.highlighted,
      message: a.message_to_students,
      phone: a.phone,
    };
  });
}

export async function fetchGalleryAlbums(category) {
  const rows = await getList("gallery-albums", category ? { category } : undefined);
  return rows.map((a) => ({
    id: a.id,
    name: a.name,
    category: a.category,
    categoryLabel: a.category_display,
    cover: a.cover_photo,
    photoCount: a.photo_count,
    videoCount: a.video_count,
    photos: (a.photos ?? []).map((p) => ({ id: p.id, src: p.image, caption: p.caption })),
    videos: (a.videos ?? []).map((v) => ({ id: v.id, src: v.video, caption: v.caption })),
  }));
}

export async function submitAlumnus(fields) {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;
    formData.append(key, value);
  });

  const res = await fetch(`${API_BASE_URL}/alumni-submissions/`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    let detail = `Submission failed (${res.status})`;
    try {
      const errors = await res.json();
      detail = Object.entries(errors)
        .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(" ") : messages}`)
        .join(" ");
    } catch {
    }
    throw new Error(detail);
  }

  return res.json();
}

export async function fetchSiteInfo() {
  const s = await getOne("site-info");
  return {
    schoolName: s.school_name,
    vision: s.vision,
    motto: s.motto,
    mission: s.mission,
    introduction: s.introduction,
    headteacherMessage: s.headteacher_message,
    nectaCentreNumber: s.necta_centre_number,
    foundedYear: s.founded_year,
    schoolType: s.school_type,
    address: s.address,
    poBox: s.po_box,
    email: s.email,
    phone: s.phone,
    officeHours: s.office_hours,
    administeredBy: s.administered_by,
    signboardPhoto: s.entrance_signboard_photo,
  };
}

export async function fetchHomeBanner() {
  const rows = await getList("home-banner");
  return rows.map((b) => ({ id: b.id, title: b.title, text: b.text, photo: b.photo, alt: b.alt_text }));
}

export async function fetchQuickLinks() {
  const rows = await getList("quick-links");
  return rows.map((q) => ({ id: q.id, title: q.title, text: q.text, photo: q.photo, path: q.link_path }));
}

export async function fetchSubjects() {
  const rows = await getList("subjects");
  return rows.map((s) => ({ id: s.id, tag: s.tag, title: s.title, body: s.description, photo: s.photo }));
}

export async function fetchClubActivities() {
  const rows = await getList("club-activities");
  return rows.map((c) => ({
    id: c.id, tag: c.tag, title: c.title, body: c.description,
    achievements: c.achievements, photo: c.cover_photo,
  }));
}

export async function submitContactMessage(fields) {
  const res = await fetch(`${API_BASE_URL}/contact-messages/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });

  if (!res.ok) {
    let detail = `Message failed to send (${res.status})`;
    try {
      const errors = await res.json();
      detail = Object.entries(errors)
        .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(" ") : messages}`)
        .join(" ");
    } catch {
    }
    throw new Error(detail);
  }

  return res.json();
}
