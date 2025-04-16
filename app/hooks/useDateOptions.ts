export default function useDateOptions() {
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => String(1900 + i));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const minutes = ["00", "30"];
  const ampmList = ["AM", "PM"];

  return { years, months, days, hours, minutes, ampmList };
}
