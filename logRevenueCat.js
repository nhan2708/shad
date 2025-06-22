const obj = JSON.parse($response.body);
console.log("====== START LOG RevenueCat ======");
console.log(JSON.stringify(obj, null, 2));
console.log("====== END LOG RevenueCat ======");
$done({ body: $response.body });
