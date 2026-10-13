<script setup lang="ts">
// Page-number footer in the cover-bar style.
// A per-slide layer (not global-bottom) so every slide shows its own number in
// PDF/PNG export and the overview, not the number of the current slide.
// cover / end: no footer. Layouts with edge-to-edge images or iframes: number only,
// so the bar doesn't cut into the picture.
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const NONE = ['cover', 'end']
const NUMBER_ONLY = ['image', 'image-left', 'image-right', 'full', 'iframe', 'iframe-left', 'iframe-right']

const { $page, $frontmatter } = useSlideContext()
const layout = computed(() => $frontmatter.layout ?? ($page.value === 1 ? 'cover' : 'default'))
</script>

<template>
  <template v-if="!NONE.includes(layout)">
    <div v-if="NUMBER_ONLY.includes(layout)" class="page-number-only">
      {{ $page }}
    </div>
    <footer v-else class="cover-bar py-0.5 px-1 text-sm justify-end">
      {{ $page }}
    </footer>
  </template>
</template>
