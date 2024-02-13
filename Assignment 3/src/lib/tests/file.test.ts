import { describe, vi, test, expect } from "vitest";
import { File } from "../models/FirestoreDatabase";
import { data } from "autoprefixer";

export const database = File.getInstance();

test("file instance test", () => {
  const db = File.getInstance();
  expect(db).toBe(database);
});

test("create user", () => {
  let testcases = [
    ["manu2002@gmail.com", "12346"],
    ["manu@gmail.com", "testing"],
  ];
  testcases.forEach((testcase) => {
    database.createUser(testcase[0], testcase[1]);
  });
});

test("sign in user", () => {
  let testcases = [
    ["manu2002@gmail.com", "12346"],
    ["manu@gmail.com", "testing"],
  ];
  testcases.forEach((testcase) => {
    database.signInUser(testcase[0], testcase[1]).then((value) => {
      console.log(value);
      expect(value).toBe(true);
    });
    database.deleteCurrentUser();
  });
});

test("get user tasks", () => {
  let testcases = [
    "3wT3N1JKSAdhXrFU9VAZeaFkZS23",
    "qxxO1DnBeKV5klhd0Hkabgkw1b23",
    "1rnmONaTKeZwMwHSutM3JrkEE2o1",
  ];

  testcases.forEach((testcase: any) => {
    const tasks = database.getUserTasks(testcase);
    expect(database.getUserTasks(testcase)).toStrictEqual(tasks);
  });
});

test("update user task", () => {
  let testcases = [
    { uid: "11W78tVPAYheiq5tNa28Cv1wHrR2", email: "tuhina@gmail.com" },
    { uid: "vjbmJkzdxUems9bQ6KW6HwLJOty2", email: "20bit109@ietdavv.edu.in" },
  ];

  testcases.forEach((testcase: any) => {
    expect(database.updateUserTasks(testcase, [], [])).toBe(true);
  });
});

test("is user valid successful", () => {
  let testcases = [
    "11W78tVPAYheiq5tNa28Cv1wHrR2",
    "vjbmJkzdxUems9bQ6KW6HwLJOty2",
    "3wT3N1JKSAdhXrFU9VAZeaFkZS23",
    "qxxO1DnBeKV5klhd0Hkabgkw1b23",
    "1rnmONaTKeZwMwHSutM3JrkEE2o1",
  ];

  testcases.forEach((testcase: any) => {
    database.isUserValid(testcase).then((value) => {
      expect(value).toBe(true);
    });
  });
});
