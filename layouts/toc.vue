<script setup lang="ts">
// layout: toc — optional heading in the slot (default "Table of Contents"), then Slidev's <Toc/>.
// Frontmatter (passed to <Toc/>): columns, minDepth, maxDepth, mode ('all' | 'onlyCurrentTree' | 'onlySiblings').
// Explicit import: inside a file named toc.vue a bare <Toc/> resolves to this layout
// itself (Vue SFC self-reference) and recurses until the stack overflows.
import Toc from '@slidev/client/builtin/Toc.vue'

defineProps<{
  columns?: string | number
  minDepth?: string | number
  maxDepth?: string | number
  mode?: 'all' | 'onlyCurrentTree' | 'onlySiblings'
}>()
</script>

<template>
  <div class="slidev-layout">
    <slot>
      <h1>Table of Contents</h1>
    </slot>
    <Toc :columns="columns" :min-depth="minDepth" :max-depth="maxDepth" :mode="mode" />
  </div>
</template>
