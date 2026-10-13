<script setup lang="ts">
withDefaults(
  defineProps<{
    filled?: boolean
    separator?: boolean
    x?: 'l' | 'r'
    y?: 'row' | 'col'
  }>(),
  { filled: false, separator: false, x: 'r', y: 'row' },
)
</script>

<template>
  <!-- absolute (not fixed): stays inside the slide in overview, presenter and export -->
  <div
    class="absolute bottom-6 left-0 w-full text-xs whitespace-nowrap"
    :class="{ 'bg-main': filled }"
  >
    <hr v-if="separator">
    <ul
      class="flex !list-none p-2"
      :class="[
        y === 'col' ? 'flex-col gap-0.5' : 'flex-wrap gap-x-3',
        y === 'col' ? (x === 'l' ? 'items-start' : 'items-end') : (x === 'l' ? 'justify-start' : 'justify-end'),
      ]"
    >
      <slot />
    </ul>
  </div>
</template>
