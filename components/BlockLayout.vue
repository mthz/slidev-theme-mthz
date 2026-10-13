<script setup lang="ts">
// Shared shell for the recurring per-unit slides: exercise / questions / recap / vote.
// Used by layouts/exercise.vue, layouts/questions.vue, layouts/recap.vue, layouts/vote.vue.
defineProps<{
  kind: 'exercise' | 'questions' | 'recap' | 'vote'
  label: string
  duration?: string
}>()
</script>

<template>
  <div :class="['slidev-layout', 'block-layout', kind]">
    <div class="block-badge">
      {{ label }}<span v-if="duration" class="block-duration"> · {{ duration }}</span>
    </div>
    <slot />
  </div>
</template>
