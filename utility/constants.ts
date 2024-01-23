import { question } from "readline-sync";

export function input(message: string) {
  const userInput = question(message);
  return userInput;
}

export const onlyLettersAndSpaces = /^[A-Za-z\s]*$/;
