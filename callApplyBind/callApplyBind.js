// Call JS function
const person = {
    first: 'Amartya',
    last: 'Mukherjee',
    greet: function (greeting) {
        console.log(`${this.first} ${this.last} says ${greeting}!`)
    }
}
person.greet('Hi')
const visitor = {
    first: 'Uncle Sam'
}
console.log('Call example')
person.greet.call(visitor, 'Howdy partner')

// Apply JS function
const num = [1,2,3,5,4,6,73,7,6]

function sum (...args) {
    console.log(args)
    let total = 0
    for (let arg of args) {
        total = total + arg
    }
    return total
}
console.log('Apply example')
sum(1,2,3)
const total = sum.apply(null, num)
console.log(total)

// Bind JS function

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
console.log('Bind example')
randomData.showData();
const boundedShowData = randomData.showData.bind(randomData2);
boundedShowData();