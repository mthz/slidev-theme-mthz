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
  <div class="slidev-layout intro" :class="{ 'on-image': isImageBackground(background) }" :style="style">
    <div class="my-auto">
      <slot />
    </div>
    <div class="cover-bar h-75px" />
  </div>
</template>
