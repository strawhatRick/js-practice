function createClosure(creator) {
  function executed(executor) {
    return `passed from parent - ${creator}, passed from child - ${executor}`;
  }
  return executed;
}
const example1 = createClosure("House");
const example2 = createClosure("Building");

console.log(example1("Bedroom"));
console.log(example2("Office"));
