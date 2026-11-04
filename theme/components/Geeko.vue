<script setup>
// Official Geeko artwork only (rule 6-9): <Geeko pose="sitting-confident" width="200" />
import { assetUrl } from './assets.js'

const props = defineProps({ pose: { type: String, default: 'standard' }, width: [String, Number] })
</script>

<template>
  <img :src="assetUrl(`geeko/${props.pose}`)" :style="{ width: props.width ? `${props.width}px` : undefined }" alt="Geeko" />
</template>
