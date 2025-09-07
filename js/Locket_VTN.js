// ========= ID Mapping ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

// Thông báo cảnh báo
obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

var nhan2708 = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2025-08-27T01:04:18Z",
  purchase_date: "2025-08-27T01:04:17Z",
  store: "app_store"
};

var nhan2708_sub = {
  grace_period_expires_date: null,
  purchase_date: "2025-08-27T01:04:17Z",
  product_identifier: "com.ohoang7.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let [entitlement, product] = mapping[match];
  if (product) {
    nhan2708_sub.product_identifier = product;
    obj.subscriber.subscriptions[product] = nhan2708;
  } else {
    obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = nhan2708;
  }
  obj.subscriber.entitlements[entitlement] = nhan2708_sub;
} else {
  obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = nhan2708;
  obj.subscriber.entitlements.pro = nhan2708_sub;
}

$done({ body: JSON.stringify(obj) });
