export default function useDateOptions() {
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) =>
    String(1900 + i)
  );
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1)); // 1~12
  const minutes = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0")); // 00~55
  const ampmList = ["AM", "PM"];

  return { years, months, days, hours, minutes, ampmList };
}
