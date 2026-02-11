var obj = JSON.parse($response.body);

// Thông tin gói Gold ảo
var gold_id = "com.locket.gold.yearly";
var pro_id = "com.locket02.premium.yearly";

// Cấu hình chung cho gói mua
var purchase_data = {
  is_sandbox: !1,
  ownership_type: "PURCHASED",
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  original_purchase_date: "2008-08-27T01:04:17Z",
  purchase_date: "2008-08-27T01:04:17Z",
  store: "app_store"
};

var entitlement_data = {
  grace_period_expires_date: null,
  purchase_date: "2008-08-27T01:04:17Z",
  product_identifier: gold_id,
  expires_date: "2099-12-18T01:04:17Z"
};

// Chuẩn bị object nếu chưa có
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

// 1. Kích hoạt Subscription (Gán cả gói Gold và Premium)
obj.subscriber.subscriptions[gold_id] = purchase_data;
obj.subscriber.subscriptions[pro_id] = purchase_data;

// 2. Kích hoạt Entitlements (Gán tất cả các quyền có thể có)
// Gán quyền Gold
obj.subscriber.entitlements["Gold"] = entitlement_data;

// Gán quyền Pro (dùng ID khác chút)
var pro_entitlement = JSON.parse(JSON.stringify(entitlement_data));
pro_entitlement.product_identifier = pro_id;
obj.subscriber.entitlements["pro"] = pro_entitlement;

// Gán thêm các quyền phụ để chắc chắn
obj.subscriber.entitlements["vip"] = pro_entitlement;
obj.subscriber.entitlements["watch_vip"] = pro_entitlement;

obj.Attention = "Locket Gold Activated!";

$done({ body: JSON.stringify(obj) });
