// Loaded by Slidev from <theme>/setup/mermaid.ts. Mermaid diagrams in the theme's
// palette; colours follow themeConfig (accent, primary) when the deck sets them as
// hex colours. A per-diagram option such as ```mermaid {theme: 'neutral'} still wins.
// Plain default export instead of defineMermaidSetup(): see setup/shiki.ts.
const HEX = /^#[\da-f]{6}$/i

// --slidev-theme-<name> from the deck's themeConfig (set on <body>), else the fallback.
// Mermaid derives further colours from these, so only #rrggbb is accepted.
function themeColor(name: string, fallback: string) {
  if (typeof document === 'undefined')
    return fallback
  const value = getComputedStyle(document.body).getPropertyValue(`--slidev-theme-${name}`).trim()
  return HEX.test(value) ? value : fallback
}

// Mix a #rrggbb colour with white: share 0.15 → light tint.
function tint(hex: string, share: number) {
  const ch = (i: number) => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16)
    return Math.round(255 - (255 - c) * share).toString(16).padStart(2, '0')
  }
  return `#${ch(1)}${ch(3)}${ch(5)}`
}

export default () => {
  const accent = themeColor('accent', '#038ccb')
  const primary = themeColor('primary', '#3ab9d5')
  return {
    theme: 'base',
    look: 'classic',
    themeVariables: {
      // Mermaid 12 draws node borders as a colour gradient and adds a grey drop shadow;
      // flat shapes read better on slides and in the PDF.
      useGradient: false,
      dropShadow: 'none',
      fontFamily: '"Avenir Next", "Nunito Sans Variable", sans-serif',
      primaryColor: tint(primary, 0.15),
      primaryBorderColor: accent,
      primaryTextColor: '#1f2937',
      secondaryColor: '#f3f4f6',
      tertiaryColor: '#ffffff',
      lineColor: '#294380',
      edgeLabelBackground: '#ffffff',
      clusterBkg: '#f8fafc',
      clusterBorder: '#cbd5e1',
      noteBkgColor: '#fff8e1',
      noteBorderColor: '#ff9100',
    },
  }
}
