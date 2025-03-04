export const useCurrency = () => {
  const formatCurrency = (value) => {
    if (!value) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const calculatePercentage = (current, goal) => {
    if (!current || !goal || goal === 0) return "0%";
    return `${(current / goal) * 100}%`;
  };

  return { formatCurrency, calculatePercentage };
};

export function formatDate(dateString) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateString));
}
