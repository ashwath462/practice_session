import * as fsPromise from "fs";
import { User } from "./User";
import { File } from "./File";
import { DATABASE_FILE } from "../utility/constants";
import { printUsersTable } from "../utility/utils";

export class UsersData {
  private usersData: User[];
  constructor() {
    //Loading data from disk to in-memory
    const data = fsPromise.readFileSync(DATABASE_FILE, "utf8");
    let allUsers: any = data.split(",").slice(1);

    allUsers = allUsers.map((element: any) => {
      let bufferObj = Buffer.from(element, "base64");
      return JSON.parse(bufferObj?.toString("utf8"));
    });
    this.usersData = allUsers;
  }

  public getUserData() {
    return this.usersData;
  }

  public displayUserDetails(inputChoice:number,sortOrder:boolean) {
    if(inputChoice == 1){
      this.usersData = this.sortByName(this.usersData,sortOrder);
    }else if(inputChoice == 2){
      this.usersData = this.sortByRoleNumber(this.usersData,sortOrder);
    }else if(inputChoice == 3){
      this.usersData = this.sortByAge(this.usersData, sortOrder);
    }else {
      this.usersData = this.sortByAddress(this.usersData,sortOrder);
    }
    const headers = ["name", "age", "address", "rollNumber", "courses"];
    return printUsersTable(headers,this.usersData);
  }

  public sortByName(usersData: any, descOrder: boolean = false) {
    usersData.sort((a: any, b: any) => {
      if (descOrder) {
        const nameComparison = b.name.localeCompare(a.name);
        return nameComparison !== 0
          ? nameComparison
          : b.rollNumber - a.rollNumber;
      }
      const nameComparison = a.name.localeCompare(b.name);
      return nameComparison !== 0
        ? nameComparison
        : a.rollNumber - b.rollNumber;
    });
    return usersData;
  }

  public sortByRoleNumber(usersData: any, descOrder: boolean = false) {
    usersData.sort((a: any, b: any) => {
      if (descOrder) return b.rollNumber - a.rollNumber;
      return a.rollNumber - b.rollNumber;
    });
    return usersData;
  }

  public sortByAge(usersData: any, descOrder: boolean = false) {
    usersData.sort((a: any, b: any) => {
      if (descOrder) return b.age - a.age;
      return a.age - b.age;
    });
    return usersData;
  }

  public sortByAddress(usersData: any, descOrder: boolean = false) {
    usersData.sort((a: any, b: any) => {
      if (descOrder) return b.address.localeCompare(a.address);
      return a.address.localeCompare(b.address);
    });
    return usersData;
  }

  public appendUser(userInput: User) {
    this.usersData.push(userInput);
    return true;
  }

  public deleteUser(rollNumber: number) {
    const indexToRemove = this.usersData.findIndex(
      (user: any) => user.rollNumber === rollNumber
    );
    if (indexToRemove !== -1) {
      this.usersData.splice(indexToRemove, 1);
      console.log(`User with roll number ${rollNumber} removed successfully.`);
      return true;
    } else {
      throw new Error(`User with roll number ${rollNumber} not found.`);
    }
  }

  public saveData() {
    this.sortByName(this.usersData);
    //hashing of data
    let hashedUserData: any = "";
    this.sortByName(this.usersData);
    this.usersData.map((user: any) => {
      user = JSON.stringify(user);
      user = Buffer.from(user, "utf8");
      user = user.toString("base64");
      hashedUserData += "," + user;
    });
    // Save data to disk
    const file = File.getInstance();
    file.saveData(hashedUserData);
    console.log("Users saved successfully");
    return true;
  }
}
