// ========= ID ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

// Định nghĩa thông tin thuê bao
var ohoang7 = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2025-08-27T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2025-08-27T01:04:18Z",
  purchase_date: "2025-08-27T01:04:17Z",
  store: "app_store"
};

var vuong2023 = {
  grace_period_expires_date: null,
  purchase_date: "2025-08-27T01:04:17Z",
  product_identifier: "com.ohoang7.premium.yearly",
  expires_date: "2025-08-27T01:04:17Z"
};

// Xử lý theo mapping
const match = Object.keys(mapping).find(key => ua.includes(key));

if (match) {
  let [entitlement, product] = mapping[match];
  
  if (product) {
    vuong2023.product_identifier = product;
    obj.subscriber.subscriptions[product] = ohoang7;
  } else {
    obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = ohoang7;
  }

  obj.subscriber.entitlements[entitlement] = vuong2023;
} else {
  obj.subscriber.subscriptions["com.ohoang7.premium.yearly"] = ohoang7;
  obj.subscriber.entitlements.pro = vuong2023;
}

$done({ body: JSON.stringify(obj) });
