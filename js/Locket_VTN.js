const obj = JSON.parse($response.body);

const purchaseDate = "2024-08-27T00:00:00Z";
const expiresDate = "2099-12-31T23:59:59Z";

const productId = "vip+watch_vip";

obj.subscriber ??= {};
obj.subscriber.subscriptions ??= {};
obj.subscriber.entitlements ??= {};
obj.subscriber.active_subscriptions ??= [];

obj.subscriber.subscriptions[productId] = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: expiresDate,
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: purchaseDate,
  purchase_date: purchaseDate,
  store: "app_store"
};

obj.subscriber.entitlements["Gold"] = {
  grace_period_expires_date: null,
  purchase_date: purchaseDate,
  product_identifier: productId,
  expires_date: expiresDate
};

obj.subscriber.active_subscriptions.push(productId);

$done({ body: JSON.stringify(obj) });
