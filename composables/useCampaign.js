import { ref } from "vue";
import { useRuntimeConfig } from "#imports";

export function useCampaign() {
  const config = useRuntimeConfig();
  const apiBase = config.public.API_BASE;
  const campaign = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  const fetchCampaignById = async (id) => {
    isLoading.value = true;
    error.value = null; // Reset error sebelum melakukan fetch

    try {
      const response = await fetch(`${apiBase}/campaigns/${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch campaign: ${response.statusText}`);
      }

      const result = await response.json(); // Simpan hasil response
      campaign.value = result.data; // Ambil hanya `data`
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching campaign:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return { campaign, isLoading, error, fetchCampaignById };
}
