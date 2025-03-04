import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRuntimeConfig } from "#imports";

export function usePostCampaign() {
  const config = useRuntimeConfig();
  const apiBase = config.public.API_BASE;
  // State untuk form campaign
  const name = ref("");
  const description = ref("");
  const short_description = ref("");
  const goal_amount = ref("");
  const perks = ref("");

  // State untuk menampilkan error
  const showAlert = ref(false);
  const errorMessage = ref("");
  const router = useRouter(); // Gunakan Vue Router untuk navigasi

  // Fungsi untuk membuat campaign baru
  const createCampaign = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await $fetch(`${apiBase}/campaigns`, {
        method: "POST",
        body: {
          name: name.value,
          description: description.value,
          short_description: short_description.value,
          goal_amount: goal_amount.value,
          perks: perks.value,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Campaign berhasil dibuat:", response.data);

      // Redirect ke halaman detail campaign berdasarkan ID campaign yang baru dibuat
      if (response.data?.id) {
        router.push(`/dashboard/projects/${response.data.id}`);
      } else {
        console.error("Gagal mendapatkan ID campaign yang baru dibuat.");
      }
    } catch (error) {
      console.error("Gagal membuat campaign:", error);

      // Menampilkan pesan error
      errorMessage.value =
        error?.data?.meta?.message ||
        "Gagal membuat campaign, periksa kembali data yang kamu input.";

      // Tampilkan alert selama 2 detik
      showAlert.value = true;
      setTimeout(() => {
        showAlert.value = false;
      }, 2000);
    }
  };

  return {
    name,
    description,
    short_description,
    goal_amount,
    perks,
    showAlert,
    errorMessage,
    createCampaign,
  };
}
