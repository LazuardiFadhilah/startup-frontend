import { ref } from "vue";

export function useAuth() {
  const email = ref("");
  const password = ref("");
  const showAlert = ref(false);
  const errorMessage = ref("");

  const login = async () => {
    try {
      const response = await $fetch("http://localhost:8080/api/v1/sessions", {
        method: "POST",
        body: {
          email: email.value,
          password: password.value,
        },
      });
      console.log("Login berhasil:", response);
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.id);
        localStorage.setItem("image_url", response.data.image_url);
        localStorage.setItem("name", response.data.name);
        navigateTo("/");
      } else {
        console.error("Token tidak ditemukan", response);
      }
    } catch (error) {
      errorMessage.value = "Login gagal! Periksa kembali email dan password.";
      showAlert.value = true;
      setTimeout(() => {
        showAlert.value = false;
      }, 2000);
      console.log("Login gagal:", error);
    }
  };

  return {
    email,
    password,
    showAlert,
    errorMessage,
    login,
  };
}
