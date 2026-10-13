<script setup lang="ts">
import { resolveAssetUrl } from '../layout-helper'

withDefaults(
  defineProps<{
    imageHeader?: string
    imageRight?: string
    hideFrame?: boolean
  }>(),
  { hideFrame: false },
)
</script>

<template>
  <div class="slidev-layout intro relative grid grid-cols-12">
    <div class="my-auto col-span-6 grid grid-cols-12">
      <div v-if="imageHeader" class="image col-span-8">
        <img :src="resolveAssetUrl(imageHeader)" alt="" />
      </div>
      <div class="col-span-12">
        <slot />
      </div>
    </div>
    <div v-if="imageRight" class="my-auto col-span-6 h-full">
      <div class="image">
        <img :src="resolveAssetUrl(imageRight)" alt="" />
      </div>
    </div>
  </div>
</template>
