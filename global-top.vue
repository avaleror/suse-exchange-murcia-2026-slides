<script setup lang="ts">
// Chapter trail: Geeko walks along the bottom of the deck, like the longship
// in the CND Norway deck. Slides that open a chapter set `chapter: "Label"`
// in frontmatter. The talk (up to the slide before "Anexo") spreads over the
// trail; in the annex Geeko lies down at the end of it.
//   nav: false   hide the trail on that slide (full-bleed slides)
//   nav: dark    light colours for dark backgrounds
// Lives in global-top because global-bottom is drawn under the slide.
import { computed, ref, unref, watch } from 'vue'
import { injectLocal } from '@vueuse/core'
import { useNav } from '@slidev/client'
import { injectionSlidevContext } from '@slidev/client/constants.ts'
import { assetUrl } from './theme/components/assets.js'

// In PDF/PNG export each page has its own nav context; prefer it.
const ctx = injectLocal(injectionSlidevContext, null as any)
const nav: any = ctx?.nav ?? useNav()
const v = (x: any) => unref(x)

const chapters = computed(() =>
  v(nav.slides)
    .filter((r: any) => r.meta?.slide?.frontmatter?.chapter)
    .map((r: any) => ({ no: r.no, label: String(r.meta.slide.frontmatter.chapter) })),
)
const total = computed(() => v(nav.total))
const no = computed(() => v(nav.currentSlideNo))
const fm = computed(() => v(nav.currentFrontmatter) ?? {})

const annexNo = computed(() => chapters.value.find((c: any) => c.label === 'Anexo')?.no ?? total.value + 1)
const talkEnd = computed(() => annexNo.value - 1)
const inAnnex = computed(() => no.value >= annexNo.value)

// talk slides spread over 0..88 %, the annex is the last stop at 100 %
const at = (n: number) => {
  if (n >= annexNo.value) return 100
  return talkEnd.value > 1 ? ((n - 1) / (talkEnd.value - 1)) * 88 : 0
}
const pos = computed(() => at(no.value))
const current = computed(() => {
  const passed = chapters.value.filter((c: any) => c.no <= no.value)
  return passed.length ? passed[passed.length - 1].no : 0
})

const hidden = computed(() => fm.value.nav === false)
const dark = computed(() => fm.value.nav === 'dark')
const pose = computed(() => (inAnnex.value ? 'laying-down-content' : 'standard'))

// a short walk cycle whenever Geeko moves
const walking = ref(false)
let t: any
watch(no, (a, b) => {
  if (a === b) return
  walking.value = true
  clearTimeout(t)
  t = setTimeout(() => (walking.value = false), 900)
})
</script>

<template>
  <div v-if="!hidden" class="geeko-nav" :class="{ dark }">
    <div class="trail">
      <div class="line" />
      <div class="line done" :style="{ width: pos + '%' }" />
      <div
        v-for="c in chapters"
        :key="c.no"
        class="stop"
        :class="{ passed: c.no <= no, here: c.no === current }"
        :style="{ left: at(c.no) + '%' }"
      >
        <span>{{ c.label }}</span>
      </div>
      <div class="walker" :class="{ walking, resting: inAnnex }" :style="{ left: pos + '%' }">
        <img :src="assetUrl(`geeko/${pose}`)" alt="" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.geeko-nav {
  position: absolute;
  left: 19%;
  right: 11.5%;
  bottom: 2.2%;
  height: 26px;
  pointer-events: none;
  font-family: 'SUSE', sans-serif;
  z-index: 10;
  --track: var(--suse-fog);
  --done: var(--suse-jungle);
  --label: var(--suse-pine);
}
.geeko-nav.dark { --track: rgba(255, 255, 255, 0.25); --label: var(--suse-mint); }

.trail { position: absolute; inset: 0; }
.line {
  position: absolute; left: 0; right: 0; top: 12px; height: 2px; border-radius: 1px;
  background: var(--track);
}
.line.done { right: auto; background: var(--done); transition: width 0.9s ease; }

.stop { position: absolute; top: 9px; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; }
.stop::before {
  content: ''; width: 8px; height: 8px; border-radius: 50%;
  background: var(--suse-white); border: 1.5px solid var(--done);
}
.stop.passed::before { background: var(--done); }
.stop span {
  margin-top: 1px; font-size: 7.5px; letter-spacing: 0.05em; text-transform: uppercase;
  color: var(--label); opacity: 0.55; white-space: nowrap;
}
.stop.here span { opacity: 1; font-weight: 600; }

/* Geeko stands on the line; its artwork has transparent padding, hence the offsets */
.walker {
  position: absolute; bottom: 1px; width: 44px; transform: translateX(-50%);
  transition: left 0.9s ease-in-out;
}
.walker img { display: block; width: 100%; transform-origin: 50% 90%; animation: idle 2.8s ease-in-out infinite; }
.walker.walking img { animation: step 0.3s ease-in-out 3; }
.walker.resting { width: 46px; bottom: 0; }
.walker.resting img { animation: breathe 3.5s ease-in-out infinite; }

@keyframes idle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1px) rotate(-1deg); } }
@keyframes step { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-4px) rotate(-4deg); } }
@keyframes breathe { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.05); } }
</style>
