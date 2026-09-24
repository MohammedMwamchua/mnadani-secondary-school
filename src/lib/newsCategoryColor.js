import { C } from "../config/theme";

const PALETTE = [
  { solid: C.blue, deep: C.blueDeep, tint: C.blueTint },
  { solid: C.gold, deep: "#A9791F", tint: "#F6EDD9" },
  { solid: C.blueDeep, deep: "#0B3A5C", tint: C.blueTint },
];

export function categoryAccent(category = "") {
  let hash = 0;
  for (let i = 0; i < category.length; i++) hash = (hash * 31 + category.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}
