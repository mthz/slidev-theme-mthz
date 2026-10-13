<script setup lang="ts">
// <pdf src="/paper.pdf" :page="3" />
import { resolveAssetUrl } from '../layout-helper'

defineProps<{
  src: string
  page?: number | string
}>()
</script>

<template>
  <embed
    :src="`${resolveAssetUrl(src)}${page ? `#page=${page}` : ''}`"
    class="relative h-full w-full"
    type="application/pdf"
  >
</template>
