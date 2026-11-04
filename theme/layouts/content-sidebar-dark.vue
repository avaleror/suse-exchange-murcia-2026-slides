<script setup>
defineOptions({ inheritAttrs: false })
</script>

<template>
  <SuseSlide layout="content-sidebar-dark" v-bind="$attrs">
    <template v-for="(_, slot) in $slots" #[slot]><slot :name="slot" /></template>
  </SuseSlide>
</template>
