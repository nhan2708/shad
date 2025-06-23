// ==== Unlock Full Locket (No Mapping) ====

const ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
const obj = JSON.parse($response.body);

// Gói đăng ký giả lập
const subscriptionInfo = {
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

// Entitlement chính
const entitlementInfo = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "com.ohoang7.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

// Các flags mở khóa tính năng ẩn
const recordFlags = {
  allow_15s_record: true,
  is_gold_user: true,
  badge_enabled: true,
  max_record_duration: 15,
  recordSeconds: 15,
  record_time_sec: 15,
  long_video_unlocked: true,
  can_record_long: true,
  feature_record_15s: true
};

// Gắn vào đối tượng subscriber
obj.subscriber = obj.subscriber || {};
obj.subscriber.subscriptions = {
  "com.ohoang7.premium.yearly": subscriptionInfo
};

obj.subscriber.entitlements = {
  Gold: entitlementInfo,
  record_long: entitlementInfo,
  badge: entitlementInfo
};

// Gắn flags vào mọi nhánh có thể app đang dùng
obj.subscriber.features = recordFlags;
obj.subscriber.flags = recordFlags;
obj.subscriber.permissions = recordFlags;
obj.subscriber.config = recordFlags;
obj.subscriber.record = recordFlags;

$done({ body: JSON.stringify(obj) });
