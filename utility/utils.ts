import * as fsPromise from 'fs';
import { UsersData } from '../model/UsersData';
import { onlyLettersAndSpaces } from "./constants";

export function validateName(userInput: any): string {
    if (!userInput.match(onlyLettersAndSpaces)) {
        throw new Error('Name can\'t contain digits or special characters!');
    }
    userInput = userInput.replace(/\s{2,}/g, ' ').trim().split(' ');
    const formattedName = userInput.map((element: string) => {
            return element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
        }).join(' ');
    return formattedName;
}

export function validateAge(userInput:any): number{
    if(isNaN(userInput)){
        throw new Error('Kindly enter a numeric value!');
    }
    const age = Number(userInput);
    if(age%1 != 0){
        throw new Error('Do not enter a decimal value');
    }
    if(age<=0 || age>=100){
        throw new Error('Age can only be between 1-99')
    }
    return age;
}

export function validateRollNumber(userInput:any, toDelete:boolean = false): number{
    if(isNaN(userInput)){
        throw new Error('Kindly enter a numeric value!');
    }
    const rollNumber = Number(userInput);
    if(rollNumber%1 != 0){
        throw new Error('Do not enter a decimal value or 0');
    }
    if(rollNumber<=0 || rollNumber>=100000){
        throw new Error('Age can only be between 1-99999')
    }
    if(toDelete){
        return rollNumber;
    }
    const data = new UsersData().getUserData();
    const indexToRemove = data.findIndex((user:any) => user.rollNumber === rollNumber);
    if (indexToRemove !== -1) {
        throw new Error(`User with roll number ${rollNumber} already exist`);
    }
    return rollNumber;
}

export function validateAddress(userInput:string){
    userInput = userInput.replace(/\s{2,}/g, ' ').trim().toLowerCase();
    if(userInput.length<4){
        throw new Error('Kindly enter valid input');
    }
    return userInput;
}

export function validateCourses(userInput:any) :string[]{
    const courses = userInput.replace(/\s+/g,'').toUpperCase().split(',');
    courses.forEach((element:any)=>{
        if(!(element == 'A' || element == 'B' || element == 'C' || element == 'D' || element == 'E' || element == 'F')){
            throw new Error('Enter valid courses!');
        }
    })
    return courses;
}