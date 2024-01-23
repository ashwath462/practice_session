import { expect, test } from "vitest";
import { File } from "../../model/File";
import * as fsPromise from 'fs';

test('get Instance check', ()=>{
    const instance = File.getInstance();
    expect(instance).toBe(File.getInstance());
})

test('Save data',()=>{ 
    const userData = fsPromise.readFileSync("./database/db.txt", "utf8");
    const file = File.getInstance();
    expect(file.saveData(userData)).toBe(true);
})


test('Save data Error',()=>{ 
    const file = File.getInstance();
    expect(()=>{file.saveData('')}).toThrowError();
})