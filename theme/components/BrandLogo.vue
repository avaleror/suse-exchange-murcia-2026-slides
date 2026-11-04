<script setup>
// Official logos only, never redrawn (rule 8).
//   <BrandLogo />                                  SUSE, green on light
//   <BrandLogo variant="green-white" />            SUSE on dark backgrounds
//   <BrandLogo product="edge" variant="pos-green-horizontal" />
import { assetUrl } from './assets.js'

const props = defineProps({
  product: String,
  variant: String,
  height: { type: [String, Number], default: 40 },
})
const ref = props.product
  ? `products/${props.product}/${props.variant ?? 'pos-green-horizontal'}`
  : `logos/suse-horizontal-${props.variant ?? 'green'}`
</script>

<template>
  <img :src="assetUrl(ref)" :style="{ height: `${props.height}px`, width: 'auto' }" :alt="props.product ?? 'SUSE'" />
</template>
