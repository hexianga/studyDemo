setInterval(() => {
  console.log('test');
}, 2 * 1000);
self.addEventListener('install', function (event) {
  console.log('install');
});
console.log('install');


self.addEventListener('activate', function (event) {
  console.log('activate');
});
