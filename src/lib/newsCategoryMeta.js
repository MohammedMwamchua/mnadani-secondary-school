import { Megaphone, Trophy, CalendarDays, Newspaper } from "lucide-react";
import { categoryAccent } from "./newsCategoryColor";

const ICONS = {
  announcement: Megaphone,
  results: Trophy,
  event: CalendarDays,
};

export function newsCategoryMeta(categoryKey, categoryLabel) {
  return {
    icon: ICONS[categoryKey] ?? Newspaper,
    label: categoryLabel || categoryKey || "Update",
    accent: categoryAccent(categoryKey || ""),
  };
}
