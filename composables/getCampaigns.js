export function useCampaigns() {
  const campaigns = ref([]);

  const getCampaignsData = async () => {
    try {
      const user_id = parseInt(localStorage.getItem("user_id")) || 0;
      const response = await $fetch(
        `http://localhost:8080/api/v1/campaigns?user_id=${user_id}`
      );
      console.log("Campaigns berhasil diambil:", response.data);
      campaigns.value = response.data;
      console.log("campaigns data from get Campaigns", campaigns.value);
    } catch (error) {
      console.error("Campaigns gagal diambil:", error);
      campaigns.value = [];
    }
  };

  return { campaigns, getCampaignsData };
}
