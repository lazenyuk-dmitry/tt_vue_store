<template>
  <button
    class="px-3 py-1.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed transition"
    type="button"
  >
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style scoped></style>
