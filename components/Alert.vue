<template>
  <transition name="fade">
    <div
      v-if="show"
      class="fixed top-10 right-0 left-0 max-w-4xl mx-auto bg-red-50 border-l-8 border-red-900 rounded-lg shadow-lg p-4 transition-opacity duration-500"
    >
      <div class="flex items-center">
        <svg
          class="h-8 w-8 text-red-900 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-red-900 font-semibold text-lg">{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String,
});
</script>

<style scoped>
/* Animasi Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
