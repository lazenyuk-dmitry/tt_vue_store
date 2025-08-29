<template>
  <button
    class="relative p-2 rounded-full hover:bg-gray-100 transition"
    aria-label="Корзина"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-gray-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.5h12.9M7 13L5.4 5M16 16a2 2 0 11-4 0"
      />
    </svg>

    <span
      class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5"
    >
      3
    </span>
  </button>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>