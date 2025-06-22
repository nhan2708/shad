// ========= ID Mapping ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

// ========= Logic chính ========= //
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

var ohoang7 = {
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

var nhan2708 = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "com.ohoang7.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [entitlement, sub_id] = mapping[match];
  if (sub_id) {
    nhan2708.product_identifier = sub_id;
    obj.subscriber.subscriptions[sub_id] = ohoang7;
  } else {
    obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = ohoang7;
  }

  obj.subscriber.entitlements[entitlement] = nhan2708;
  obj.subscriber.entitlements["locketcamera"] = nhan2708;
  obj.subscriber.subscriptions["locketcamera"] = ohoang7;

} else {
  obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = ohoang7;
  obj.subscriber.entitlements.pro = nhan2708;
  obj.subscriber.entitlements["locketcamera"] = nhan2708;
  obj.subscriber.subscriptions["locketcamera"] = ohoang7;
}

// Gợi ý thêm: bật cờ huy hiệu nếu app có dùng
obj.subscriber.features = {
  "badge_enabled": true,
  "show_gold_badge": true,
  "record_limit": 15
};

obj.badge_enabled = true;
obj.show_gold_badge = true;

$done({ body: JSON.stringify(obj) });
