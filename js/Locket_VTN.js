let obj = JSON.parse($response.body);

const subscription = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  original_purchase_date: "2008-08-27T01:04:17Z",
  purchase_date: "2008-08-27T01:04:17Z",
  store: "app_store"
};

const entitlement = (id) => ({
  purchase_date: "2008-08-27T01:04:17Z",
  product_identifier: id,
  expires_date: "2099-12-18T01:04:17Z"
});

// Các flag quan trọng
const flags = {
  is_gold_user: true,
  badge_enabled: true,
  long_video_unlocked: true,
  max_record_duration: 15
};

// Inject
obj.subscriber = obj.subscriber || {};
obj.subscriber.subscriptions = {
  "com.ohoang7.premium.yearly": subscription
};
obj.subscriber.entitlements = {
  Gold: entitlement("com.ohoang7.premium.yearly")
};
obj.subscriber.flags = flags;
obj.settings = flags;

$done({ body: JSON.stringify(obj) });
