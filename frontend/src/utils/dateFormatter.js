export const formatDate = (dateString) => {
  if (!dateString) return "-";

  try {
    let str = String(dateString).trim();
    if (!str) return "-";

    // Convert space separator in SQLite timestamps ("2026-08-19 22:45:18") to ISO T
    if (str.includes(" ") && !str.includes("T")) {
      str = str.replace(" ", "T");
    }

    if (!str.endsWith("Z") && !str.includes("+") && str.includes("T")) {
      str += "Z";
    }

    let d = new Date(str);
    if (isNaN(d.getTime())) {
      d = new Date(dateString);
      if (isNaN(d.getTime())) return String(dateString);
    }

    return d.toLocaleString("en-GB", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  } catch (err) {
    console.error("Format date error:", err);
    return String(dateString || "-");
  }
};
