/// <reference types="astro/client" />

// HTML forms support rel=noopener/noreferrer for target=_blank; keep this protection
// while Astro's form attribute types catch up with the HTML standard.
declare namespace astroHTML.JSX {
  interface FormHTMLAttributes {
    rel?: string;
  }
}
