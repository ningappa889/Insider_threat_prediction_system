export const formatDate = (dateString) => {
  if (!dateString) return "-";

  const utcString =
    typeof dateString === "string" &&
    !dateString.endsWith("Z") &&
    !dateString.includes("+")
      ? dateString + "Z"
      : dateString;

  return new Date(utcString).toLocaleString("en-GB", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};
