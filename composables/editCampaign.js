import { ref } from "vue";
import { useRuntimeConfig } from "#imports";

const isLoading = ref(false);
const errorMessage = ref("");

async function editCampaign(id, updatedData) {
  const config = useRuntimeConfig();
  const apiBase = config.public.API_BASE;
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized - No Token Found");

    const response = await fetch(`${apiBase}/campaigns/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update campaign");
    }

    return await response.json(); //Berhasil, kembalikan data hasil update
  } catch (error) {
    errorMessage.value = error.message;
    console.error("Edit Campaign Error:", error);
  } finally {
    isLoading.value = false;
  }
}

export function useEditCampaign() {
  return { editCampaign, isLoading, errorMessage };
}
