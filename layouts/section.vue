<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground, isImageBackground } from '../layout-helper'

const props = withDefaults(
  defineProps<{ background?: string }>(),
  { background: '' },
)
const style = computed(() => handleBackground(props.background, true))
</script>

<template>
  <!-- `cover` for the shared title styling, `section` for the section-specific rules -->
  <div class="slidev-layout cover section" :class="{ 'on-image': isImageBackground(background) }" :style="style">
    <div class="my-auto w-full">
      <slot />
    </div>
    <div class="cover-bar h-75px" />
  </div>
</template>
