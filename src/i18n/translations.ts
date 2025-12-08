// ABOUTME: Translation strings for English and Japanese locales
// ABOUTME: Supports browser locale detection for i18n

export type Locale = "en" | "ja";

export const translations = {
  en: {
    fullGarden: "← full garden",
    fullHtmlGarden: "← back to HTML garden",
    planted: "planted",
    daysAgo: "days ago",
    on: "on",
    possessive: (name: string) => `${name}'s`,
    bouquet: "HTML Bouquet",
  },
  ja: {
    fullGarden: "← 庭園に戻る",
    fullHtmlGarden: "← HTML庭園に戻る",
    planted: "植えた",
    daysAgo: "日前",
    on: "",
    possessive: (name: string) => `${name}の`,
    bouquet: "HTMLブーケ",
  },
};

export function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";

  const browserLang = window.navigator.language;
  if (browserLang.startsWith("ja")) {
    return "ja";
  }
  return "en";
}
