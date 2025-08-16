const obj = JSON.parse($response.body);

// Subscription giả lập
const sub = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-08-27T01:04:17Z",
  purchase_date: "2024-08-27T01:04:17Z",
  store: "app_store"
};

// Entitlement giả
const ent = {
  grace_period_expires_date: null,
  purchase_date: "2024-08-27T01:04:17Z",
  product_identifier: "com.ohoang7.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

// Các flags & settings liên quan badge và quay video
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

// VPN Mỹ giả lập
const vpn = {
  status: "connected",
  country: "US",
  country_name: "United States",
  ip: "104.26.10.123",
  location: "Los Angeles, California, US",
  connection_type: "premium",
  expires_date: "2099-12-18T01:04:17Z",
  is_premium: true
};

// Inject vào các nhánh
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

// Thêm VPN giả
obj.subscriber.vpn = vpn;

// Inject settings riêng để bật toggle
obj.settings = {
  badge_enabled: true,
  can_toggle_badge: true,
  should_display_badge: true,
  is_gold_user: true
};

$done({ body: JSON.stringify(obj) });
