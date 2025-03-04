import { ref } from "vue";
import { useRuntimeConfig } from "#imports";

export function useCampaignImage() {
  const config = useRuntimeConfig();
  const apiBase = config.public.API_BASE;
  const imageFile = ref(null);
  const isUploading = ref(false);
  const uploadError = ref("");

  const postCampaignImage = async (campaignId) => {
    if (!imageFile.value) {
      uploadError.value = "Pilih file terlebih dahulu.";
      return;
    }

    const formData = new FormData();
    formData.append("campaign_id", campaignId);
    formData.append("is_primary", true);
    formData.append("file", imageFile.value);

    try {
      isUploading.value = true;
      const token = localStorage.getItem("token");

      const response = await fetch(`${apiBase}/campaign-images`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Menggunakan token autentikasi
        },
        body: formData,
      });

      console.log("Response upload:", response);

      if (!response.ok) {
        throw new Error("Gagal mengunggah gambar.");
      }

      const result = await response.json();
      console.log("Upload berhasil:", result);
      return result;
    } catch (error) {
      console.error(error);
      uploadError.value = "Terjadi kesalahan saat mengunggah gambar.";
    } finally {
      isUploading.value = false;
    }
  };

  return {
    imageFile,
    isUploading,
    uploadError,
    postCampaignImage,
  };
}
