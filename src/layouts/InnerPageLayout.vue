<template>
  <div>
    <TheHeader class="sticky top-0 z-50" />
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
</script>

<style scoped></style>
