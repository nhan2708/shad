// ========= ID Mapping ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

// ========= Logic chính ========= //

const ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
const obj = JSON.parse($response.body);

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

// Thông tin gói đăng ký
const subscriptionInfo = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-07-28T01:04:18Z",
  purchase_date: "2024-07-28T01:04:17Z",
  store: "app_store"
};

// Thông tin entitlement
const entitlementInfo = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "com.ohoang7.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

// Tìm app khớp với User-Agent
const match = Object.keys(mapping).find(key => ua.includes(key));

if (match) {
  const [entitlementName] = mapping[match];

  obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = subscriptionInfo;

  obj.subscriber.entitlements[entitlementName] = entitlementInfo;
  obj.subscriber.entitlements["record_long"] = entitlementInfo;
  obj.subscriber.entitlements["badge"] = entitlementInfo;

} else {
  // Nếu không khớp UA
  obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = subscriptionInfo;

  obj.subscriber.entitlements["pro"] = entitlementInfo;
  obj.subscriber.entitlements["record_long"] = entitlementInfo;
  obj.subscriber.entitlements["badge"] = entitlementInfo;
}

$done({ body: JSON.stringify(obj) });
