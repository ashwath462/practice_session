import { expect, test, vi } from "vitest";
import * as utility from '../../utility/constants';
import { validateName, validateAge, validateRollNumber, validateCourses } from "../../utility/utils";

test('taking input', ()=>{
    const testCases = ['hello','how are you', 'Ashwath Arora','Assignment 2'];
    testCases.forEach((testcase)=>{
        const mockReadLine = vi.spyOn(utility,'input').mockReturnValueOnce(testcase);
        expect(utility.input(testcase)).toBe(testcase);
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


test('validate Roll Number Correct',() => {
    let testCases = [
        ["0009",9],
        ["    10",10],
        ["       8  ",8],
        [" 35 ", 35],
        [" 35356 ", 35356],
        [" 3555 ", 3555],
        [" 10009 ", 10009],
    ]
    testCases.forEach((testcase)=>{
        expect(validateRollNumber(testcase[0])).toBe(testcase[1]);
    })
})

test('validate Roll Number Error',() => {
    let testCases = ["12.3456","12M","0","-89"]
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