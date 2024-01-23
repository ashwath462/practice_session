import { User } from "./model/User";
import {
  validateName,
  validateAge,
  validateAddress,
  validateRollNumber,
  validateCourses,
  sortUserChoice,
} from "./utility/utils";
import { input } from "./utility/constants";
import { UsersData } from "./model/UsersData";

let flag = true;
const userStore = new UsersData();
console.log(
  "<-------------------------------------- Welcome to our application -------------------------------------->"
);
while (flag) {
  console.log(
    "Menu : \n1. Add User details. \n2. Display User details. \n3. Delete User detils. \n4. Save User details. \n5. Exit"
  );
  const inputChoice = input("Enter a choice form menu (1-5) : ");
  console.clear();
  switch (inputChoice) {
    case "1":
      addUserDetails();
      break;
    case "2":
      console.clear();
      const inputChoice = sortUserChoice(input("Sort user by : \n1. Name \n2. Roll Number \n3. Age \n4. Address\n"));
      let flag:any = input('1. Ascending\n2. Descending\n');
      console.clear();
      if(flag == '1' || flag == '2'){
        flag = (flag == '1'? false:true);
      }
      else{
        console.log('Enter a valid input!');
        break;
      }
      console.log(inputChoice,flag);
      userStore.displayUserDetails(inputChoice,flag);
      break;
    case "3":
      const rollNumber = validateRollNumber(
        input("Enter roll number to be deleted : "),
        true
      );
      userStore.deleteUser(rollNumber);
      break;
    case "4":
      userStore.saveData();
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
  try {
    const name = validateName(input("Full Name (space seperated): "));
    const age = validateAge(input("Age : "));
    const address = validateAddress(input("Address : "));
    const rollNumber = validateRollNumber(input("Roll Number: "));
    const courses = validateCourses(
      input("Set of courses (comma seperated 4 values) : ")
    );
    userStore.appendUser(new User(name, age, address, rollNumber, courses));
    return;
  } catch (error: any) {
    console.log(error.message);
    console.log("Try Again!\n");
  }
}
