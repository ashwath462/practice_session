import * as fsPromise from "fs";
import { UsersData } from "../model/UsersData";
import { onlyLettersAndSpacesRegex } from "./constants";

export function validateName(userInput: any): string {
  if (!userInput.match(onlyLettersAndSpacesRegex)) {
    throw new Error("Name can't contain digits or special characters!");
  }
  userInput = userInput
    .replace(/\s{2,}/g, " ")
    .trim()
    .split(" ");
  const formattedName = userInput
    .map((element: string) => {
      return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
    })
    .join(" ");
  return formattedName;
}

export function validateAge(userInput: any): number {
  if (isNaN(userInput)) {
    throw new Error("Kindly enter a numeric value!");
  }
  const age = Number(userInput);
  if (age % 1 != 0) {
    throw new Error("Do not enter a decimal value");
  }
  if (age <= 0 || age >= 100) {
    throw new Error("Age can only be between 1-99");
  }
  return age;
}

function userAlreadyExists(rollNumber: number): number {
  const data = new UsersData().getUserData();
  const user = data.findIndex((user: any) => user.rollNumber === rollNumber);
  if (user !== -1) {
    throw new Error(`User with roll number ${rollNumber} already exist`);
  }
  return rollNumber;
}

export function validateRollNumber(
  userInput: any,
  toDelete: boolean = false
): number {
  if (isNaN(userInput)) {
    throw new Error("Kindly enter a numeric value!");
  }
  const rollNumber = Number(userInput);
  if (rollNumber % 1 != 0) {
    throw new Error("Do not enter a decimal value or 0");
  }
  if (rollNumber <= 0 || rollNumber >= 100000) {
    throw new Error("Age can only be between 1-99999");
  }
  if (toDelete) {
    return rollNumber;
  }
  return userAlreadyExists(rollNumber);
}

export function validateAddress(userInput: string) {
  userInput = userInput
    .replace(/\s{2,}/g, " ")
    .trim()
    .toLowerCase();
  if (userInput.length < 4) {
    throw new Error("Kindly enter valid input");
  }
  return userInput;
}

export function validateCourses(userInput: any): string[] {
  const courses = userInput.replace(/\s+/g, "").toUpperCase().split(",");
  courses.forEach((element: any) => {
    if (
      !(
        element == "A" ||
        element == "B" ||
        element == "C" ||
        element == "D" ||
        element == "E" ||
        element == "F"
      )
    ) {
      throw new Error("Enter valid courses!");
    }
  });
  return courses;
}

export function printUsersTable(headers: string[], usersData: any) {
  // Find maximum width for each column
  const columnWidths = headers.map((header, index) => {
    const maxWidth = Math.max(
      header.length,
      ...usersData.map((user: any) => {
        if (header === "courses") {
          return user[header].join(", ").length;
        } else {
          return String((user as any)[header]).length;
        }
      })
    );
    return maxWidth + 2; // Add padding for better readability
  });
  // Display column headers
  console.log(
    columnWidths.map((width, index) => headers[index].padEnd(width)).join(" | ")
  );
  // Display separator line
  console.log(
    "-".repeat(columnWidths.reduce((sum, width) => sum + width + 3, 0))
  );
  // Display user data
  usersData.forEach((user: any) => {
    console.log(
      columnWidths
        .map((width, index) => {
          if (headers[index] === "courses") {
            return (user as any)[headers[index]].join(", ").padEnd(width);
          } else {
            return String((user as any)[headers[index]]).padEnd(width);
          }
        })
        .join(" | ")
    );
  });
  return true;
}

export function sortBy(userInput:any){
  userInput = Number(userInput);
  if(!isNaN(userInput) && userInput>=1 && userInput<=4 && userInput%1 == 0){
    return userInput;
  }
  else throw new Error('Kindly enter a valid input!')
}