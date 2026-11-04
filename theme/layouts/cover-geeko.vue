<script setup>
defineOptions({ inheritAttrs: false })
</script>

<template>
  <SuseSlide layout="cover-geeko" v-bind="$attrs">
    <template v-for="(_, slot) in $slots" #[slot]><slot :name="slot" /></template>
  </SuseSlide>
</template>
