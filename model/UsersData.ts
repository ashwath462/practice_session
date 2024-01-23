import * as fsPromise from "fs";
import { User } from "./User";
import { File } from "./File";

export class UsersData {
  public usersData: User[];
  constructor() {
    //Loading data from disk to in-memory
    const data = fsPromise.readFileSync("./database/db.txt", "utf8");
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
  public displayUserDetails() {
    const headers = ["name", "age", "address", "rollNumber", "courses"];
    // Find maximum width for each column
    const columnWidths = headers.map((header, index) => {
      const maxWidth = Math.max(
        header.length,
        ...this.usersData.map((user: any) => {
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
      columnWidths
        .map((width, index) => headers[index].padEnd(width))
        .join(" | ")
    );
    // Display separator line
    console.log(
      "-".repeat(columnWidths.reduce((sum, width) => sum + width + 3, 0))
    );
    // Display user data
    this.usersData.forEach((user: any) => {
      console.log(
        columnWidths
          .map((width, index) => {
            if (headers[index] === "Courses") {
              return (user as any)[headers[index]].join(", ").padEnd(width);
            } else {
              return String((user as any)[headers[index]]).padEnd(width);
            }
          })
          .join(" | ")
      );
    });
  }

  public sortByName(usersData: any, descOrder: number = 0) {
    usersData.sort((a: any, b: any) => {
      if (descOrder == 1) {
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
      if (descOrder) return b.rollNumber.localeCompare(a.rollNumber);
      return a.rollNumber.localeCompare(b.rollNumber);
    });
    return usersData;
  }

  public sortByAge(usersData: any, descOrder: boolean = false) {
    usersData.sort((a: any, b: any) => {
      if (descOrder) return b.age.localeCompare(a.age);
      return a.age.localeCompare(b.age);
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
