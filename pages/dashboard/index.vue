<template>
  <div class="project-page">
    <!-- Header Section -->
    <section class="dashboard-header pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>

    <!-- Main Content Section -->
    <section class="container mx-auto pt-8">
      <div class="flex justify-between items-center mb-6">
        <!-- Dashboard Title and Navigation -->
        <div class="w-3/4 mr-6">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">Dashboard</h2>
          <ul class="flex mt-2">
            <li class="mr-6">
              <a class="text-gray-800 font-bold" href="#">Your Projects</a>
            </li>
            <li class="mr-6">
              <NuxtLink
                class="text-gray-500 hover:text-gray-800"
                to="/dashboard/transactions"
              >
                Your Transactions
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Create Campaign Button -->
        <div class="w-full text-right">
          <NuxtLink
            to="/dashboard/projects/create"
            class="bg-orange-button hover:bg-green-button text-white font-bold py-4 px-4 rounded"
          >
            + Create Campaign
          </NuxtLink>
        </div>
      </div>

      <hr />

      <!-- Campaigns List -->
      <div class="block mb-2 mt-2 w-full">
        <div
          v-for="campaign in campaigns"
          :key="campaign.id"
          class="flex flex-row justify-between lg:w-full lg:flex mb-4 rounded-lg border-gray-400 border-2 p-[10px]"
        >
          <!-- Campaign Image -->
          <div
            class="basis-[20vw] bg-cover bg-center bg-no-repeat rounded-lg"
            :style="{
              backgroundImage: `url(${
                campaign.image_url
                  ? 'http://my-backend-production-2da4.up.railway.app/' +
                    campaign.image_url
                  : 'https://tailwindcss.com/img/card-left.jpg'
              })`,
            }"
          ></div>

          <!-- Campaign Details -->
          <div
            class="p-8 flex flex-auto flex-col justify-between leading-normal"
          >
            <div class="mb-8">
              <div class="text-gray-900 font-bold text-xl mb-1">
                {{ campaign.name }}
              </div>
              <p class="text-sm text-gray-600 flex items-center mb-2">
                {{ formatCurrency(campaign.goal_amount) }} &middot;
                {{
                  calculatePercentage(
                    campaign.current_amount,
                    campaign.goal_amount
                  )
                }}
              </p>
              <p class="text-gray-700 text-base">
                {{ campaign.short_description }}
              </p>
            </div>

            <!-- Detail Button -->
            <div class="flex items-center">
              <NuxtLink
                :to="`/dashboard/projects/${campaign.id}`"
                class="bg-green-button text-white py-2 px-4 rounded"
              >
                Detail
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call To Action Section -->
    <div class="cta-clip -mt-20"></div>
    <section class="call-to-action bg-purple-progress pt-64 pb-10"></section>

    <!-- Footer Section -->
    <Footer />
  </div>
</template>

<script setup>
// // Middleware for authentication
definePageMeta({
  middleware: "auth",
});

// Import required composables
import { useCampaigns } from "@/composables/getCampaigns"; // Ensure correct path
import { useCurrency } from "@/composables/useCurrency";
import { onMounted } from "vue";

// Fetch campaign data
const { campaigns, getCampaignsData } = useCampaigns();
const { formatCurrency, calculatePercentage } = useCurrency();

// Load campaign data on component mount
onMounted(() => {
  getCampaignsData();
});
</script>
