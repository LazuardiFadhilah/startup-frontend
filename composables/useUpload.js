import { ref } from "vue";

export function useUpload() {
  const selectedFile = ref(null);
  const previewImage = ref(null);
  const showAlert = ref(false);
  const errorMessage = ref("");

  // Fungsi untuk menangani input file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      selectedFile.value = file;
      previewImage.value = URL.createObjectURL(file);
    }
  };

  // Fungsi untuk mengupload avatar ke server
  const uploadAvatar = async () => {
    if (!selectedFile.value) {
      errorMessage.value = "Pilih gambar terlebih dahulu!";
      showAlert.value = true;
      setTimeout(() => {
        showAlert.value = false;
      }, 2000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", selectedFile.value); // Sesuaikan dengan backend

      const response = await fetch("http://localhost:8080/api/v1/avatars", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Cek apakah response sukses
      if (!response.ok) {
        const errorResult = await response.json();
        console.error("Upload avatar gagal:", errorResult);
        errorMessage.value = errorResult.message || "Upload avatar gagal!";
        showAlert.value = true;
        return;
      }

      const result = await response.json();
      console.log("Upload avatar berhasil:", result);

      localStorage.setItem("image_url", result.data.image_url);

      navigateTo("/register-success");
    } catch (error) {
      console.error("Upload avatar gagal:", error);
      errorMessage.value = "Upload avatar gagal: Terjadi kesalahan server.";
      showAlert.value = true;

      setTimeout(() => {
        showAlert.value = false;
      }, 2000);
    }
  };

  return {
    selectedFile,
    previewImage,
    showAlert,
    errorMessage,
    handleFileUpload,
    uploadAvatar,
  };
}
