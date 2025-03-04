import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRuntimeConfig } from "#imports";

export function transactions() {
  const config = useRuntimeConfig();
  const apiBase = config.public.API_BASE;
  // State untuk menyimpan input transaksi
  const amount = ref("");
  const campaign_id = ref("");
  const paymentURL = ref("");
  const showAlert = ref(false);
  const errorMessage = ref("");
  const router = useRouter();

  // State untuk menyimpan daftar transaksi user dan campaign
  const transactionsUser = ref([]);
  const transactionsCampaign = ref([]);

  // Fungsi untuk melakukan transaksi
  const postTransactions = async () => {
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
      const response = await $fetch(`${apiBase}/v1/transactions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: Number(amount.value), // Pastikan amount dikonversi ke number
          campaign_id: Number(campaign_id.value),
        }),
      });

      console.log("Transaksi berhasil:", response);
      window.location.href = response.data.payment_url; // Redirect ke URL pembayaran
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

  // Fungsi untuk mendapatkan daftar transaksi user
  const getTransactionsUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await $fetch(`${apiBase}/transactions/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Transaksi user:", response);
      transactionsUser.value = response.data;
    } catch (error) {
      console.log("Gagal mengambil transaksi user:", error);
    }
  };

  // Fungsi untuk mendapatkan daftar transaksi berdasarkan campaign
  const getTransactionsByCampaign = async (campaignId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await $fetch(
        `${apiBase}/campaigns/${campaignId}/transactions`, // Hapus spasi berlebih
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Transaksi campaign:", response);
      transactionsCampaign.value = response.data;
    } catch (error) {
      console.log("Gagal mengambil transaksi campaign:", error);
    }
  };

  // Return semua state dan fungsi yang dapat digunakan
  return {
    amount,
    campaign_id,
    showAlert,
    errorMessage,
    paymentURL,
    postTransactions,
    transactionsUser,
    getTransactionsUser,
    transactionsCampaign,
    getTransactionsByCampaign,
  };
}
