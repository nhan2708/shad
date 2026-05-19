const obj = JSON.parse($response.body);

const purchaseDate = "2008-08-27T09:09:09Z";
const expiresDate = "2099-12-18T01:04:17Z";

const product_id = "com.locket.gold.yearly";

const subData = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  store: "app_store",
  purchase_date: purchaseDate,
  original_purchase_date: purchaseDate,
  expires_date: expiresDate,
  period_type: "normal",
  product_identifier: product_id
};

const entData = {
  product_identifier: product_id,
  purchase_date: purchaseDate,
  expires_date: expiresDate
};

if (obj.subscriber) {

  obj.subscriber.original_application_version = "1";
  obj.subscriber.original_purchase_date = purchaseDate;

  obj.subscriber.subscriptions ??= {};
  obj.subscriber.entitlements ??= {};
  obj.subscriber.active_subscriptions ??= [];

  obj.subscriber.subscriptions[product_id] = subData;

  obj.subscriber.entitlements["Gold"] = entData;
  obj.subscriber.entitlements["pro"] = entData;

  if (!obj.subscriber.active_subscriptions.includes(product_id)) {
    obj.subscriber.active_subscriptions.push(product_id);
  }
}

$done({ body: JSON.stringify(obj) });
