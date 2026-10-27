<script setup lang="ts">
import { resolveAssetUrl } from '../layout-helper'

defineProps<{
  src: string
  caption?: string
  cite?: string
  title?: string
  width?: number | string
}>()
</script>

<template>
  <figure class="flex flex-col items-center justify-center">
    <h4 v-if="title">{{ title }}</h4>
    <img
      :alt="caption ?? title ?? ''"
      class="max-h-95"
      :src="resolveAssetUrl(src)"
      :width="width"
    />
    <figcaption v-if="cite" class="mt-0 cite">
      {{ cite }}
    </figcaption>
    <figcaption v-if="caption" class="caption text-center">
      {{ caption }}
    </figcaption>
  </figure>
</template>
