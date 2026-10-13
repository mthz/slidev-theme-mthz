<script setup lang="ts">
// layout: end — closing slide in cover style (Slidev's built-in `end` is a black page).
// Slot: e.g. "# Thank you" plus contact line; empty slot → "Thank you".
// Frontmatter: background (color / gradient / image url).
import { computed } from 'vue'
import { handleBackground, isImageBackground } from '../layout-helper'

const props = withDefaults(
  defineProps<{ background?: string }>(),
  { background: '' },
)
const style = computed(() => handleBackground(props.background, true))
</script>

<template>
  <div class="slidev-layout cover end" :class="{ 'on-image': isImageBackground(background) }" :style="style">
    <div class="my-auto w-full text-center pb-[75px]">
      <slot>
        <h1>Thank you</h1>
      </slot>
    </div>
    <div class="cover-bar h-75px" />
  </div>
</template>
