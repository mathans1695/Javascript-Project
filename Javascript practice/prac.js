function hash(...args) {
  let map = new Map();
  let next = map;

  for (let i=0; i<args.length; i++) {
    if (args.length-1 === i) {
      next.set(args[i], null);
    } else {
      next.set(args[i], new Map());
      next = next.get(args[i]);
    }
  }

  return map;
}


let hashing = hash(1, 2, 3, 4, 5);

let iterator = hashing[Symbol.iterator]();
let result = 0;

while(true) {
  const current = iterator.next();
  if (current.value[1] == null) {
    result = current.value[1];
    break;
  } else {
    iterator = current.value[1][Symbol.iterator]();
  }
}

console.log(result);
