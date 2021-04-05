export function formatHour(hour: number, is12: boolean = false) {
  if (hour < 7 || hour > 24) {
    return "";
  }
  if (is12) return hour <= 12 ? `${hour}:00AM` : `${hour - 12}:00PM`;
  return `${hour}:00`
}
