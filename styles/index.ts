// Inherit Slidev's base layout styles, then layer our customisations.
// Remove the first import if you want full layout customisation.
import '@slidev/client/styles/layouts-base.css'

// Fonts are bundled (fonts.provider: none in package.json), so decks work offline.
// Variable fonts: every weight from one file per subset.
import '@fontsource-variable/nunito-sans/wght.css'
import '@fontsource-variable/nunito-sans/wght-italic.css'
import '@fontsource-variable/fira-code/wght.css'

import './layouts.css'
