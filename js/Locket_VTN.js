const obj = JSON.parse($response.body);

// 1. Cấu hình ngày tháng hợp lý (Năm 2023) để tránh bị app phát hiện fake
const purchaseDate = "2023-12-25T09:00:00Z";
const expiresDate = "2099-12-18T01:04:17Z";

// 2. Thông tin gói Gold chuẩn
const product_id = "com.locket.gold.yearly";
const entitlement_id = "Gold";

// 3. Object dữ liệu gói mua
const data = {
  "is_sandbox": false,
  "ownership_type": "PURCHASED",
  "billing_issues_detected_at": null,
  "period_type": "normal",
  "expires_date": expiresDate,
  "grace_period_expires_date": null,
  "unsubscribe_detected_at": null,
  "original_purchase_date": purchaseDate,
  "purchase_date": purchaseDate,
  "store": "app_store",
  "product_identifier": product_id
};

// 4. Object quyền lợi (Entitlement)
const ent = {
  "grace_period_expires_date": null,
  "purchase_date": purchaseDate,
  "product_identifier": product_id,
  "expires_date": expiresDate
};

// 5. BẮT BUỘC: Giả lập người dùng đời đầu (Original Version = 1)
if (obj.subscriber) {
  obj.subscriber.original_application_version = "1";
  obj.subscriber.original_purchase_date = "2022-01-01T00:00:00Z"; // Ngày ra mắt app
  
  // Khởi tạo object nếu chưa có
  obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
  obj.subscriber.entitlements = obj.subscriber.entitlements || {};

  // Xóa sạch các gói cũ để tránh xung đột
  // Inject gói Gold
  obj.subscriber.subscriptions[product_id] = data;
  obj.subscriber.entitlements[entitlement_id] = ent;
  
  // Inject thêm gói Pro dự phòng (trỏ về ID Gold)
  obj.subscriber.entitlements["pro"] = ent;
}

$done({ body: JSON.stringify(obj) });
