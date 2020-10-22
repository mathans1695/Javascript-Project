function User(name, age) {
  this.classProperty = 5;
  this.classMethod = function() {
    return 'class method';
  }
  this.name = name;
  this.age = age;
  this.method1 = function() {
    return this.name;
  }

  User.property = 5;
  User.method = function() {
    return 'class method';
  }
}

User.prototype.method2 = function() {
  return this.age;
}

const user1 = new User('Maha', 24);

function Employee(name, age) {
  
}

Employee.prototype = User;


const emp1 = new Employee('Maha', 23);
console.log(emp1.method());


class User1 {
  classProperty = 5;
  classMethod = function() {
    return 'class method';
  }

  static staticProperty = 'static property man';
  static staticMethod = function() {
    return this.staticProperty;
  }

  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.method1 = function() {
      return this.name;
    }
  }

  method2() {
    return this.age;
  }
}


class Employee1 extends User1 {

}

const user2 = new User1('Suresh', 22);

const emp2 = new Employee1('Suresh', 22);

console.log(emp1);
console.log(emp2);