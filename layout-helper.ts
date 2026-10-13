import type { CSSProperties } from 'vue'

/**
 * Resolve urls from frontmatter and append with the base url
 */
export function resolveAssetUrl(url: string) {
  if (url.startsWith('/'))
    return import.meta.env.BASE_URL + url.slice(1)
  return url
}

const COLOR_PREFIXES = ['#', 'rgb', 'hsl', 'oklch', 'oklab', 'lab', 'lch', 'color(', 'var(']
const GRADIENT = /^(repeating-)?(linear|radial|conic)-gradient\(/

/**
 * True when `background:` is an image url (not a color or gradient). Layouts add the
 * `on-image` class then, so inline elements adapt to the white text.
 */
export function isImageBackground(background?: string): boolean {
  return !!background
    && !COLOR_PREFIXES.some(p => background.startsWith(p))
    && !GRADIENT.test(background)
}

/**
 * `background:` frontmatter → style. Accepts a CSS color, a gradient or an image url.
 * Images get white text; `dim` darkens them so the text stays readable.
 */
export function handleBackground(background?: string, dim = false): CSSProperties {
  if (!background)
    return {}

  if (COLOR_PREFIXES.some(p => background.startsWith(p)))
    return { background }

  if (GRADIENT.test(background))
    return { backgroundImage: background }

  const url = `url("${resolveAssetUrl(background)}")`
  return {
    color: 'white',
    backgroundImage: dim ? `linear-gradient(#0005, #0008), ${url}` : url,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }
}
