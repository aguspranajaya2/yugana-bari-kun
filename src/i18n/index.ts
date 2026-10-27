export type Locale = 'en' | 'ja';
export function localize(lang: Locale, values: Record<Locale,string>): string { return values[lang]; }
export function localizedPath(lang: Locale, path = '/'): string {
  const cleanPath = path === '/' ? '' : path.replace(/\/$/, '');
  return lang === 'ja' ? `/ja${cleanPath}` : cleanPath || '/';
}
export function tourPath(lang: Locale, slug: string): string { return localizedPath(lang, `/pages/${slug}`); }
