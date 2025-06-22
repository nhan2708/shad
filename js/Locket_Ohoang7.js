// ======= Crack by nhan2708 ======= //
var obj = JSON.parse($response.body);

const nhan2708 = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "com.nhan2708.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

const subscription = {
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

// Gán gói đăng ký và quyền GOLD
obj.subscriber.subscriptions["com.nhan2708.premium.yearly"] = subscription;
obj.subscriber.entitlements["Gold"] = nhan2708;

obj.Attention = "🎉 Huy hiệu GOLD đã được bật!";
$done({ body: JSON.stringify(obj) });
