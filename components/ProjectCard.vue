<template>
  <div
    class="card-project w-full lg:h-[550px] p-5 border border-gray-500 rounded-20"
  >
    <figure class="item-image">
      <img
        :src="'http://localhost:8080/' + campaign.image_url"
        alt=""
        class="rounded-20 w-full"
      />
    </figure>
    <div class="item-meta">
      <h4
        class="text-3xl font-medium text-gray-900 mt-5 overflow-hidden text-ellipsis whitespace-nowrap"
      >
        {{ campaign?.name || "loading..." }}
      </h4>
      <p
        class="text-md overflow-hidden text-ellipsis whitespace-nowrap font-light text-gray-900 h-12"
      >
        {{ campaign?.short_description }}
      </p>

      <!-- Progress Bar -->
      <div class="relative pt-4 progress-bar">
        <div
          class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 h-3 rounded-lg"
        >
          <div
            :style="{ width: campaign.fundingPercentage }"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-progress progress-striped"
          ></div>
        </div>
      </div>

      <div class="flex progress-info">
        <div>{{ campaign.fundingPercentage }}</div>
        <div class="ml-auto font-semibold">
          {{ campaign.formattedGoalAmount }}
        </div>
      </div>

      <!-- Fund Now Button -->
      <nuxt-link
        :to="`/projects/${campaign.id}`"
        class="text-center mt-5 button-cta block w-full bg-orange-button hover:bg-green-button text-white font-semibold px-6 py-2 text-lg rounded-full"
      >
        Fund Now
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  campaign: Object,
});
</script>
