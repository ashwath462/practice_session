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

export function validateRollNumber(userInput:any): number{
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
    return rollNumber;
}

export function validateCourses(userInput:any) :string[]{
    const courses = userInput.replace(/\s+/g,'').toUpperCase().split(',');
    courses.forEach((element)=>{
        if(!(element == 'A' || element == 'B' || element == 'C' || element == 'D' || element == 'E' || element == 'F')){
            throw new Error('Enter valid courses!');
        }
    })
    return courses;
}