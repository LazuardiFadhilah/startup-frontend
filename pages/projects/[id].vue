<template>
  <div class="project-page">
    <!-- Navbar Section -->
    <section class="project-header pt-5 px-[100px] mx-auto">
      <Navbar />
    </section>

    <!-- Main Project Content -->
    <section class="container project-container mx-auto -mt-56">
      <div class="flex mt-3">
        <!-- Left Column: Project Image -->
        <div class="w-3/4 mr-6">
          <div class="bg-white p-3 mb-3 border border-gray-400 rounded-20">
            <figure class="item-image">
              <img
                :src="
                  campaign?.image_url
                    ? `http://localhost:8080/${campaign.image_url}`
                    : '/project-image.jpg'
                "
                alt="Project Image"
                class="rounded-20 w-full"
              />
            </figure>
          </div>

          <!-- Thumbnail Images -->
          <div class="flex -mx-2">
            <div
              v-for="(imageObj, index) in campaign?.images?.length
                ? campaign.images
                : defaultImages"
              :key="index"
              class="relative w-1/4 bg-white m-2 p-2 border border-gray-400 rounded-20"
            >
              <figure class="item-thumbnail">
                <img
                  :src="`http://localhost:8080/${
                    imageObj.image_url || imageObj
                  }`"
                  alt="Thumbnail"
                  class="rounded-20 w-full"
                />
              </figure>
            </div>
          </div>
        </div>

        <!-- Right Column: Project Leader & Funding Section -->
        <div class="w-1/4">
          <div
            class="bg-white w-full p-5 border border-gray-400 rounded-20 sticky"
            style="top: 15px"
          >
            <h3>Project Leader:</h3>
            <div class="flex mt-3">
              <div>
                <img
                  :src="`http://localhost:8080/${
                    campaign?.user?.image_url || 'avatar.jpg'
                  }`"
                  class="w-16 aspect-square object-cover rounded-full"
                />
              </div>
              <div class="w-3/4 ml-5 mt-1">
                <div class="font-semibold text-xl text-gray-800">
                  {{ campaign?.user.name || "Loading..." }}
                </div>
                <div class="font-light text-md text-gray-400">
                  {{ campaign?.backer_count || 0 }} backers
                </div>
              </div>
            </div>

            <!-- Perks List -->
            <h4 class="mt-5 font-semibold">What will you get:</h4>
            <ul class="list-check mt-3">
              <li v-for="(perk, index) in campaign?.perks" :key="index">
                {{ perk }}
              </li>
            </ul>

            <!-- Funding Input & Button -->
            <input
              type="number"
              v-model="amount"
              class="border border-gray-500 block w-full px-6 py-3 mt-4 rounded-full text-gray-800"
              placeholder="Amount in Rp"
            />
            <button
              @click="postTransactions"
              class="text-center mt-3 button-cta block w-full bg-orange-button hover:bg-green-button text-white font-medium px-6 py-3 text-md rounded-full"
            >
              Fund Now
            </button>
            <!-- Alert Error -->
            <Alert :show="showAlert" :message="errorMessage" />
          </div>
        </div>
      </div>
    </section>

    <!-- Project Details Section -->
    <section class="container mx-auto pt-8">
      <div class="flex justify-between items-center">
        <div class="w-full md:w-3/4 mr-6">
          <h2 class="text-4xl text-gray-900 mb-2 font-medium">
            {{ isLoading ? "Loading..." : campaign?.name }}
          </h2>
          <p class="font-light text-xl mb-5">
            {{
              isLoading
                ? "Fetching description..."
                : campaign?.short_description
            }}
          </p>

          <!-- Progress Bar -->
          <div class="relative progress-bar">
            <div
              class="overflow-hidden mb-4 text-xs flex rounded-full bg-gray-200 h-6"
            >
              <div
                :style="{ width: formattedCampaign?.fundingPercentage || '0%' }"
                class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-progress progress-striped"
              ></div>
            </div>
          </div>

          <!-- Progress Information -->
          <div class="flex progress-info mb-6">
            <div class="text-2xl">
              {{ formattedCampaign?.fundingPercentage || "0%" }}
            </div>
            <div class="ml-auto font-semibold text-2xl">
              {{ formattedCampaign?.formattedGoalAmount || "Rp 0" }}
            </div>
          </div>

          <p class="font-light text-xl mb-5">
            {{ campaign?.description || "Loading description..." }}
          </p>
        </div>
      </div>
    </section>

    <!-- Call to Action & Footer -->
    <div class="cta-clip -mt-20"></div>
    <CallToAction />
    <Footer />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useCampaign } from "~/composables/useCampaign";
import { computed, onMounted, ref } from "vue";
import { useCurrency } from "~/composables/useCurrency";
import { transactions } from "~/composables/transaction";

const route = useRoute();
const { campaign, isLoading, fetchCampaignById } = useCampaign();
const { formatCurrency, calculatePercentage } = useCurrency();
const { amount, campaign_id, showAlert, errorMessage, postTransactions } =
  transactions();

// Gambar default jika campaign tidak memiliki gambar tambahan
const defaultImages = ref([
  "/project-slider-1.jpg",
  "/project-slider-2.jpg",
  "/project-slider-3.jpg",
  "/project-slider-4.jpg",
]);

// Format campaign data
const formattedCampaign = computed(() => {
  if (!campaign?.value) return null;

  return {
    ...campaign.value,
    formattedGoalAmount: formatCurrency(campaign.value.current_amount),
    fundingPercentage: calculatePercentage(
      campaign.value.current_amount,
      campaign.value.goal_amount
    ),
  };
});

// Fetch campaign data saat komponen dimuat
onMounted(() => {
  fetchCampaignById(route.params.id);
  campaign_id.value = route.params.id;
});
</script>
