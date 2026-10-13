<script setup lang="ts">
// layout: questions — frontmatter: duration (e.g. "5 min"), label (overrides the badge text)
defineProps<{ duration?: string, label?: string }>()
</script>

<template>
  <BlockLayout kind="questions" :label="label ?? 'Check your understanding'" :duration="duration">
    <slot />
  </BlockLayout>
</template>
