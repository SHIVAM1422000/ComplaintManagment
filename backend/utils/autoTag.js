export default function autoTag(message) {
  message = message.toLowerCase();
  const tags = [];

  // === ORDER / DELIVERY ================================
  if (message.includes("order")) tags.push("order");
  if (message.includes("track") || message.includes("tracking")) tags.push("tracking");
  if (message.includes("delivery")) tags.push("delivery");
  if (message.includes("delay") || message.includes("late")) tags.push("delay");
  if (message.includes("dispatch") || message.includes("shipped")) tags.push("shipping");
  if (message.includes("lost") || message.includes("missing")) tags.push("lost-package");

  // === PAYMENT / BILLING ================================
  if (message.includes("payment")) tags.push("payment");
  if (message.includes("failed") || message.includes("declined")) tags.push("payment-failed");
  if (message.includes("refund") || message.includes("money back")) tags.push("refund");
  if (message.includes("invoice") || message.includes("bill")) tags.push("billing");
  if (message.includes("charge") || message.includes("charged")) tags.push("overcharged");

  // === ACCOUNT / ACCESS =================================
  if (message.includes("login") || message.includes("log in")) tags.push("login");
  if (message.includes("password") || message.includes("reset")) tags.push("password-reset");
  if (message.includes("account")) tags.push("account");
  if (message.includes("blocked") || message.includes("locked")) tags.push("account-locked");

  // === PRODUCT COMPLAINTS ================================
  if (message.includes("broken") || message.includes("damaged")) tags.push("damaged-product");
  if (message.includes("defective") || message.includes("not working")) tags.push("defective");
  if (message.includes("wrong item") || message.includes("incorrect")) tags.push("wrong-item");
  if (message.includes("replacement")) tags.push("replacement-request");

  // === SUPPORT REQUESTS =================================
  if (message.includes("help") || message.includes("assist")) tags.push("support");
  if (message.includes("issue") || message.includes("problem")) tags.push("issue");
  if (message.includes("question") || message.includes("query")) tags.push("question");

  // === PRICING ==========================================
  if (message.includes("price") || message.includes("cost")) tags.push("pricing");
  if (message.includes("expensive") || message.includes("cheaper")) tags.push("pricing-complaint");
  if (message.includes("discount") || message.includes("offer")) tags.push("discounts");
  if (message.includes("coupon") || message.includes("promo")) tags.push("promo-code");

  // === FEEDBACK =========================================
  if (message.includes("feedback")) tags.push("feedback");
  if (message.includes("complaint")) tags.push("complaint");
  if (message.includes("bad") || message.includes("poor")) tags.push("negative-feedback");
  if (message.includes("amazing") || message.includes("great") || message.includes("good")) tags.push("positive-feedback");

  // === TECH ISSUES ======================================
  if (message.includes("bug") || message.includes("error")) tags.push("technical-issue");
  if (message.includes("crash") || message.includes("freeze")) tags.push("app-crash");
  if (message.includes("slow") || message.includes("lag")) tags.push("performance-issue");

  // === SHIPPING / LOCATION ==============================
  if (message.includes("address") || message.includes("location")) tags.push("address-issue");
  if (message.includes("change address")) tags.push("address-change");

  // === SUBSCRIPTION / MEMBERSHIP ========================
  if (message.includes("subscription")) tags.push("subscription");
  if (message.includes("renew") || message.includes("cancel")) tags.push("subscription-change");
  if (message.includes("membership")) tags.push("membership");

  // === MISC =============================================
  if (message.includes("return")) tags.push("return-request");
  if (message.includes("policy")) tags.push("policy");

  // === FALLBACK =========================================
  if (tags.length === 0) tags.push("general");

  return tags;
}
