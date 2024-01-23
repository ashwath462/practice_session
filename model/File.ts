import * as fsPromise from 'fs';
import { User } from './User';

export class File{
    private static instance: File;
    
    private constructor(){};

    public static getInstance():File{
        if(!File.instance){
            File.instance = new File();
        }
        return File.instance;
    }

    public saveData(hashedUserData:string){
        fsPromise.writeFileSync('./database/db.txt',hashedUserData);
        return true;
    }

    
}

