<template>
  <header class="flex items-center justify-between px-6 py-3">
    <!-- Tombol Hamburger (Mobile) -->
    <button @click="toggleMenu" class="lg:hidden text-white focus:outline-none">
      <svg
        class="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        ></path>
      </svg>
    </button>

    <!-- Logo (Hanya di Desktop) -->
    <div class="h-12 pr-5 hidden lg:block">
      <img src="/logo.svg" alt="logo" class="h-full" />
    </div>

    <!-- Menu Utama (Tengah) -->
    <ul class="hidden lg:flex items-center space-x-6 flex-grow justify-center">
      <li>
        <nuxt-link class="text-white hover:text-teal-500 text-lg" to="/"
          >Home</nuxt-link
        >
      </li>
      <li>
        <a class="text-white hover:text-teal-500 text-lg" href="#">Project</a>
      </li>
      <li>
        <a class="text-white hover:text-teal-500 text-lg" href="#">Features</a>
      </li>
      <li>
        <a class="text-white hover:text-teal-500 text-lg" href="#"
          >Success Stories</a
        >
      </li>
    </ul>

    <!-- Foto Profil User (Kanan) - Muncul hanya jika login -->
    <div v-if="isLoggedIn" class="relative bg-white rounded-md py-2 px-2">
      <button
        @click="toggleDropdown"
        class="flex items-center text-black focus:outline-none"
      >
        <img
          v-if="imageURL"
          :src="`http://my-backend-production-2da4.up.railway.app/${imageURL}`"
          alt="User"
          class="h-10 w-10 rounded-full object-cover"
        />
        <span class="ml-2 text-black text-lg inline">{{ name }}</span>
        <svg class="ml-2 w-4 h-4" viewBox="0 0 20 20">
          <path
            class="fill-current color-black"
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </button>

      <!-- Dropdown User -->
      <ul
        v-if="isDropdownVisible"
        class="absolute right-0 mt-2 w-48 bg-white lg:bg-white text-black shadow-md rounded z-50 transition-all duration-300"
      >
        <li>
          <nuxt-link
            to="/dashboard"
            class="block px-4 py-2 hover:bg-gray-100 hover:text-black"
            >Dashboard</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            to="/settings"
            class="block px-4 py-2 hover:bg-gray-100 lhover:text-black"
            >Account Setting</nuxt-link
          >
        </li>
        <li>
          <a
            @click="logout"
            class="block px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer"
            >Logout</a
          >
        </li>
      </ul>
    </div>

    <!-- Jika belum login, tampilkan tombol "Sign Up" dan "Login" -->
    <div v-else class="flex space-x-4">
      <nuxt-link
        to="/register"
        class="bg-transparent border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-gray-800 transition"
      >
        Sign Up
      </nuxt-link>
      <nuxt-link
        to="/login"
        class="bg-white text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition"
      >
        Login
      </nuxt-link>
    </div>

    <!-- Menu Mobile -->
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-20 lg:hidden"
      @click="toggleMenu"
    ></div>

    <div
      v-if="isMenuOpen"
      class="fixed top-0 left-0 w-64 h-full bg-gray-800 p-6 shadow-lg transform transition-transform ease-in-out duration-300"
    >
      <button @click="toggleMenu" class="text-white absolute top-4 right-4">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <ul class="mt-8 space-y-4">
        <li>
          <nuxt-link class="text-white block text-lg" to="/">Home</nuxt-link>
        </li>
        <li><a class="text-white block text-lg" href="#">Project</a></li>
        <li><a class="text-white block text-lg" href="#">Features</a></li>
        <li>
          <a class="text-white block text-lg" href="#">Success Stories</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const isMenuOpen = ref(false);
const isDropdownVisible = ref(false);
const token = ref(null);
const imageURL = ref(null);
const name = ref(null);

const router = useRouter();

onMounted(() => {
  token.value = localStorage.getItem("token");
  imageURL.value = localStorage.getItem("image_url");
  name.value = localStorage.getItem("name");

  window.addEventListener("storage", () => {
    token.value = localStorage.getItem("token");
    imageURL.value = localStorage.getItem("image_url");
    name.value = localStorage.getItem("name");
  });
});

const isLoggedIn = computed(() => !!token.value);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

const logout = () => {
  localStorage.clear();
  token.value = null;
  router.push("/");
};
</script>
