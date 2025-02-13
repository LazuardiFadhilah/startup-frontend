import { ref } from "vue";

export function useAuth() {
  // State untuk menyimpan input user
  const email = ref("");
  const password = ref("");
  const name = ref("");
  const occupation = ref("");

  // State untuk menampilkan error
  const showAlert = ref(false);
  const errorMessage = ref("");

  // Fungsi untuk menangani login
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

      // Simpan data ke localStorage jika token ditemukan
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
      console.error("Login gagal:", error);

      // Tampilkan pesan error yang lebih user-friendly
      errorMessage.value = "Login gagal! Periksa kembali email dan password.";
      showAlert.value = true;

      // Sembunyikan alert setelah 2 detik
      setTimeout(() => {
        showAlert.value = false;
      }, 2000);
    }
  };

  // Fungsi untuk menangani registrasi
  const register = async () => {
    try {
      const response = await $fetch("http://localhost:8080/api/v1/users", {
        method: "POST",
        body: {
          name: name.value,
          email: email.value,
          occupation: occupation.value,
          password: password.value,
        },
      });

      console.log("Register berhasil:", response);

      // Simpan data ke localStorage jika token ditemukan
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("user_id", response.data.id);
        navigateTo("/upload");
      } else {
        console.error("Token tidak ditemukan", response);
      }
    } catch (error) {
      console.error("Register gagal:", error);

      // Ambil pesan error dari API jika ada
      if (error?.data?.meta?.message) {
        errorMessage.value = error.data.meta.message;
      } else {
        errorMessage.value = "Register gagal: Terjadi kesalahan server.";
      }

      // Tampilkan alert selama 2 detik
      showAlert.value = true;
      setTimeout(() => {
        showAlert.value = false;
      }, 2000);
    }
  };

  // Return semua state dan function agar bisa digunakan di komponen lain
  return {
    email,
    password,
    name,
    occupation,
    showAlert,
    errorMessage,
    login,
    register,
  };
}
