<template>
  <div class="project-page">
    <!-- Navbar Section -->
    <section class="dashboard-header pt-5">
      <div class="container mx-auto relative">
        <Navbar />
      </div>
    </section>

    <!-- Dashboard Content -->
    <section class="container mx-auto pt-8">
      <div class="flex justify-between items-center mb-6">
        <div class="w-3/4 mr-6">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">Dashboard</h2>

          <!-- Navigation Links -->
          <ul class="flex mt-2">
            <li class="mr-6">
              <NuxtLink
                class="text-gray-500 hover:text-gray-800"
                to="/dashboard"
              >
                Your Projects
              </NuxtLink>
            </li>
            <li class="mr-6">
              <NuxtLink
                class="text-gray-800 font-bold"
                to="/dashboard/transactions"
              >
                Your Transactions
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <hr />

      <!-- Transactions List -->
      <div class="block mb-2">
        <div
          v-for="transaction in transactionsUser"
          :key="transaction.id"
          class="flex flex-row justify-between lg:w-full lg:flex mb-4 rounded-lg border-gray-400 border-2 p-[10px]"
        >
          <!-- Campaign Image -->
          <div
            class="basis-[20vw] bg-cover bg-center bg-no-repeat rounded-lg"
            :style="{
              backgroundImage: `url(${
                transaction.campaign.image_url
                  ? 'http://my-backend-production-2da4.up.railway.app/' +
                    transaction.campaign.image_url
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
                {{ transaction.campaign.name }}
              </div>
              <p class="text-sm text-gray-600 flex items-center mb-2">
                {{ formatCurrency(transaction.amount) }} -
                {{ formatDate(transaction.created_at) }} -
                {{ transaction.status }}
              </p>
              <p class="text-gray-700 text-base">
                {{ transaction.campaign.short_description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <div class="cta-clip -mt-20"></div>
    <section class="call-to-action bg-purple-progress pt-64 pb-10"></section>

    <!-- Footer Section -->
    <Footer />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
import { transactions } from "@/composables/transaction";
import { useCurrency } from "@/composables/useCurrency";
import { onMounted } from "vue";
import { formatDate } from "@/composables/useCurrency";

// Fetch transactions data
const { transactionsUser, getTransactionsUser } = transactions();
const { formatCurrency } = useCurrency();

// Load transactions data on component mount
onMounted(() => {
  getTransactionsUser(); // Memanggil fungsi untuk mengambil data transaksi user
});
</script>
