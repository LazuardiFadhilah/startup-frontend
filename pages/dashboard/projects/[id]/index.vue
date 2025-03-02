<template>
  <div class="project-page">
    <!-- Header Section -->
    <section class="dashboard-header pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>

    <!-- Campaign Details Section -->
    <section class="container mx-auto pt-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-4xl text-gray-900 font-medium">Dashboard</h2>
      </div>

      <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl text-gray-900">Campaign Details</h3>
        <NuxtLink
          to="/dashboard/projects/create"
          class="bg-green-button hover:bg-green-button text-white font-bold px-4 py-1 rounded inline-flex items-center"
        >
          Edit
        </NuxtLink>
      </div>

      <div class="border border-gray-400 bg-white rounded p-8 mb-4">
        <h4 class="text-gray-900 font-bold text-xl mb-2">
          {{ campaign?.name }}
        </h4>
        <p class="text-sm font-bold mb-1">Description</p>
        <p class="text-gray-700 text-base mb-2">{{ campaign?.description }}</p>

        <p class="text-sm font-bold mb-1 mt-4">What Will Funders Get</p>
        <ul class="list-disc ml-5 mb-4">
          <li v-for="(perk, index) in campaign?.perks" :key="index">
            {{ perk }}
          </li>
        </ul>

        <p class="text-sm font-bold mb-1 mt-4">Price</p>
        <p class="text-2xl text-gray-700">
          {{ formatCurrency(campaign?.goal_amount) }}
        </p>
      </div>

      <!-- Gallery Section -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl text-gray-900">Gallery</h3>
        <div>
          <input
            type="file"
            @change="selectFile"
            class="border p-1 rounded overflow-hidden"
          />
        </div>
      </div>

      <div class="flex -mx-2">
        <div
          v-for="(image, index) in campaign?.images"
          :key="index"
          class="relative w-1/4 bg-white m-2 p-2 border border-gray-400 rounded"
        >
          <figure class="item-thumbnail">
            <img
              :src="`http://localhost:8080/${image.image_url}`"
              alt="Campaign image"
              class="rounded w-full"
            />
          </figure>
        </div>
      </div>

      <!-- Transaction History Section -->
      <div class="flex justify-between items-center mb-4 mt-5">
        <h3 class="text-2xl text-gray-900">Transaction History</h3>
      </div>

      <div v-for="transaction in transactionsCampaign" :key="transaction.id">
        <div class="border border-gray-400 bg-white rounded p-8 mb-4">
          <h4 class="text-gray-900 font-bold text-xl mb-1">
            {{ transaction.name }}
          </h4>
          <p class="text-sm text-gray-600">
            {{ formatCurrency(transaction.amount) }} &middot;
            {{ formatDate(transaction.created_at) }}
          </p>
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

import { useRoute } from "vue-router";
import { useCampaign } from "@/composables/useCampaign";
import { onMounted, ref } from "vue";
import { useCurrency } from "@/composables/useCurrency";
import { transactions } from "@/composables/transaction";
import { useCampaignImage } from "@/composables/postCampaignImage";

const route = useRoute();
const { campaign, fetchCampaignById } = useCampaign();
const { formatCurrency } = useCurrency();
const { transactionsCampaign, getTransactionsByCampaign } = transactions();
const { imageFile, postCampaignImage } = useCampaignImage();

const selectFile = async (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    await postCampaignImage(route.params.id);
    fetchCampaignById(route.params.id); // Refresh campaign data after upload
  }
};

onMounted(() => {
  fetchCampaignById(route.params.id);
  getTransactionsByCampaign(route.params.id);
});
</script>
