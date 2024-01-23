import { expect, test } from "vitest";
import { User } from "../../model/User";
import { UsersData } from "../../model/UsersData";
import * as fsPromise from 'fs';

const Users = new UsersData();

test('sort users by name', ()=>{
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
         ],false,[
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
        [[{name:"manu",rollNumber:1}],false,[{name:"manu",rollNumber:1}]],
        [[],false,[]],
        [[
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
         ],true,[
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
         ]
        ],
        [[{name:"manu",rollNumber:1}],true,[{name:"manu",rollNumber:1}]],
        [[],true,[]]
    ];

    testCases.forEach((testcase:any)=>{
        expect(Users.sortByName(testcase[0],testcase[1])).toStrictEqual(testcase[2]);
    })
})

test('get all users', ()=>{
    const data = fsPromise.readFileSync('./database/db.txt','utf8');
    let allUsers:any = data.split(',').slice(1);

    allUsers = allUsers.map((element:any)=>{
        let bufferObj = Buffer.from(element, "base64"); 
        return JSON.parse(bufferObj?.toString("utf8"));
    })
    
    expect(Users.getUserData()).toStrictEqual(allUsers);
})

test('save user correct', ()=>{
     const testCases:any = [
        new User("Ashwath Arora",21,"HIG-17",1101,['A','B','C','D']),
        new User("Ashwath ",21,"HIG-17",1102,['A','B','C','D']),
        new User("Piyush",22,"HIG-17",1103,['A','B','C','D']),
        new User("Piyush Malviya",23,"HIG-17",1104,['A','B','C','D']),
     ]

     testCases.forEach((testcase:User)=>{
        expect(Users.appendUser(testcase)).toBe(true);
     })
})


test('delete user correct', ()=>{
    let testCases:any = [
        1101,1102,1103,1104
    ]

    testCases.forEach((testcase:number)=>{
        expect(Users.deleteUser(testcase)).toBe(true);
    })
})

test('delete user error', ()=>{
    let testCases:any = [
        111111,222222
    ]

    testCases.forEach((testcase:number)=>{
        expect(()=>Users.deleteUser(testcase)).toThrowError();
    })
})

test('Save and Display data', ()=>{
    const testCases = [
        [1,true],
        [1,false],
        [2,true],
        [2,false],
        [3,true],
        [3,false],
        [4,true],
        [4,false],
    ]
    expect(Users.saveData()).toBe(true);
    testCases.forEach((testcase:any)=>{
        expect(Users.displayUserDetails(testcase[0],testcase[1])).toBe(true);
    })
})

test('sort users by roll number', ()=>{
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
         ],false,[
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
        [[{name:"manu",rollNumber:1}], false, [{name:"manu",rollNumber:1}]],
        [[],false,[]],
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
         ],true,[
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
         ]
        ],
        [[{name:"manu",rollNumber:1}], true, [{name:"manu",rollNumber:1}]],
        [[],true,[]]
    ];

    testCases.forEach((testcase:any)=>{
        expect(Users.sortByRoleNumber(testcase[0],testcase[1])).toStrictEqual(testcase[2]);
    })
})

test('sort users by age', ()=>{
    const testCases = [
        [[
            {
                name: "ashwath",
                rollNumber: 3,
                age: 21
            },
            {
                name: "ashwath",
                rollNumber: 2,
                age: 23
            },
            {
                name: "aashwath",
                rollNumber: 1,
                age: 22
            }
         ],false,[
            {
                name: "ashwath",
                rollNumber: 3,
                age: 21
            },
            {
                name: "aashwath",
                rollNumber: 1,
                age: 22
            },
            {
                name: "ashwath",
                rollNumber: 2,
                age: 23
            }
         ]
        ],
        [[{name:"manu",rollNumber:1,age:21}],false,[{name:"manu",rollNumber:1,age:21}]],
        [[],false,[]],
        [[
            {
                name: "ashwath",
                rollNumber: 3,
                age: 21
            },
            {
                name: "ashwath",
                rollNumber: 2,
                age: 23
            },
            {
                name: "aashwath",
                rollNumber: 1,
                age: 22
            }
         ],true,[
            {
                name: "ashwath",
                rollNumber: 2,
                age: 23
            },
            {
                name: "aashwath",
                rollNumber: 1,
                age: 22
            },
            {
                name: "ashwath",
                rollNumber: 3,
                age: 21
            }
         ]
        ],
        [[{name:"manu",rollNumber:1,age:21}],true,[{name:"manu",rollNumber:1,age:21}]],
        [[],true,[]],
    ];

    testCases.forEach((testcase:any)=>{
        expect(Users.sortByAge(testcase[0],testcase[1])).toStrictEqual(testcase[2]);
    })
})


test('sort users by age', ()=>{
    const testCases = [
        [[
            {
                name: "ashwath",
                rollNumber: 3,
                age: 21,
                address: "17-HIG Bhawani nagar"
            },
            {
                name: "ashwath",
                rollNumber: 2,
                age: 23,
                address: "19-HIG Bhawani nagar"
            },
            {
                name: "aashwath",
                rollNumber: 1,
                age: 22,
                address: "18-HIG Bhawani nagar"
            }
         ],false,[
            {
                name: "ashwath",
                rollNumber: 3,
                age: 21,
                address: "17-HIG Bhawani nagar"
            },
            {
                name: "aashwath",
                rollNumber: 1,
                age: 22,
                address: "18-HIG Bhawani nagar"
            },
            {
                name: "ashwath",
                rollNumber: 2,
                age: 23,
                address: "19-HIG Bhawani nagar"
            }
         ]
        ],
        [[{name:"manu",rollNumber:1,age:21,address:"17-HIG"}],false,[{name:"manu",rollNumber:1,age:21,address:"17-HIG"}]],
        [[],false,[]],
        [[
            {
                name: "ashwath",
                rollNumber: 3,
                age: 21,
                address: "17-HIG Bhawani nagar"
            },
            {
                name: "ashwath",
                rollNumber: 2,
                age: 23,
                address: "19-HIG Bhawani nagar"
            },
            {
                name: "aashwath",
                rollNumber: 1,
                age: 22,
                address: "18-HIG Bhawani nagar"
            }
         ],true,[
            {
                name: "ashwath",
                rollNumber: 2,
                age: 23,
                address: "19-HIG Bhawani nagar"
            },
            {
                name: "aashwath",
                rollNumber: 1,
                age: 22,
                address: "18-HIG Bhawani nagar"
            },
            {
                name: "ashwath",
                rollNumber: 3,
                age: 21,
                address: "17-HIG Bhawani nagar"
            }
         ]
        ],
        [[{name:"manu",rollNumber:1,age:21,address:"17-HIG"}],true,[{name:"manu",rollNumber:1,age:21,address:"17-HIG"}]],
        [[],true,[]],
    ];

    testCases.forEach((testcase:any)=>{
        expect(Users.sortByAddress(testcase[0],testcase[1])).toStrictEqual(testcase[2]);
    })
})