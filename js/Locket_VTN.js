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

// Chỉ giữ key thật sự tồn tại trong binary
const flags = {
  // Badge / Gold
  badge_enabled: true,
  badgeVisible: true,
  should_display_badge: true,
  is_gold_user: true,
  enable_gold_badge_feature: true,
  gold_status: "unlocked",
  verified_gold_user: true,
  displayGoldBadge: true,

  // Video
  allow_video_record: true,
  recordSeconds: 60,
  max_record_duration: 60,
  long_video_unlocked: true
};

obj.subscriber = obj.subscriber || {};
obj.subscriber.subscriptions = {
  "com.ohoang7.premium.yearly": subscription
};
obj.subscriber.entitlements = {
  Gold: entitlement("com.ohoang7.premium.yearly"),
  Badge: entitlement("com.ohoang7.premium.yearly"),
  VideoRecord: entitlement("com.ohoang7.premium.yearly")
};
obj.subscriber.flags = flags;
obj.settings = flags;

$done({ body: JSON.stringify(obj) });
