/*
  RevenueCat Cache Cleaner
  Author: nhan2708
*/

function removeHeader(headers, name) {
  delete headers[name];
  delete headers[name.toLowerCase()];
}

let headers = { ...$request.headers };

// Xóa cache headers
removeHeader(headers, "X-RevenueCat-ETag");
removeHeader(headers, "If-None-Match");
removeHeader(headers, "ETag");

$done({ headers });
