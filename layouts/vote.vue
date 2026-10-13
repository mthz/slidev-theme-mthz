<script setup lang="ts">
// layout: vote — peer-instruction vote question (one per unit).
// Content: # question title, an optional lead-in paragraph, then a numbered list (1. … 4.)
// rendered as answer cards A–D. Frontmatter: label (overrides the badge text).
defineProps<{ label?: string }>()
</script>

<template>
  <BlockLayout kind="vote" :label="label ?? 'Vote'">
    <div class="vote-body">
      <slot />
    </div>
  </BlockLayout>
</template>
