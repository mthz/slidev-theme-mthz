<script setup lang="ts">
// layout: recap — frontmatter: duration (e.g. "5 min"), label (overrides the badge text)
defineProps<{ duration?: string, label?: string }>()
</script>

<template>
  <BlockLayout kind="recap" :label="label ?? 'Recap'" :duration="duration">
    <slot />
  </BlockLayout>
</template>
