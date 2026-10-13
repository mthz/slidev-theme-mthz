<script setup lang="ts">
// A video that plays from the local file in the live lecture and turns into a still + links in the PDF export
// (the handout for students): local videos are never committed and a PDF can't play them anyway.
// Usage: <LectureVideo src="/lectures/…/clip.mp4" poster="/lectures/…/clip.jpg"
//          export-poster="/lectures/…/thumb.jpg" youtube="MbcEuVy-O6k" link="https://…" link-label="Article" />
//   live:   <video> of `src` (poster shown until play)
//   export: `exportPoster` (else `poster`), clickable to the YouTube video if `youtube` is set, plus `link`
import { useNav } from '@slidev/client'
import { computed } from 'vue'
import { resolveAssetUrl } from '../layout-helper'

const props = defineProps<{
  src: string
  poster?: string
  exportPoster?: string
  youtube?: string
  link?: string
  linkLabel?: string
}>()

const { isPrintMode } = useNav()

const youtubeUrl = computed(() => (props.youtube ? `https://www.youtube.com/watch?v=${props.youtube}` : ''))
const posterUrl = computed(() => (props.poster ? resolveAssetUrl(props.poster) : undefined))
const stillUrl = computed(() => resolveAssetUrl(props.exportPoster || props.poster || ''))
</script>

<template>
  <div class="lecture-video">
    <template v-if="isPrintMode">
      <a v-if="youtubeUrl" :href="youtubeUrl" target="_blank" class="still">
        <img :src="stillUrl" />
        <span class="play"><mdi-play /></span>
      </a>
      <img v-else :src="stillUrl" class="still" />
      <div v-if="youtubeUrl || link" class="links">
        <a v-if="youtubeUrl" :href="youtubeUrl" target="_blank"><mdi-youtube /> {{ youtubeUrl }}</a>
        <a v-if="link" :href="link" target="_blank"><mdi-newspaper-variant-outline /> {{ linkLabel || link }}</a>
      </div>
    </template>
    <video v-else :src="resolveAssetUrl(src)" :poster="posterUrl" controls muted preload="metadata" />
  </div>
</template>

<style scoped>
.lecture-video video,
.lecture-video .still,
.lecture-video .still img {
  display: block;
  width: 100%;
  border-radius: 0.3rem;
}
.still {
  position: relative;
}
.play {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 3.5rem;
  height: 2.5rem;
  border-radius: 0.6rem;
  background: rgba(220, 0, 0, 0.9);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}
.links {
  margin-top: 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  font-size: 0.65rem;
}
.links a {
  color: var(--slidev-theme-accent, #038ccb);
  word-break: break-all;
}
</style>
