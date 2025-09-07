const obj = JSON.parse($response.body);

// Template cho subscription
const subscription = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2008-08-27T01:04:17Z",
  purchase_date: "2008-08-27T01:04:17Z",
  store: "app_store"
};

// Hàm tạo entitlement nhanh
const entitlement = (id) => ({
  grace_period_expires_date: null,
  purchase_date: "2008-08-27T01:04:17Z",
  product_identifier: id,
  expires_date: "2099-12-18T01:04:17Z"
});

// Gom toàn bộ flag badge + video
const flags = {
  // Badge / Gold
  badge_enabled: true,
  badgeVisible: true,
  should_display_badge: true,
  is_gold_user: true,
  enable_gold_badge_feature: true,
  gold_status: "unlocked",
  verified_gold_user: true,
  unlockBadge: true,
  awardBadge: true,
  displayGoldBadge: true,

  // Video
  allow_video_record: true,
  recordSeconds: 15,
  max_record_duration: 15,
  long_video_unlocked: true,
  startVideoRecording: true,
  stopVideoRecording: true,
  recordingFinished: true,
  recordingDidFail: false
};

// Build subscriber
obj.subscriber = {
  subscriptions: {
    "com.ohoang7.premium.yearly": subscription
  },
  entitlements: {
    Gold: entitlement("com.ohoang7.gold"),
    Badge: entitlement("com.ohoang7.badge"),
    RecordLong: entitlement("com.ohoang7.recordlong")
  },
  features: flags,
  flags,
  permissions: flags,
  badge: flags,
  config: flags,
  record: flags
};

// Settings chung
obj.settings = flags;

$done({ body: JSON.stringify(obj) });
