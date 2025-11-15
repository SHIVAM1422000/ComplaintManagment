// export default function autoPriority(tags, sentiment) {
//   if (sentiment < -3) return "high";
//   if (tags.includes("refund")) return "medium";
//   return "low";
// }

function autoPriority(tags, sentiment, message = "") {
  message = message.toLowerCase();

  // ============================
  // 1. SENTIMENT-BASED ESCALATION
  // ============================
  if (sentiment <= -7) return "critical"; // extremely angry / abusive / threatening
  if (sentiment <= -5) return "high";
  if (sentiment <= -3) return "high";

  // ============================
  // 2. HARD URGENCY WORDS (Time)
  // ============================
  const urgencyWords = [
    "urgent",
    "asap",
    "immediately",
    "right now",
    "can't wait",
    "cannot wait",
    "escalate",
    "escalation",
    "soon as possible",
    "today itself",
    "instantly",
    "priority",
    "important",
    "critical",
    "emergency",
    "fast",
    "faster",
    "quick",
    "quickly",
  ];

  const containsUrgency = urgencyWords.some(w => message.includes(w));
  if (containsUrgency) return "high";

  // ============================
  // 3. SECURITY / FRAUD KEYWORDS
  // ============================
  const securityKeywords = [
    "fraud",
    "scam",
    "unauthorized",
    "suspicious",
    "hacked",
    "hack",
    "stolen",
    "phishing",
    "compromised",
    "security breach",
    "identity theft",
  ];
  if (securityKeywords.some(w => message.includes(w))) return "critical";

  // ============================
  // 4. THREAT / LEGAL RISK
  // ============================
  const threatWords = [
    "legal",
    "lawsuit",
    "complaint to consumer court",
    "police",
    "case",
    "reporting",
    "social media post",
    "going viral",
  ];
  if (threatWords.some(w => message.includes(w))) return "critical";

  // ============================
  // 5. HIGH-PRIORITY TAGS
  // ============================
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
    "login",
    "password-reset",
    "security-issue",
    "identity-theft",
    "blocked",
    "subscription",
  ];
  if (tags.some(tag => highPriorityTags.includes(tag))) {
    return "high";
  }

  // ============================
  // 6. MEDIUM PRIORITY TAGS
  // ============================
  const mediumPriorityTags = [
    "delivery",
    "delay",
    "tracking",
    "wrong-item",
    "replacement-request",
    "subscription-change",
    "return-request",
    "pricing-complaint",
    "discounts",
    "address-change",
    "feedback",
  ];
  if (tags.some(tag => mediumPriorityTags.includes(tag))) {
    return "medium";
  }

  // ============================
  // 7. TIME-SENSITIVE KEYWORDS
  // ============================
  const timeKeywords = [
    "today",
    "tonight",
    "tomorrow",
    "deadline",
  ];
  if (timeKeywords.some(k => message.includes(k))) return "medium";

  // ============================
  // -8. Mild Negative Sentiment
  // ============================
  if (sentiment < 0) return "medium";

  // ============================
  // 9. DEFAULT
  // ============================
  return "low";
}

module.exports = {autoPriority};