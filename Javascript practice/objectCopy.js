let obj = {
  name: 'Maha',
  age: 25,
  super: {
    hello: {
      hello1: true
    },
    supply: 1
  }
};

const objCopy = {};

for (let key in obj) {
  if (typeof obj[key] === 'object') {
    objCopy[key] = {};

    for (let prop in obj[key]) {
      if (typeof obj[key][prop] === 'object') {
        objCopy[key][prop] = {};

        for (let nesprop in obj[key][prop]) {
          objCopy[key][prop][nesprop] = obj[key][prop][nesprop];
        }
      } else {
        objCopy[key][prop] = obj[key][prop];
      }
    }
  } else {
    objCopy[key] = obj[key];
  }
}


function deepCopy(obj) {
  const newObj = {};

  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      newObj[key] = deepCopy(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}

let user1 = {
  name: 'user',
  count: 1,
  newObj: {
    prop1: {
      prop2: {
        hello: 1
      }
    }
  }
};

user1Copy = deepCopy(user1);

console.log(user1 === user1Copy);
console.log(user1.newObj === user1Copy.newObj);
console.log(user1.newObj.prop1 === user1Copy.newObj.prop1);
console.log(user1.newObj.prop1.prop2 === user1Copy.newObj.prop1.prop2);
console.log(user1.newObj.prop1.prop2.hello === user1Copy.newObj.prop1.prop2.hello);

