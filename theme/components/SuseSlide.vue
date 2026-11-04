<script setup>
// One component behind every layout: the official layout render as background,
// text placed in the template's own placeholder boxes (layouts.json).
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import geometry from '../layouts.json'
import { assetUrl } from './assets.js'

const { $frontmatter, $page } = useSlideContext() // `title` is reserved by Slidev, never passed as a prop

const props = defineProps({
  layout: { type: String, required: true },
  title: String,
  subtitle: String,
  number: [String, Number],
  caption: String,
  image: String,
})

const bgs = import.meta.glob('../assets/bg/*.png', { eager: true, import: 'default' })
const g = computed(() => geometry[props.layout])
const bg = computed(() => bgs[`../assets/bg/${props.layout}.png`])
const bigNumber = computed(() => props.layout.startsWith('big-number'))
const title = computed(() => props.title ?? $frontmatter?.title)
const titleText = computed(() => (bigNumber.value ? props.number : title.value))
const subtitleText = computed(() => (bigNumber.value ? props.caption ?? title.value : props.subtitle))

const ANCHOR = { t: 'flex-start', ctr: 'center', b: 'flex-end' }
function place(b) {
  return {
    left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%`,
    fontSize: `${b.size}px`, justifyContent: ANCHOR[b.anchor] ?? 'flex-start',
    textAlign: b.align, color: `var(--suse-${b.color})`,
  }
}
// big-number captions: the layout's bottom-anchored 40pt box grows into the number when it wraps
function placeSubtitle(b) {
  if (!bigNumber.value) return place(b)
  const long = (subtitleText.value ?? '').length > 28
  return { ...place(b), justifyContent: 'flex-start', fontSize: `${long ? b.size * 0.6 : b.size}px` }
}
</script>

<template>
  <div class="suse-slide" :class="`suse-${layout}`" :style="{ backgroundImage: `url(${bg})` }">
    <div v-if="g.title && titleText != null" class="suse-box suse-title" :style="place(g.title)">{{ titleText }}</div>
    <div v-if="g.subtitle && subtitleText" class="suse-box suse-subtitle" :style="placeSubtitle(g.subtitle)">{{ subtitleText }}</div>

    <template v-if="g.bodies.length > 1">
      <div v-for="(b, i) in g.bodies" :key="i" class="suse-box suse-body" :style="place(b)">
        <slot :name="`col${i + 1}`" />
      </div>
    </template>
    <div v-else-if="g.bodies.length === 1" class="suse-box suse-body" :style="place(g.bodies[0])">
      <slot />
    </div>
    <div v-else class="suse-free suse-body"><slot /></div>

    <div v-if="g.picture" class="suse-box suse-body" :style="{ ...place(g.picture), alignItems: 'center', justifyContent: 'center' }">
      <slot name="picture"><img v-if="image" :src="assetUrl(image)" alt="" /></slot>
    </div>
    <div v-else-if="image && !g.bodies.length" class="suse-free"><img :src="assetUrl(image)" alt="" /></div>

    <div v-if="g.slideNumber" class="suse-box suse-number" :style="{ ...place(g.slideNumber), padding: 0 }">{{ $page }}</div>
  </div>
</template>
