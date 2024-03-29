import { expect, test, vi } from "vitest";
import * as utility from '../../utility/constants';
import { validateName, validateAge, validateRollNumber, validateCourses, validateAddress, sortBy } from "../../utility/utils";

test('taking input', ()=>{
    const testCases = ['hello','how are you', 'Ashwath Arora','Assignment 2'];
    testCases.forEach((testcase)=>{
        const mockReadLine = vi.spyOn(utility,'input').mockReturnValueOnce(testcase);
        expect(utility.input(
            ' '
        )).toBe(testcase);
    })
})


test('validate Name Correct',() => {
    let testCases = [
        ["ashwaTH AROra","Ashwath Arora"],
        ["  piyush malviya    ","Piyush Malviya"],
        ["   RISHI GUPTA   ", "Rishi Gupta"],
        ["   AJINKYA TARANEKAR", "Ajinkya Taranekar"]
    ]
    testCases.forEach((testcase)=>{
        expect(validateName(testcase[0])).toBe(testcase[1]);
    })
})

test('validate Name Error',() => {
    let testCases = ["Ashwath Arora!","Hello Worl90D","123456","Wowwww,Man"]
    testCases.forEach((testcase)=>{
        expect(()=>validateName(testcase)).toThrowError();
    })
})

test('validate Age Correct',() => {
    let testCases = [
        ["0009",9],
        ["    10",10],
        ["       8  ",8],
        [" 35 ", 35]
    ]
    testCases.forEach((testcase)=>{
        expect(validateAge(testcase[0])).toBe(testcase[1]);
    })
})


test('validate Age Error',() => {
    let testCases = ["909","100","12.3456","12M","0","-89"]
    testCases.forEach((testcase)=>{
        expect(()=>validateAge(testcase)).toThrowError();
    })
})


test('validate Address Correct', ()=>{
    let testCases = [
        ['17-HIG,  Bhawani Nagar', '17-hig, bhawani nagar'],
        ['31-Krishnodaya Nagar','31-krishnodaya nagar']
    ];
    testCases.forEach((testcase)=>{
        expect(validateAddress(testcase[0])).toBe(testcase[1]);
    })
}),

test('validate Address Correct', ()=>{
    let testCases = [
        '1',
        ' ',
        '3C',
        '3-D'
    ];
    testCases.forEach((testcase)=>{
        expect(()=>validateAddress(testcase)).toThrowError();
    })
}),


test('validate Roll Number Correct',() => {
    let testCases = [
        ["0009",false,9],
        ["    10",false,10],
        ["       8  ",false,8],
        [" 35 ",false, 35],
        [" 35356 ",false, 35356],
        [" 3555 ",true, 3555],
        [" 10009 ",true, 10009],
    ]
    testCases.forEach((testcase:any)=>{
        expect(validateRollNumber(testcase[0],testcase[1])).toBe(testcase[2]);
    })
})

test('validate Roll Number Error',() => {
    let testCases = ["12.3456","12M","0","-89","1"]
    testCases.forEach((testcase)=>{
        expect(()=>validateRollNumber(testcase)).toThrowError();
    })
})

test('validate Courses Correct',() => {
    let testCases = [
        ["a,b    ,c , e",['A','B','C','E']],
        ["f,  b    ,c , e",['F','B','C','E']],
        ["a,b    ,d , e",['A','B','D','E']],
        ["f,e,c,a", ['F','E','C','A']],
    ]
    testCases.forEach((testcase)=>{
        expect(validateCourses(testcase[0])).toStrictEqual(testcase[1]);
    })
})

test('validate Courses Error',() => {
    let testCases = ["a,b,v,e", "er,f,a,b", "ahb,asd,er,df"]
    testCases.forEach((testcase)=>{
        expect(()=>validateCourses(testcase)).toThrowError();
    })
})

test('validate sortBy function', ()=>{
    let testCases = ['1','2','3','4'];
    testCases.forEach((testcase:any)=>{
        expect(sortBy(testcase)).toBe(Number(testcase));
    })
})


test('validate sortBy function error', ()=>{
    let testCases = ['1.1','0','5','45','-9'];
    testCases.forEach((testcase:any)=>{
        expect(()=>sortBy(testcase)).toThrowError();
    })
})