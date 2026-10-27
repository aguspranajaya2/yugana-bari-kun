import { SITE_URL, TOUR_IDS } from '../data/site';
import { localizedPath, type Locale } from '../i18n/index';
export const prerender = true;
export function GET() {
  const paths = ['/',...TOUR_IDS.map(slug=>`/pages/${slug}`),'/privacy'];
  const locales:Locale[] = ['en','ja'];
  const entries = paths.flatMap(path=>locales.map(lang=>{
    const links = [...locales,'x-default'].map(locale=>`<xhtml:link rel="alternate" hreflang="${locale}" href="${SITE_URL}${localizedPath(locale==='ja'?'ja':'en',path)}" />`).join('');
    return `<url><loc>${SITE_URL}${localizedPath(lang,path)}</loc>${links}</url>`;
  }));
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
