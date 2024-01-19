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

    public sortUsers(allUsers:any){
        allUsers.sort((a:any, b:any) => {
            const nameComparison = a.name.localeCompare(b.name);
            return nameComparison !== 0 ? nameComparison : a.rollNumber - b.rollNumber;
        });
        return allUsers;
    }

    public getAllUsers(){
        const data = fsPromise.readFileSync('./database/db.txt','utf8');
        let allUsers:any = data.split(',').slice(1);

        allUsers = allUsers.map((element:any)=>{
            let bufferObj = Buffer.from(element, "base64"); 
            return JSON.parse(bufferObj?.toString("utf8"));
        })
        return allUsers;
    }

    public deleteUser(rollNumber:number){
        let allUsers:any = this.getAllUsers();
        const indexToRemove = allUsers.findIndex((user:any) => user.rollNumber === rollNumber);
        if (indexToRemove !== -1) {
            allUsers.splice(indexToRemove,1);
            console.log(`User with roll number ${rollNumber} removed successfully.`);
        } else {
            throw new Error(`User with roll number ${rollNumber} not found.`);
        }
        let userData:any = '';
        if(allUsers.length != 0){
            allUsers.map((user:any)=>{
                user = JSON.stringify(user); 
                user = Buffer.from(user, "utf8");
                user = user.toString("base64");
                userData = userData+','+user;
            })
        }
        fsPromise.writeFileSync('./database/db.txt',userData);
        return true;
    }

    public saveUser(userInput:User){
        const rollNumber = userInput.getRollNumber();
        let allUsers = this.getAllUsers();
        const indexToRemove = allUsers.findIndex((user:any) => user.rollNumber === rollNumber);
        if (indexToRemove !== -1) {
            throw new Error(`User with roll number ${rollNumber} already exist`);
        }
        allUsers.push(userInput);
        let userData:any = '';
        this.sortUsers(allUsers);
        allUsers.map((user:any)=>{
            user = JSON.stringify(user); 
            user = Buffer.from(user, "utf8");
            user = user.toString("base64");
            userData = userData+','+user;
        })
        fsPromise.writeFileSync('./database/db.txt',userData);
        console.log('User saved successfully');
        return true;
    }

}

