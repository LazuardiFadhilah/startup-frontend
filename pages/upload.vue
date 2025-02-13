<template>
  <div class="container mx-auto h-screen flex justify-center items-center">
    <div class="w-full lg:w-1/3 px-10 lg:px-0">
      <div class="flex justify-center items-center mx-auto mb-4 w-40">
        <div class="relative">
          <label for="fileInput" class="cursor-pointer">
            <img
              :src="previewImage || '/avatar.jpg'"
              alt="Avatar Preview"
              class="rounded-full border-white border-4 w-40 h-40 object-cover"
            />
            <img
              src="/icon-avatar-add.svg"
              alt=""
              class="absolute right-0 bottom-0 pb-2"
            />
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileUpload"
            class="hidden"
          />
        </div>
      </div>

      <h2 class="font-normal mb-3 text-3xl text-white text-center">
        Hi, {{ name }}
      </h2>
      <p class="text-white text-center font-light">Please upload your selfie</p>

      <div class="mb-4 mt-6">
        <button
          @click="uploadAvatar"
          class="block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 text-lg rounded-full"
          :disabled="!selectedFile"
        >
          Upload & Continue
        </button>
      </div>

      <div>
        <button
          @click="$router.push({ path: '/register-success' })"
          class="block w-full bg-transparent border-white border hover:bg-white hover:bg-opacity-25 text-white font-light px-6 py-4 text-lg rounded-full"
        >
          Skip
        </button>
      </div>

      <div v-if="showAlert" class="mt-4 text-center text-red-500">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useUpload } from "~/composables/useUpload";

definePageMeta({ layout: "auth" });

const {
  selectedFile,
  previewImage,
  showAlert,
  errorMessage,
  handleFileUpload,
  uploadAvatar,
} = useUpload();

const token = ref(null);
const name = ref(null);

onMounted(() => {
  token.value = localStorage.getItem("token");
  name.value = localStorage.getItem("name");

  window.addEventListener("storage", () => {
    token.value = localStorage.getItem("token");
    name.value = localStorage.getItem("name");
  });
});
</script>
