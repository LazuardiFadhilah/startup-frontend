<template>
  <div class="project-page">
    <!-- Navbar -->
    <section class="dashboard-header pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>

    <!-- Dashboard Header -->
    <section class="container mx-auto pt-8">
      <div class="flex justify-between items-center">
        <div class="w-full mr-6">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">Dashboard</h2>
        </div>
      </div>

      <!-- Create New Project -->
      <div class="flex justify-between items-center">
        <div class="w-3/4 mr-6">
          <h3 class="text-2xl text-gray-900 mb-4">Create New Project</h3>
        </div>
        <div class="w-1/4 text-right">
          <button
            @click="createCampaign"
            class="bg-green-button hover:bg-green-700 text-white font-bold px-4 py-1 rounded inline-flex items-center"
          >
            Save
          </button>
        </div>
      </div>

      <!-- Form -->
      <div class="block mb-2">
        <div class="w-full lg:max-w-full lg:flex mb-4">
          <div
            class="w-full border border-gray-400 bg-white rounded p-8 flex flex-col justify-between leading-normal"
          >
            <form @submit.prevent="createCampaign" class="w-full">
              <div class="flex flex-wrap -mx-3 mb-6">
                <!-- Campaign Name -->
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Campaign Name
                  </label>
                  <input
                    v-model="name"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Contoh: Demi Gunpla Demi Istri"
                  />
                </div>

                <!-- Goal Amount -->
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Goal Amount
                  </label>
                  <input
                    v-model="goal_amount"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    placeholder="Contoh: 200000"
                  />
                </div>

                <!-- Short Description -->
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3"
                  >
                    Short Description
                  </label>
                  <input
                    v-model="short_description"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Deskripsi singkat mengenai projectmu"
                  />
                </div>

                <!-- Perks -->
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    What will backers get
                  </label>
                  <input
                    v-model="perks"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Contoh: Ayam, Nasi Goreng, Piring"
                  />
                </div>

                <!-- Description -->
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    v-model="description"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Isi deskripsi panjang untuk projectmu"
                  ></textarea>
                </div>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>

            <!-- Error Alert -->
            <div
              v-if="showAlert"
              class="mt-4 p-3 bg-red-500 text-white rounded"
            >
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <div class="cta-clip -mt-20"></div>
    <section class="call-to-action bg-purple-progress pt-64 pb-10"></section>
    <Footer />
  </div>
</template>

<script setup>
// // Middleware for authentication
definePageMeta({
  middleware: "auth",
});
import { usePostCampaign } from "@/composables/PostCampaign";

// Ambil state dan function dari postCampaign composable
const {
  name,
  description,
  short_description,
  goal_amount,
  perks,
  showAlert,
  errorMessage,
  createCampaign,
} = usePostCampaign();
</script>
