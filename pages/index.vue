<template>
  <div class="landing-page">
    <section class="landing-hero pt-5">
      <div class="header__bg"></div>
      <div class="container mx-auto relative">
        <Navbar />
        <div class="flex flex-col md:flex-row items-center pt-10 px-5 md:px-0">
          <div class="w-full md:w-1/2 text-center md:text-left">
            <h1 class="text-3xl md:text-4xl text-white mb-5">
              We helps <u class="hero-underline">startup</u> to <br />
              getting started & <u class="hero-underline">funding</u> <br />
              their truly needs
            </h1>
            <p class="text-white text-lg md:text-xl font-light mb-8">
              Fund the best idea to become <br />
              a real product and be the contributor
            </p>
            <button
              @click="$router.push({ path: '/' })"
              class="block bg-orange-button hover:bg-green-button text-white font-semibold px-6 md:px-12 py-3 text-lg md:text-xl justify-items-center lg:justify-items-start rounded-full"
            >
              Find a Project
            </button>
          </div>
          <div class="w-full md:w-1/2 flex justify-center mt-5 md:mt-0">
            <img
              src="/hero-image@2x.png"
              alt="crowdfunding project"
              class="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Steps Section -->
    <section class="container mx-auto pt-24">
      <div class="text-center mb-10">
        <h2 class="text-3xl text-gray-900 mb-8">
          Only 3 steps to execute <br />
          your bright ideas
        </h2>
      </div>

      <div class="w-full px-5 md:px-56 mb-5">
        <img src="/line-step.svg" alt="" class="w-full" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <StepItem
          imgSrc="/step-1-illustration.svg"
          title="Sign Up"
          description="Sign up account and start funding project"
        />
        <StepItem
          imgSrc="/step-2-illustration.svg"
          title="Open Project"
          description="Choose some project idea, and start funding"
        />
        <StepItem
          imgSrc="/step-3-illustration.svg"
          title="Execute"
          description="Time to make dreams come true"
        />
      </div>
    </section>

    <!-- Projects Section -->
    <section class="container mx-auto pt-24">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <h2 class="text-3xl text-gray-900 mb-8">
          New projects you can <br />
          take care of
        </h2>
        <button
          @click="toggleViewAll"
          class="text-gray-900 hover:underline text-md font-medium"
        >
          {{ viewAll ? "View less" : "View All" }}
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
        <ProjectCard
          v-for="campaign in limitedCampaigns"
          :key="campaign.id"
          :campaign="campaign"
          @click="handleProjectClick(campaign.id)"
        />
      </div>
    </section>

    <!-- Testimonial Section -->
    <section class="container mx-auto pt-24">
      <div class="text-center mb-10">
        <h2 class="text-3xl text-gray-900 mb-8">
          See What Our <br />
          Happy Clients Say
        </h2>
      </div>
      <TestimonialSection />
    </section>

    <div class="cta-clip -mt-20"></div>
    <CallToAction />
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCampaigns } from "~/composables/getCampaigns";
import { useCurrency } from "~/composables/useCurrency";
import StepItem from "@/components/StepItem.vue";
import ProjectCard from "@/components/ProjectCard.vue";
import TestimonialSection from "@/components/TestimonialSection.vue";

const { campaigns, getCampaignsData } = useCampaigns();
const { formatCurrency, calculatePercentage } = useCurrency();

const viewAll = ref(false);
const toggleViewAll = () => (viewAll.value = !viewAll.value);

const isAuthenticated = ref(false);

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem("token");
});

const handleProjectClick = (campaignId) => {
  if (!isAuthenticated.value) {
    alert("Anda harus login terlebih dahulu!");
    navigateTo("/login");
  } else {
    navigateTo(`/projects/${campaignId}`);
  }
};

const formattedCampaigns = computed(() =>
  campaigns.value.map((campaign) => ({
    ...campaign,
    formattedGoalAmount: formatCurrency(campaign.goal_amount),
    fundingPercentage: calculatePercentage(
      campaign.current_amount,
      campaign.goal_amount
    ),
  }))
);

const limitedCampaigns = computed(() =>
  viewAll.value
    ? formattedCampaigns.value
    : formattedCampaigns.value.slice(0, 3)
);

onMounted(getCampaignsData);
</script>
