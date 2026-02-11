const obj = JSON.parse($response.body);
const date = "2008-08-27T01:04:17Z";
const gold_id = "com.locket.gold.yearly";

const sub = {
  is_sandbox: !1,
  ownership_type: "PURCHASED",
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  original_purchase_date: date,
  purchase_date: date,
  store: "app_store"
};

const ent = {
  grace_period_expires_date: null,
  purchase_date: date,
  product_identifier: gold_id,
  expires_date: "2099-12-18T01:04:17Z"
};

// Làm sạch và ép gói Gold
obj.subscriber.subscriptions = {};
obj.subscriber.subscriptions[gold_id] = sub;

obj.subscriber.entitlements = {};
obj.subscriber.entitlements["Gold"] = ent;

// Thêm Pro dự phòng (trỏ về ID Gold) để tránh lỗi tính năng
obj.subscriber.entitlements["pro"] = ent;

$done({ body: JSON.stringify(obj) });
