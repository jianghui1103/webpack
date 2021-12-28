import '@babel/polyfill';
function add(x, y) {
  return x + y;
}
console.log(add(2 + 3));
const a = 1;
const promise = new Promise((resolve)=> {
  setTimeout(()=> {
    resolve();
  }, 1000)
})
console.log(promise)

