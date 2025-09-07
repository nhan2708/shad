

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

$done({ headers: modifiedHeaders });
