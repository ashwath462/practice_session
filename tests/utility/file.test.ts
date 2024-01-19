import { expect, test, vi } from "vitest";
import { File } from "../../model/File";
import { User } from "../../model/User";
import * as fsPromise from 'fs';

const file = File.getInstance();

test('get Instance check', ()=>{
    const instance = File.getInstance();
    expect(instance).toBe(file);
})

test('sort users', ()=>{
    const testCases = [
        [[
            {
                name: "ashwath",
                rollNumber: 3
            },
            {
                name: "ashwath",
                rollNumber: 2
            },
            {
                name: "aashwath",
                rollNumber: 1
            }
         ],[
            {
                name: "aashwath",
                rollNumber: 1
            },
            {
                name: "ashwath",
                rollNumber: 2
            },
            {
                name: "ashwath",
                rollNumber: 3
            }
         ]
        ],
        [[{name:"manu",rollNumber:1}], [{name:"manu",rollNumber:1}]],
        [[],[]]
    ];

    testCases.forEach((testcase)=>{
        expect(file.sortUsers(testcase[0])).toStrictEqual(testcase[1]);
    })
})

test('get all users', ()=>{
    const data = fsPromise.readFileSync('./database/db.txt','utf8');
    let allUsers:any = data.split(',').slice(1);

    allUsers = allUsers.map((element:any)=>{
        let bufferObj = Buffer.from(element, "base64"); 
        return JSON.parse(bufferObj?.toString("utf8"));
    })
    
    expect(file.getAllUsers()).toStrictEqual(allUsers);
})

test('save user correct', ()=>{
     const testCases:any = [
        new User("Ashwath Arora",21,"HIG-17",1101,['A','B','C','D']),
        new User("Ashwath ",21,"HIG-17",1102,['A','B','C','D']),
        new User("Piyush",22,"HIG-17",1103,['A','B','C','D']),
        new User("Piyush Malviya",23,"HIG-17",1104,['A','B','C','D']),
     ]

     testCases.forEach((testcase:User)=>{
        expect(file.saveUser(testcase)).toBe(true);
     })
})

test('save user error', ()=>{
    const testCases:any = [
       new User("Ashwath Arora",21,"HIG-17",1101,['A','B','C','D']),
       new User("Ashwath ",21,"HIG-17",1102,['A','B','C','D']),
    ]

    testCases.forEach((testcase:User)=>{
       expect(()=>file.saveUser(testcase)).toThrowError();
    })
})

test('delete user correct', ()=>{
    let testCases:any = [
        1101,1102,1103,1104
    ]

    testCases.forEach((testcase:number)=>{
        expect(file.deleteUser(testcase)).toBe(true);
    })
})

test('delete user error', ()=>{
    let testCases:any = [
        111111,222222
    ]

    testCases.forEach((testcase:number)=>{
        expect(()=>file.deleteUser(testcase)).toThrowError();
    })
})