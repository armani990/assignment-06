1) Difference between var, let, and const

var

Function-scoped

Hoisted & initialized as undefined

Can be reassigned & redeclared

let

Block-scoped

Hoisted but not initialized (temporal dead zone)

Can be reassigned, cannot redeclare in same scope

const

Block-scoped

Hoisted but not initialized (temporal dead zone)

Cannot be reassigned or redeclared

Must be initialized during declaration

2) Difference between map(), forEach(), and filter()

forEach()

Iterates over array and performs an action

Returns undefined

Does not mutate original array

map()

Transforms each element and creates a new array

Returns new array

Does not mutate original array

filter()

Filters elements based on a condition

Returns new array

Does not mutate original array

3) Arrow functions in ES6

Shorter syntax for functions

Do not have their own this

Syntax:
const add = (a, b) => a + b;
const square = x => x * x;
const greet = () => "Hello";
4) Destructuring assignment in ES6

Allows extraction of values from arrays or objects into variables

Array destructuring:

const nums = [1, 2, 3];
const [a, b] = nums;
Object destructuring:

const person = { name: "Alice", age: 25 };
const { name, age } = person; 
const { name: n } = person;
5) Template literals in ES6

Strings using backticks `

Support embedded expressions: ${expression}

Support multi-line strings

const name = "Alice";
const age = 25;
const str = `Name: ${name}, Age: ${age}`;

const multiLine = `Line 1
Line 2`;