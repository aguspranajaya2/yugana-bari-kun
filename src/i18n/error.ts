import type { Locale } from "./index";

const content = {
  "en": {
    "letSFindYourWayBack": "Let’s find your way back.",
    "thisPageCouldNotBeFoundYourBaliInspiration": "This page could not be found. Your Bali inspiration is still waiting.",
    "backToTheHomepage": "Back to the homepage ↗"
  },
  "ja": {
    "letSFindYourWayBack": "旅の続きは、ホームから。",
    "thisPageCouldNotBeFoundYourBaliInspiration": "このページは見つかりませんでした。ホームから、旅のヒントをお探しください。",
    "backToTheHomepage": "ホームへ戻る ↗"
  }
} as const;

export function getCopy(lang: Locale) { return content[lang]; }
