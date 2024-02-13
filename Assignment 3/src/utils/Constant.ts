import { firestoreDataBase } from "$lib/models/FirestoreDatabase";
export const database = firestoreDataBase.getInstance();
export const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export enum ListTypes {
  ToDo = "To-Do",
  Completed = "Done",
}

export type stylesType = ({color:string, checkboxBg:string});
export type taskType = ({isComplete:boolean, id:string, content:string})|undefined;
export type User = ({uid:string, email:string});
export const USER_COLLECTION = "users";
export const USER_ID = "userId"