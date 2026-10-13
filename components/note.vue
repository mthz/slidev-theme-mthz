<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: 'info' | 'success' | 'warning' | 'failure' | 'tip' | 'quote'
    title?: string
  }>(),
  { label: 'info' },
)
</script>

<template>
  <div :class="['note', label]">
    <div v-if="title" class="title">{{ title }}</div>
    <div class="body">
      <slot />
    </div>
  </div>
</template>
