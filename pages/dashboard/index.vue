<template>
  <div class="project-page">
    <section class="dashboard-header pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>
    <section class="container mx-auto pt-8">
      <div class="flex justify-between items-center mb-6">
        <div class="w-3/4 mr-6">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">Dashboard</h2>
          <ul class="flex mt-2">
            <li class="mr-6">
              <a class="text-gray-800 font-bold" href="#"> Your Projects </a>
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
        <div class="w-full text-right">
          <NuxtLink
            to="/dashboard/create"
            class="bg-orange-button hover:bg-green-button text-white font-bold py-4 px-4 rounded items-center"
          >
            + Create Campaign
          </NuxtLink>
        </div>
      </div>
      <hr />
      <div class="block mb-2 mt-2 w-full">
        <div
          class="flex flex-row justify-between lg:w-full lg:flex mb-4 rounded-lg border-gray-400 border-2 p-[10px]"
          v-for="campaign in campaigns"
          :key="campaign.id"
        >
          <div
            class="basis-[20vw] bg-cover bg-center bg-no-repeat rounded-lg"
            :style="{
              backgroundImage: `url(${
                campaign.image_url
                  ? 'http://localhost:8080/' + campaign.image_url
                  : 'https://tailwindcss.com/img/card-left.jpg'
              })`,
            }"
          ></div>
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
    <div class="cta-clip -mt-20"></div>
    <section class="call-to-action bg-purple-progress pt-64 pb-10"></section>
    <Footer />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});

import { useCampaigns } from "@/composables/getCampaigns"; // Pastikan path benar
import { useCurrency } from "@/composables/useCurrency";
import { onMounted } from "vue";

const { campaigns, getCampaignsData } = useCampaigns();
const { formatCurrency, calculatePercentage } = useCurrency();

onMounted(() => {
  getCampaignsData();
});
</script>
