import { emailRegex, showPassword, isValidCredInput } from "../../utils/utils";
import { describe,vi,test, expect } from "vitest";

test('email Regex checker',()=>{
    let testcases = ['ashwath@gmail.com', 'tuhina@gmail.com','20bit109@ietdavv.edu.in', 'ashwath.arora@gonuclei.in'];
    testcases.forEach((testcase)=>{
        expect(emailRegex.test(testcase)).toBe(true);
    })
})

test('email Regex checker error',()=>{
    let testcases = ['ashwath@gmail', '@gmail.com','20bit109', 'ashwath.arora@gonuclei'];
    testcases.forEach((testcase)=>{
        expect(emailRegex.test(testcase)).toBe(false);
    })
})


test('credentials valid', ()=>{
    let testcases = [
        ["ashwath@gmail.com","ashwath","ashwath"],
        ["tuhina@gmail.com","tuhina","tuhina"],
        ["20bit109@ietdavv.edu.in","ashwath","ashwath"],
        ["ashwath@gmail.com","ashwath"],
        ["tuhina@gmail.com","tuhina"]
    ]

    testcases.forEach((testcase)=>{
        if(testcase.length === 3) expect(isValidCredInput(testcase[0],testcase[1],testcase[2])).toBe(true);
        else expect(isValidCredInput(testcase[0],testcase[1])).toBe(true);
    })
})

test('credentials invalid', ()=>{
    let testcases = [
        ["ashwath@gmail.com","ash","ashwath"],
        ["tuhina@gmail.com","tuha"],
        ["20bit109","ashwath","ashwath"],
        ["ashwath@gmail.com","ashwath","Ashwath"],
    ]

    testcases.forEach((testcase)=>{
        if(testcase.length === 3) expect(()=>isValidCredInput(testcase[0],testcase[1],testcase[2])).toThrow();
        else expect(()=>isValidCredInput(testcase[0],testcase[1])).toThrow();
    })
})