// export default function autoPriority(tags, sentiment) {
//   if (sentiment < -3) return "high";
//   if (tags.includes("refund")) return "medium";
//   return "low";
// }

export default function autoPriority(tags, sentiment, message = "") {
  message = message.toLowerCase();

  // === 1. Sentiment-Based Escalation ============================
  if (sentiment <= -5) return "critical"; // super angry / abusive
  if (sentiment <= -3) return "high"; // very negative tone

  // === 2. Keyword-based urgency =================================
  const urgentWords = [
    "urgent",
    "asap",
    "immediately",
    "right now",
    "can't wait",
    "escalate",
    "escalation",
    "important",
  ];
  const containsUrgent = urgentWords.some((word) => message.includes(word));
  if (containsUrgent) return "high";

  // === 3. High-Priority Tags ====================================
  const highPriorityTags = [
    "payment-failed",
    "refund",
    "overcharged",
    "account-locked",
    "lost-package",
    "defective",
    "damaged-product",
    "technical-issue",
    "app-crash",
    "performance-issue",
  ];
  if (tags.some((tag) => highPriorityTags.includes(tag))) {
    return "high";
  }

  // === 4. Medium-Priority Tags ==================================
  const mediumPriorityTags = [
    "delivery",
    "delay",
    "tracking",
    "wrong-item",
    "replacement-request",
    "subscription-change",
    "return-request",
    "pricing-complaint",
  ];
  if (tags.some((tag) => mediumPriorityTags.includes(tag))) {
    return "medium";
  }

  // === 5. Mild Negative Sentiment ================================
  if (sentiment < 0) return "medium";

  // === 6. Default =================================================
  return "low";
}
