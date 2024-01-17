import { User } from "./model/User";
import {
  validateName,
  validateAge,
  validateRollNumber,
  validateCourses,
} from "./utility/utils";
import { input } from "./utility/constants";

let flag = true;
let user: User | null = null;
console.log(
  "<-------------------------------------- Welcome to our application -------------------------------------->"
);
console.log(
  "Menu : \n1. Add User details. \n2. Display User details. \n3. Delete User detils. \n4. Save User details. \n5.Exit"
);
while (flag) {
  const inputChoice = input("Enter a choice form menu (1-5) : ");
  switch (inputChoice) {
    case "1":
      user = addUserDetails();
      break;
    case "2":
      if (user != null) {
        user.displayUserDetails();
      } else {
        console.log("No user details found");
      }
      break;
    case "3":
      const rollNumber = validateRollNumber(
        input("Enter roll number to be deleted : ")
      );

      // call add user details
      break;
    case "4":
      // call add user details
      break;
    case "5":
      console.log("Have a good day!");
      flag = false;
      break;
    default:
      console.log("Invalid input. Try Again!\n");
  }
}

function addUserDetails() {
  console.log("Kindly enter the following details about user : ");
  while (true) {
    try {
      const name = validateName(input("Full Name (space seperated): "));
      const age = validateAge(input("Age : "));
      const address = input("Address : ");
      const rollNumber = validateRollNumber(input("Roll Number: "));
      const courses = validateCourses(
        input("Set of courses (comma seperated 4 values) : ")
      );
      return new User(name, age, address, rollNumber, courses);
    } catch (error: any) {
      console.log(error.message);
      console.log("Try Again!\n");
    }
  }
}