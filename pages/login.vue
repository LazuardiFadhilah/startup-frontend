<template>
  <form @submit.prevent="login">
    <div class="h-screen flex justify-center items-center">
      <!-- Background Section -->
      <div
        class="hidden md:block lg:w-1/3 bg-white h-full auth-background rounded-tr-lg rounded-br-lg"
      ></div>

      <!-- Form Section -->
      <div class="w-auto md:w-2/4 lg:w-2/3 flex justify-center items-center">
        <div class="w-full lg:w-1/2 px-10 lg:px-0">
          <h2 class="font-normal mb-6 text-3xl text-white">
            Sign In to Your Account
          </h2>

          <!-- Email Input -->
          <div class="mb-6">
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

          <!-- Password Input -->
          <div class="mb-6">
            <label class="font-normal text-lg text-white block mb-3"
              >Password</label
            >
            <input
              v-model="password"
              type="password"
              class="auth-form focus:outline-none focus:bg-purple-hover focus:shadow-outline focus:border-purple-hover-stroke focus:text-gray-100"
              placeholder="Write your password here"
            />
          </div>

          <!-- Submit Button -->
          <div class="mb-6">
            <button
              type="submit"
              class="block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-4 text-lg rounded-full"
            >
              Sign In
            </button>
          </div>

          <!-- Redirect to Register -->
          <div class="text-center">
            <p class="text-white text-md">
              Don't have account?
              <nuxt-link to="/register" class="no-underline text-orange-button"
                >Sign Up</nuxt-link
              >.
            </p>
          </div>
        </div>
      </div>

      <!-- Alert -->
      <Alert :show="showAlert" :message="errorMessage" />
    </div>
  </form>
</template>

<script setup>
// Import useAuth composable
import { useAuth } from "~/composables/auth";

// Extract values from the composable
const { email, password, showAlert, errorMessage, login } = useAuth();

// Define page layout
definePageMeta({
  layout: "auth",
});
</script>

<style scoped>
.auth-background {
  background-image: url("/sign-in-background.jpg");
  background-position: center;
  background-size: cover;
}
</style>
