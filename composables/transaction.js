import { ref } from "vue";
import { useRouter } from "vue-router";

export function transactions() {
  const amount = ref("");
  const campaign_id = ref("");
  const paymentURL = ref("");
  const showAlert = ref(false);
  const errorMessage = ref("");
  const router = useRouter(); // Vue Router untuk navigasi

  const postTransactions = async () => {
    // Ambil token dari localStorage atau state management
    const token = localStorage.getItem("token");

    // Validasi input sebelum request
    if (!amount.value || !campaign_id.value) {
      errorMessage.value = "Harap isi semua kolom sebelum melakukan transaksi.";
      showAlert.value = true;
      setTimeout(() => {
        showAlert.value = false;
      }, 2000);
      return;
    }

    try {
      const response = await $fetch(
        "http://localhost:8080/api/v1/transactions/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Tambahkan Auth Token
          },
          body: JSON.stringify({
            amount: Number(amount.value),
            campaign_id: Number(campaign_id.value),
          }),
        }
      );

      console.log("Transaksi berhasil:", response);
      window.location.href = response.data.payment_url;
    } catch (error) {
      console.error("Transaksi gagal:", error);
      errorMessage.value =
        "Transaksi gagal, periksa kembali data yang kamu input.";
      showAlert.value = true;
      setTimeout(() => {
        showAlert.value = false;
      }, 2000);
    }
  };

  return {
    amount,
    campaign_id,
    showAlert,
    errorMessage,
    paymentURL,
    postTransactions,
  };
}
