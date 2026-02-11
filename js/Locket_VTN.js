const obj = JSON.parse($response.body);
const ua = $request.headers["User-Agent"] || $request.headers["user-agent"];

// ID gói Gold ảo
const goldPid = "com.locket.gold.yearly";

const sub = {
  is_sandbox: !1,
  ownership_type: "PURCHASED",
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  original_purchase_date: "2008-08-27T01:04:17Z",
  purchase_date: "2008-08-27T01:04:17Z",
  store: "app_store"
};

const ent = {
  grace_period_expires_date: null,
  purchase_date: "2008-08-27T01:04:17Z",
  product_identifier: goldPid,
  expires_date: "2099-12-18T01:04:17Z"
};

// Đảm bảo cấu trúc object tồn tại
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

// Inject gói Gold
obj.subscriber.subscriptions[goldPid] = sub;
obj.subscriber.entitlements["Gold"] = ent; 

// Inject thêm gói Premium thường để tránh lỗi
obj.subscriber.subscriptions["com.locket02.premium.yearly"] = sub;
obj.subscriber.entitlements["pro"] = ent;

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

$done({ body: JSON.stringify(obj) });
