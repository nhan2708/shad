
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['gold']
};



const ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
const obj = JSON.parse($response.body);

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

const subscriptionInfo = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-08-27T01:04:18Z",
  purchase_date: "2024-08-27T01:04:17Z",
  store: "app_store"
};

const entitlementInfo = {
  grace_period_expires_date: null,
  purchase_date: "2024-08-27T01:04:17Z",
  product_identifier: "com.nhan2708.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

obj.subscriber.subscriptions["com.nhan2708.premium.yearly"] = subscriptionInfo;
obj.subscriber.entitlements["gold"] = entitlementInfo;
obj.subscriber.entitlements["record_long"] = entitlementInfo;
obj.subscriber.entitlements["locket_gold_badge"] = entitlementInfo; // Bật công tắc Locket Gold badge

$done({ body: JSON.stringify(obj) });
