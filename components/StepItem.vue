<template>
  <div class="w-1/3">
    <figure class="flex justify-center items-center">
      <img :src="imgSrc" alt="" class="h-30 mb-8" />
    </figure>
    <div class="step-content">
      <h3 class="font-medium">{{ title }}</h3>
      <p class="font-light">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imgSrc: String,
  title: String,
  description: String,
});
</script>
