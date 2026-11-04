<script setup>
// Native diagram, same spec as build_pptx.py `diagram:` (rows of blocks, bands, flows). Palette only.
//   <Diagram :rows='[{"color":"pine","label":"Plane","items":[{"title":"RBAC"}]}]' />
import { assetUrl } from './assets.js'

defineProps({ rows: { type: Array, required: true } })

// fill, heading, text, outline: same as BOX_STYLES in build_pptx.py
const STYLES = {
  pine: ['#0C322C', '#90EBCD', '#FFFFFF'],
  jungle: ['#30BA78', '#0C322C', '#0C322C'],
  mint: ['#90EBCD', '#0C322C', '#0C322C'],
  midnight: ['#192072', '#90EBCD', '#FFFFFF'],
  fog: ['#EFEFEF', '#0C322C', '#0C322C'],
  waterhole: ['#2453FF', '#FFFFFF', '#FFFFFF'],
  white: ['#FFFFFF', '#0C322C', '#0C322C', '#0C322C'],
}
const ORDER = ['pine', 'jungle', 'midnight', 'mint', 'fog', 'waterhole']
const LIGHT = ['#FFFFFF', '#EFEFEF', '#90EBCD']
const s = (name) => STYLES[name] ?? STYLES.fog
const box = (name) => ({ background: s(name)[0], color: s(name)[2], border: s(name)[3] ? `2px solid ${s(name)[3]}` : 'none' })
const isBand = (r) => (r.items?.length) && (r.color || r.label || r.logo)
const child = (r, it, i) => it.color ?? (isBand(r) ? (LIGHT.includes(s(r.color ?? 'fog')[0]) ? 'white' : 'fog') : ORDER[i % ORDER.length])
const arrowColor = (r) => (!r.color || LIGHT.includes(s(r.color)[0]) ? '#0C322C' : '#90EBCD')

// branch rows: a Git-style line (main, a fork that merges back, commit dots) or a timeline of stops.
// Same geometry as diagram_branch() in build_pptx.py, on a 1000 x 120 canvas.
const branch = (b) => {
  const fork = !!b.fork, ym = fork ? 84 : 48, yb = 26, cw = 90, xs = 80, xe = 780
  const n = Number(b.commits ?? 3), stops = b.stops ?? []
  const commits = fork ? Array.from({ length: n }, (_, i) => xs + cw * 1.6 + (xe - xs - cw * 3.2) * (i + 0.5) / n) : []
  const path = fork ? `M${xs},${ym} C${xs + cw / 2},${ym} ${xs + cw / 2},${yb} ${xs + cw},${yb} L${xe - cw},${yb} C${xe - cw / 2},${yb} ${xe - cw / 2},${ym} ${xe},${ym}` : ''
  return { fork, ym, yb, cw, xs, xe, commits, path, stops: stops.map((t, i) => ({ t, x: 1000 * (i + 0.5) / stops.length })) }
}
</script>

<template>
  <div class="dg">
    <div v-for="(r, ri) in rows" :key="ri" class="dg-row" :style="{ flex: r.height ?? 1 }">
      <svg v-if="r.branch" class="dg-branch" viewBox="0 0 1000 120">
        <template v-for="g in [branch(r.branch)]" :key="'g'">
          <line x1="30" :y1="g.ym" x2="970" :y2="g.ym" stroke="#0C322C" stroke-width="3" />
          <path v-if="g.fork" :d="g.path" fill="none" stroke="#30BA78" stroke-width="4" />
          <circle v-for="(cx, ci) in g.commits" :key="'c' + ci" :cx="cx" :cy="g.yb" r="8" fill="#30BA78" />
          <template v-if="g.fork">
            <circle :cx="g.xs" :cy="g.ym" r="8" fill="#FFFFFF" stroke="#0C322C" stroke-width="3" />
            <circle :cx="g.xe" :cy="g.ym" r="8" fill="#FFFFFF" stroke="#0C322C" stroke-width="3" />
            <text :x="g.xs + g.cw * 1.1" :y="g.yb - 12" class="mono" fill="#30BA78" text-anchor="middle">{{ r.branch.fork }}</text>
            <text v-if="r.branch.merge" :x="g.xe - g.cw * 1.1" :y="g.yb - 12" class="mono" fill="#30BA78" text-anchor="middle">{{ r.branch.merge }}</text>
          </template>
          <template v-for="(st, si) in g.stops" :key="'s' + si">
            <circle :cx="st.x" :cy="g.ym" r="8" fill="#30BA78" />
            <text :x="st.x" :y="g.ym + 30" fill="#0C322C" text-anchor="middle">{{ st.t }}</text>
          </template>
          <template v-if="r.branch.end">
            <circle cx="940" :cy="g.ym" r="8" fill="#0C322C" />
            <text x="940" :y="g.ym + 28" class="mono" fill="#0C322C" text-anchor="middle">{{ r.branch.end }}</text>
          </template>
          <text v-if="r.branch.main" x="30" :y="g.ym + 28" class="mono" fill="#0C322C">{{ r.branch.main }}</text>
        </template>
      </svg>
      <div v-else-if="!r.items?.length" class="dg-bar" :style="box(r.color ?? 'pine')">
        <strong :style="{ color: s(r.color ?? 'pine')[1] }">{{ r.label }}</strong>
        <span v-for="(t, ti) in String(r.text ?? '').split('\n').filter(Boolean)" :key="ti">{{ t }}</span>
      </div>
      <div v-else :class="isBand(r) ? 'dg-band' : 'dg-plain'" :style="isBand(r) ? box(r.color ?? 'fog') : {}">
        <div v-if="isBand(r)" class="dg-head">
          <img v-if="r.logo" :src="assetUrl(r.logo)" alt="" />
          <strong v-else :style="{ color: s(r.color ?? 'fog')[1] }">{{ r.label }}</strong>
          <span v-if="r.text">{{ r.text }}</span>
        </div>
        <div class="dg-items">
          <template v-for="(it, i) in r.items" :key="i">
            <div class="dg-block" :style="{ ...box(child(r, it, i)), flex: it.span ?? 1 }">
              <img v-if="it.logo" :src="assetUrl(it.logo)" alt="" />
              <template v-else>
                <strong :style="{ color: s(child(r, it, i))[1] }">{{ it.title }}</strong>
                <span v-for="(t, ti) in String(it.text ?? '').split('\n').filter(Boolean)" :key="ti">{{ t }}</span>
              </template>
            </div>
            <div v-if="r.arrows && i < r.items.length - 1" class="dg-arrow" :style="{ color: arrowColor(r) }">➜</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dg { display: flex; flex-direction: column; gap: 8px; width: 100%; height: 100%; font-family: 'SUSE', sans-serif; font-size: 11px; line-height: 1.25; }
.dg-row { display: flex; flex-basis: 0; min-height: 0; }
.dg-bar, .dg-band, .dg-plain { flex: 1; display: flex; min-height: 0; border-radius: 8px; }
.dg-bar { flex-direction: column; align-items: center; justify-content: center; }
.dg-band { flex-direction: column; padding: 0 9px 9px; }
.dg-head { display: flex; align-items: center; justify-content: space-between; height: 28px; flex: none; }
.dg-head img { height: 17px; }
.dg-items { display: flex; flex: 1; min-height: 0; gap: 8px; align-items: stretch; }
.dg-block { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; min-height: 0; border-radius: 8px; padding: 4px 6px; }
.dg strong { font-size: 13px; font-weight: 700; }
.dg-block img { max-height: 70%; max-width: 90%; }
.dg-arrow { display: flex; align-items: center; font-size: 18px; }
.dg-branch { flex: 1; width: 100%; height: 100%; font-size: 17px; }
.dg-branch .mono { font-family: 'SUSE Mono', monospace; }
</style>
