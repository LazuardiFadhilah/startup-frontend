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
        <h2 class="text-4xl text-gray-900 mb-2 font-medium">Dashboard</h2>
      </div>

      <!-- Create New Project Header & Edit Button -->
      <div class="flex justify-between items-center">
        <h3 class="text-2xl text-gray-900 mb-4">Create New Project</h3>
        <button
          @click="updateCampaign"
          class="bg-green-button hover:bg-green-700 text-white font-bold px-4 py-1 rounded"
        >
          Edit
        </button>
      </div>

      <!-- Form Section -->
      <div class="w-full border border-gray-400 bg-white rounded p-8 mb-4">
        <form @submit.prevent="updateCampaign" class="w-full">
          <div class="flex flex-wrap -mx-3 mb-6">
            <!-- Campaign Name -->
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-2"
                >Campaign Name</label
              >
              <input
                v-model="name"
                class="form-input"
                type="text"
                :placeholder="campaign?.name"
              />
            </div>

            <!-- Goal Amount -->
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-2"
                >Goal Amount</label
              >
              <input
                v-model="goal_amount"
                class="form-input"
                type="number"
                :placeholder="campaign?.goal_amount"
              />
            </div>

            <!-- Short Description -->
            <div class="w-full px-3">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-2 mt-3"
                >Short Description</label
              >
              <input
                v-model="short_description"
                class="form-input"
                type="text"
                :placeholder="campaign?.short_description"
              />
            </div>

            <!-- Perks -->
            <div class="w-full px-3">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-2"
                >What will backers get</label
              >
              <input
                v-model="perks"
                class="form-input"
                type="text"
                :placeholder="campaign?.perks"
              />
            </div>

            <!-- Description -->
            <div class="w-full px-3">
              <label
                class="block uppercase text-gray-700 text-xs font-bold mb-2"
                >Description</label
              >
              <textarea
                v-model="description"
                class="form-input"
                :placeholder="campaign?.description"
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
        <div v-if="errorMessage" class="mt-4 p-3 bg-red-500 text-white rounded">
          {{ errorMessage }}
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
definePageMeta({ middleware: "auth" });

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCampaign } from "@/composables/useCampaign";
import { useEditCampaign } from "@/composables/editCampaign";

const route = useRoute();
const router = useRouter();
const { campaign, fetchCampaignById } = useCampaign();
const { editCampaign, errorMessage } = useEditCampaign();

// State untuk form
const name = ref("");
const goal_amount = ref(null);
const short_description = ref("");
const perks = ref("");
const description = ref("");

// Fetch data campaign saat komponen dimuat
onMounted(async () => {
  await fetchCampaignById(route.params.id);
  if (campaign.value) {
    name.value = campaign.value.name;
    goal_amount.value = campaign.value.goal_amount;
    short_description.value = campaign.value.short_description;
    perks.value = Array.isArray(campaign.value.perks)
      ? campaign.value.perks.join(", ") // Ubah array jadi string
      : campaign.value.perks;
    description.value = campaign.value.description;
  }
});

// Fungsi untuk mengupdate campaign
const updateCampaign = async () => {
  const updatedData = {
    name: name.value,
    short_description: short_description.value,
    description: description.value,
    goal_amount: Number(goal_amount.value),
    perks: String(perks.value),
  };

  const result = await editCampaign(route.params.id, updatedData);
  if (result) {
    alert("Campaign updated successfully!");
    router.push(`/dashboard/projects/${route.params.id}`);
  }
};
</script>

<style scoped>
/* Styling untuk form input */
.form-input {
  @apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500;
}
</style>
