import { question } from 'readline-sync';
import { add } from './utility/utils';

const numbers = question("Enter two numbers comma separated: ");
const numberArray = numbers.split(",").map((number:string) => parseFloat(number));

console.log("Sum of two number is: ", add(numberArray[0], numberArray[1]));