<script setup lang="ts">
// layout: cover — title slide.
// Slot: title (# …) and an optional subtitle paragraph right below it.
// Frontmatter: background (color / gradient / image url), image (picture on the right), imageAlt,
//   meta: true / false to force the info block on / off.
// Info block below the title, read from the root deck's headmatter (slide frontmatter overrides):
//   author, email, institution, semester, date.
// Shown by default only on the first slide and only when `author` is set, so closing
// "Thank you" covers and decks without that headmatter stay unchanged.
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import { handleBackground, isImageBackground, resolveAssetUrl } from '../layout-helper'

const props = withDefaults(
  defineProps<{
    background?: string
    image?: string
    imageAlt?: string
    meta?: boolean
    email?: string
    institution?: string
    semester?: string
    date?: string
  }>(),
  { background: '', meta: undefined },
)

const { $slidev, $page } = useSlideContext()
const style = computed(() => handleBackground(props.background, true))

const cfg = computed(() => $slidev.configs as Record<string, any>)
const author = computed(() => cfg.value.author as string | undefined)
const email = computed(() => props.email ?? cfg.value.email)
const place = computed(() =>
  [props.institution ?? cfg.value.institution, props.semester ?? cfg.value.semester, props.date ?? cfg.value.date]
    .filter(Boolean)
    .join(' · '),
)
const showMeta = computed(() => props.meta ?? ($page.value === 1 && !!author.value))
</script>

<template>
  <div class="slidev-layout cover" :class="{ 'on-image': isImageBackground(background) }" :style="style">
    <div class="cover-body" :class="{ 'with-image': image }">
      <div class="cover-content">
        <slot />
        <div v-if="showMeta" class="cover-meta">
          <div v-if="author" class="cover-author">{{ author }}</div>
          <div v-if="email" class="cover-email">{{ email }}</div>
          <div v-if="place" class="cover-place">{{ place }}</div>
        </div>
      </div>
      <div v-if="image" class="cover-image">
        <img :src="resolveAssetUrl(image)" :alt="imageAlt ?? ''">
      </div>
    </div>
    <div class="cover-bar h-75px" />
  </div>
</template>
