/*
  Locket Gold Unlocker 
  Author: nhan2708 
  Support: Shadowrocket, Loon, Quantumult X
*/

const url = $request.url;
const method = $request.method;

// --- PHẦN 1: REQUEST (XÓA CACHE HEADER) ---
// Chạy khi script type=http-request
if (typeof $response === "undefined") {
  const headers = $request.headers;
  // Xóa ETag để ép server trả về dữ liệu mới (để hiện Badge)
  delete headers["X-RevenueCat-ETag"];
  delete headers["x-revenuecat-etag"];
  // Xóa If-None-Match nếu có
  delete headers["If-None-Match"];
  
  $done({ headers });
}

// --- PHẦN 2: RESPONSE (HACK GÓI GOLD) ---
// Chạy khi script type=http-response
else {
  const obj = JSON.parse($response.body);
  
  // Cấu hình ngày tháng (Năm 2023 để hợp lệ với Locket)
  const purchaseDate = "2008-08-27T09:09:09Z";
  const expiresDate = "2099-12-18T01:04:17Z";
  const product_id = "com.locket.gold.yearly";
  const entitlement_id = "Gold";

  // Data gói mua
  const subData = {
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

  // Data quyền lợi
  const entData = {
    "grace_period_expires_date": null,
    "purchase_date": purchaseDate,
    "product_identifier": product_id,
    "expires_date": expiresDate
  };

  if (obj.subscriber) {
    // QUAN TRỌNG: Giả lập user cũ để hiện Badge
    obj.subscriber.original_application_version = "1";
    obj.subscriber.original_purchase_date = "2008-08-27T00:00:00Z";

    // Khởi tạo object
    if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
    if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

    // Inject Gold
    obj.subscriber.subscriptions[product_id] = subData;
    obj.subscriber.entitlements[entitlement_id] = entData;

    // Inject Pro dự phòng (trỏ về Gold)
    obj.subscriber.entitlements["pro"] = entData;
  }
  
  $done({ body: JSON.stringify(obj) });
}
