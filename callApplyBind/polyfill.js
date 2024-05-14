Function.prototype.myCall = function (context, ...args) {
  let fn = Symbol();
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
};

Function.prototype.myApply = function (context, ...args) {
  let fn = Symbol();
  context[fn] = this;
  const res = context[fn](...args[0]);
  delete context[fn];
  return res;
};

Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function boundFn(...passedArgs) {
    return fn.myApply(context, [...args, ...passedArgs]);
  };
};

// Call JS function - polyfill
const person = {
  first: "Amartya",
  last: "Mukherjee",
  greet: function (greeting) {
    console.log(`${this.first} ${this.last} says ${greeting}!`);
  },
};
person.greet("Hi");
const visitor = {
  first: "Uncle Sam",
};
console.log("Call example");
person.greet.myCall(visitor, "Howdy partner");

// Apply JS function - polyfill
const num = [1, 2, 3, 5, 4, 6, 73, 7, 6];

function sum(...args) {
  console.log(args);
  let total = 0;
  for (let arg of args) {
    total = total + arg;
  }
  return total;
}
console.log("Apply example");
sum(1, 2, 3);
const total = sum.myApply({}, num);
console.log(total);

// Bind JS function - polyfill

const randomData = {
  name: "Amartya",
  num: [1, 0, 1, 1, 3, 6, 3, 1, 9],
  adder: function () {
    let res = 0;
    for (let i = 0; i < this.num.length; i++) {
      res += this.num[i];
    }
    return res;
  },
  showData: function () {
    console.log(
      `${this.name} has received ${
        this.num
      } respectively, which adds to ${this.adder()}`
    );
  },
};
const randomData2 = {
  name: "AmartyaProMaxUltra",
  num: [1, 2, 3, 5, 4, 6, 73, 7, 6],
  adder: function () {
    let res = 0;
    for (let i = 0; i < this.num.length; i++) {
      res += this.num[i];
    }
    return res;
  },
};
console.log("Bind example");
randomData.showData();
const boundedShowData = randomData.showData.myBind(randomData2);
boundedShowData();
