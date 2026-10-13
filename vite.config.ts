import type { Plugin } from 'vite'
import { defineConfig } from 'vite'

// Workaround for Vite 8 + Windows: Slidev's virtual modules (conditional-styles,
// layouts, global-layers, setups) use import.meta.glob; on Windows, Vite emits an
// import URL that concatenates the project root with the file's drive-lettered
// absolute path ("../Users/.../deck/C:/Users/.../file.ts"). This pre-resolver
// intercepts that shape (any URL with /<DRIVE>:/ mid-path) and returns the bare
// absolute path, which Vite then serves via /@fs/. Slidev merges this config into
// every deck that uses the theme. Remove once Vite fixes the URL emission on Windows.
const fixWindowsDriveLetterUrls: Plugin = {
  name: 'fix-windows-drive-letter-urls',
  enforce: 'pre',
  resolveId(id) {
    const m = id.match(/\/([A-Z]:\/.*)$/i)
    if (m && !id.startsWith('/@fs/'))
      return m[1]
    return null
  },
}

export default defineConfig({
  plugins: [fixWindowsDriveLetterUrls],
  server: {
    fs: {
      // Slidev's slide-import-guard resolves public-dir refs like "/img/x.png" to the
      // drive root on Windows and rejects them; non-strict mode skips the guard.
      // Vite still serves only files under the project root.
      strict: false,
    },
  },
})
