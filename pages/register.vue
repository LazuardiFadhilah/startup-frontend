<template>
  <!-- Form untuk registrasi akun -->
  <form @submit.prevent="register">
    <div class="h-screen flex justify-center items-center">
      <!-- Bagian kiri: background gambar untuk tampilan besar -->
      <div
        class="hidden md:block lg:w-1/3 bg-white h-full auth-background rounded-tr-lg rounded-br-lg"
      ></div>

      <!-- Bagian kanan: Form registrasi -->
      <div class="w-auto md:w-2/4 lg:w-2/3 flex justify-center items-center">
        <div class="w-full lg:w-1/2 px-10 lg:px-0">
          <h2 class="font-normal mb-6 text-3xl text-white">Sign Up Account</h2>

          <!-- Input Nama Lengkap -->
          <div class="mb-6">
            <div class="mb-4">
              <label class="font-normal text-lg text-white block mb-3"
                >Full Name</label
              >
              <input
                v-model="name"
                type="text"
                class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
                placeholder="Write Your Name Here"
              />
            </div>
          </div>

          <!-- Input Pekerjaan -->
          <div class="mb-6">
            <div class="mb-4">
              <label class="font-normal text-lg text-white block mb-3"
                >Occupation</label
              >
              <input
                v-model="occupation"
                type="text"
                class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
                placeholder="Write your occupation here"
              />
            </div>
          </div>

          <!-- Input Email -->
          <div class="mb-6">
            <div class="mb-4">
              <label class="font-normal text-lg text-white block mb-3"
                >Email Address</label
              >
              <input
                v-model="email"
                type="email"
                class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
                placeholder="Write your email address here"
              />
            </div>
          </div>

          <!-- Input Password -->
          <div class="mb-6">
            <div class="mb-4">
              <label class="font-normal text-lg text-white block mb-3"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
                placeholder="Type your password here"
              />
            </div>
          </div>

          <!-- Tombol Registrasi -->
          <div class="mb-6">
            <div class="mb-4">
              <button
                type="submit"
                class="block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 text-lg rounded-full"
              >
                Continue Sign Up
              </button>
            </div>
          </div>

          <!-- Link untuk Sign In -->
          <div class="text-center">
            <p class="text-white text-md">
              Already have an account?
              <nuxt-link to="/login" class="no-underline text-orange-button">
                Sign In </nuxt-link
              >.
            </p>
          </div>
        </div>
      </div>

      <!-- Komponen Alert untuk menampilkan pesan error -->
      <Alert :show="showAlert" :message="errorMessage" />
    </div>
  </form>
</template>

<script setup>
import { useAuth } from "~/composables/auth";

// Mengambil nilai dari composable auth
const { email, password, showAlert, errorMessage, occupation, name, register } =
  useAuth();

// Menetapkan metadata halaman
definePageMeta({
  layout: "auth",
});
</script>

<style scoped>
/* Styling untuk background di bagian kiri */
.auth-background {
  background-image: url("/sign-up-background.jpg");
  background-position: center;
  background-size: cover;
}
</style>
