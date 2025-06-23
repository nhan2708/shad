const obj = JSON.parse($response.body);

// Subscription giả
const sub = {
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

// Entitlement giả
const ent = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "com.ohoang7.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

// Flags bật badge + quay 15s
const flags = {
  is_gold_user: true,
  badge_enabled: true,
  badgeVisible: true,
  unlock_gold: true,
  verified_gold_user: true,
  can_toggle_badge: true,
  enable_gold_badge_feature: true,
  gold_status: "unlocked",
  allow_15s_record: true,
  recordSeconds: 15,
  max_record_duration: 15,
  long_video_unlocked: true
};

// Inject dữ liệu vào tất cả nơi có thể
obj.subscriber = obj.subscriber || {};
obj.subscriber.subscriptions = {
  "com.ohoang7.premium.yearly": sub
};
obj.subscriber.entitlements = {
  Gold: ent,
  badge: ent,
  record_long: ent
};
obj.subscriber.features = flags;
obj.subscriber.flags = flags;
obj.subscriber.permissions = flags;
obj.subscriber.badge = flags;
obj.subscriber.config = flags;
obj.subscriber.record = flags;

// Ép settings để bật toggle tạm thời
obj.settings = {
  badge_enabled: true,
  can_toggle_badge: true,
  should_display_badge: true,
  is_gold_user: true
};

$done({ body: JSON.stringify(obj) });
