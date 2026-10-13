<script setup lang="ts">
// layout: two-cols-flex — frontmatter: colspan (left width, 1–11 of 12, default 6),
// gap (column gap, default true), colclick (reveal the right column on click).
// Slots: default (above), ::left::, ::right::, ::bottom:: (full width below).
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ colspan?: number | string, gap?: boolean, colclick?: boolean }>(),
  { colspan: 6, gap: true, colclick: false },
)

// Inline grid-column instead of `col-span-${n}` classes: UnoCSS can't see dynamic class names.
const left = computed(() => Math.min(11, Math.max(1, Math.round(Number(props.colspan) || 6))))
const span = (n: number) => ({ gridColumn: `span ${n} / span ${n}` })
</script>

<template>
  <div class="slidev-layout">
    <slot />
    <div
      v-if="$slots.left || $slots.right"
      :class="['grid grid-cols-12 w-full', gap ? 'gap-x-5' : 'gap-x-0']"
    >
      <div class="col-left" :style="span(left)">
        <slot name="left" />
      </div>
      <div v-if="colclick" v-click class="col-right" :style="span(12 - left)">
        <slot name="right" />
      </div>
      <div v-else class="col-right" :style="span(12 - left)">
        <slot name="right" />
      </div>
    </div>
    <slot name="bottom" />
  </div>
</template>
