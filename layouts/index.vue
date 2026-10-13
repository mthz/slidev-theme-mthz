<script setup lang="ts">
// layout: index — numbered list for references, literature, image sources, figure lists.
// Slot: heading / intro text above the list.
// Frontmatter:
//   entries: list of
//     title   (required)  main line, bold
//     detail              second line (authors, publisher, year …), muted
//     key                 label shown instead of the running number, e.g. Smith20 → [Smith20]
//     uri                 slide number (or route alias) → jumps to that slide,
//                         URL (http…) → opens in a new tab
//     image               thumbnail left of the entry (book cover, figure preview)
//   numbered: false to hide numbers / keys
import { computed } from 'vue'
import { resolveAssetUrl } from '../layout-helper'

interface Entry {
  title: string
  detail?: string
  key?: string
  uri?: number | string
  image?: string
}

const props = withDefaults(
  defineProps<{ entries?: Entry[], numbered?: boolean }>(),
  { entries: () => [], numbered: true },
)

const isExternal = (uri: Entry['uri']) => typeof uri === 'string' && /^[a-z][a-z\d+.-]*:/i.test(uri)
const hasImages = computed(() => props.entries.some(e => e.image))
</script>

<template>
  <div class="slidev-layout index-layout">
    <slot />
    <ol class="index-list" :class="{ 'with-images': hasImages }">
      <li v-for="(entry, i) in entries" :key="i" class="index-entry">
        <span v-if="numbered" class="index-key">[{{ entry.key ?? i + 1 }}]</span>
        <img v-if="entry.image" class="index-image" :src="resolveAssetUrl(entry.image)" alt="">
        <div class="index-text">
          <div class="index-title">
            <a v-if="isExternal(entry.uri)" :href="String(entry.uri)" target="_blank" rel="noopener">{{ entry.title }}</a>
            <Link v-else-if="entry.uri != null" :to="entry.uri">{{ entry.title }}</Link>
            <template v-else>{{ entry.title }}</template>
          </div>
          <div v-if="entry.detail" class="index-detail">{{ entry.detail }}</div>
        </div>
      </li>
    </ol>
  </div>
</template>
