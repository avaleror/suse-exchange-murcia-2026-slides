<script setup>
defineOptions({ inheritAttrs: false })
</script>

<template>
  <SuseSlide layout="cover" v-bind="$attrs">
    <template v-for="(_, slot) in $slots" #[slot]><slot :name="slot" /></template>
  </SuseSlide>
</template>
