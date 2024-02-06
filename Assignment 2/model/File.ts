import * as fsPromise from "fs";
import { User } from "./User";
import { DATABASE_FILE } from "../utility/constants";

export class File {
  private static instance: File;

  private constructor() {}

  public static getInstance(): File {
    if (!File.instance) {
      File.instance = new File();
    }
    return File.instance;
  }

  public saveData(hashedUserData: string) {
    if(hashedUserData.length>=1){
        fsPromise.writeFileSync(DATABASE_FILE, hashedUserData);
        return true;
    } else{
        throw new Error('Empty file! kindly enter user details to save.');
    }
  }
}
