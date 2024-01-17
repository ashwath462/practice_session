export class User{
    protected name:string;
    protected age:number;
    protected address:string;
    protected rollNumber:number;
    protected courses:string[];
    
    constructor(name:string,age:number,address:string,rollNumber:number,courses:string[]){
        this.name = name;
        this.age = age;
        this.address = address;
        this.rollNumber = rollNumber;
        this.courses = courses;
    }

    public displayUserDetails(){
        console.log('---------------------------------------------------------------------------------------------------------------------------------------------');
        console.log('Name               Roll Number     Age      Address                                 Courses                                                  ');
        console.log('---------------------------------------------------------------------------------------------------------------------------------------------');
        console.log(`${this.name}               ${this.rollNumber}     ${this.age}      ${this.address}                                 ${this.courses}                                                  `);
    }
}