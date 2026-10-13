<script setup lang="ts">
// layout: exercise — frontmatter: duration (e.g. "5 min"), label (overrides the badge text)
defineProps<{ duration?: string, label?: string }>()
</script>

<template>
  <BlockLayout kind="exercise" :label="label ?? 'Exercise'" :duration="duration">
    <slot />
  </BlockLayout>
</template>
