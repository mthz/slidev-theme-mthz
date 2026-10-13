<script setup lang="ts">
// layout: default — same as two-cols-flex (frontmatter falls through as props), so
// ::left:: / ::right:: work without a layout key.
import TwoColsFlex from './two-cols-flex.vue'
</script>

<template>
  <TwoColsFlex>
    <template v-for="(_, name) in $slots" #[name]>
      <slot :name="name" />
    </template>
  </TwoColsFlex>
</template>
