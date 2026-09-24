export const PAGE_PATHS = {
  home: "/",
  about: "/about",
  history: "/history",
  academics: "/academics",
  students: "/students",
  news: "/news",
  alumni: "/alumni",
  alumniSubmit: "/alumni/submit",
  gallery: "/gallery",
  contact: "/contact",
};

export function pathFor(id) {
  return PAGE_PATHS[id] ?? "/";
}
