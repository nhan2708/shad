/***********************************************
 > deleteHeader by Ohoang7 x Nhan2708 - V1.0.2
 > Xóa hoặc ghi đè các header nhạy cảm từ request gửi đến RevenueCat
***********************************************/

const version = 'V1.0.2';

function setHeaderValue(headers, name, value) {
  const lower = name.toLowerCase();
  if (lower in headers) {
    headers[lower] = value;
  } else {
    headers[name] = value;
  }
}

let modifiedHeaders = $request.headers;
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
// setHeaderValue(modifiedHeaders, "Authorization", "");
// setHeaderValue(modifiedHeaders, "X-RevenueCat-User-ID", "");

$done({ headers: modifiedHeaders });
