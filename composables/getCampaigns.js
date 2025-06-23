import { useRuntimeConfig } from "#imports";
import { ref } from "vue";

export function useCampaigns() {
  const config = useRuntimeConfig();
  const apiBase = config.public.API_BASE;
  // State untuk menyimpan daftar campaign
  const campaigns = ref([]);

  // Fungsi untuk mengambil data campaign dari API
  const getCampaignsData = async () => {
    try {
      // Ambil user_id dari localStorage, jika tidak ada maka default ke 0
      const user_id = parseInt(localStorage.getItem("user_id")) || 0;

      // Request pertama ke API menggunakan user_id dari localStorage
      let response = await $fetch(`${apiBase}/campaigns?user_id=${user_id}`);

      // Jika response kosong, coba ambil ulang dengan user_id = 0
      // if (!response.data || response.data.length === 0) {
      //   console.log(
      //     "Campaigns tidak ditemukan, mencoba mengambil dengan data default"
      //   );
      //   response = await $fetch(`${apiBase}/campaigns?user_id=0`);
      // }

      // Simpan hasil response ke state campaigns
      campaigns.value = response.data || [];

      console.log("Campaigns berhasil diambil:", campaigns.value);
    } catch (error) {
      console.error("Gagal mengambil campaign:", error);
      campaigns.value = []; // Reset data jika terjadi error
    }
  };

  return { campaigns, getCampaignsData };
}
