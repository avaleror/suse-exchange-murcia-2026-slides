<script setup>
// One layout for the whole deck: an official SUSE layout as the base
// (`base:` in frontmatter, default "content"), plus three extras placed in
// slide coordinates (percent of the 16:9 canvas):
//   lead:     subtitle line under the title
//   sources:  [{ label, url }] footer links ("Fuentes")
//   geeko:    { pose, anim, x, y, w, delay } or a list of them. Official
//             artwork only; animations are CSS transforms, the file is untouched.
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import SuseSlide from '../theme/components/SuseSlide.vue'
import { assetUrl } from '../theme/components/assets.js'

defineOptions({ inheritAttrs: false })
const { $frontmatter: fm, $nav, $page } = useSlideContext()

const base = computed(() => fm.base ?? 'content')
const geekos = computed(() => (fm.geeko ? [].concat(fm.geeko) : []))
const sources = computed(() => fm.sources ?? [])
const active = computed(() => $nav.value.currentSlideNo === $page.value)
const host = (u) => {
  try { return new URL(u).hostname.replace(/^www\./, '') } catch { return u }
}
</script>

<template>
  <div class="sx" :class="[fm.look ? `look-${fm.look}` : '', { active }]">
    <SuseSlide :layout="base" :subtitle="fm.subtitle">
      <div v-if="fm.lead" class="lead">{{ fm.lead }}</div>
      <slot />
    </SuseSlide>

    <img v-if="fm.logo" class="corner-logo" :src="assetUrl(`logos/suse-horizontal-${fm.logo}`)" alt="SUSE" />

    <div
      v-for="(g, i) in geekos"
      :key="i"
      class="geeko-wrap"
      :style="{ left: `${g.x}%`, top: `${g.y}%`, width: `${g.w}%` }"
    >
      <img
        :key="`${i}-${active}`"
        class="geeko-anim"
        :class="`ga-${g.anim ?? 'bob'}`"
        :style="{ animationDelay: `${g.delay ?? 0}s` }"
        :src="assetUrl(`geeko/${g.pose}`)"
        alt="Geeko"
      />
    </div>

    <div v-if="sources.length" class="sources">
      Fuentes:
      <template v-for="(s, i) in sources" :key="i">
        <span v-if="i" class="dot"> · </span>
        <a :href="s.url" target="_blank" rel="noopener">{{ s.label }} ({{ host(s.url) }})</a>
      </template>
    </div>
  </div>
</template>
