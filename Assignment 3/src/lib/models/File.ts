import { deleteUser, getAuth } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { user } from "../store/store";
import { USER_ID, USER_COLLECTION } from "../../utils/Constant";

export class File {
  private static instance: File | null = null;
  
  private constructor() {}

  public static getInstance(): File {
    if (!File.instance) {
      File.instance = new File();
    }
    return File.instance;
  }

  public async createUser(email: string, password: string) {
    try{
      const cred = await auth().createUserWithEmailAndPassword(email, password)
      db.collection(USER_COLLECTION).doc(cred?.user?.uid).set({
        email: cred.user?.email,
        toDoList: [],
        doneList: [],
      });
    
      return true;
    } catch(err:any){
      alert(err.message);
      return false;
    }
  }

  public async signInUser(email: string, password: string) {
    try{
      const cred:any = await auth().signInWithEmailAndPassword(email, password);
      localStorage.setItem(USER_ID, cred.user?.uid);
      user.set({
        uid: cred.user?.uid,
        email: cred.user?.uid,
      });
      return true;
    } catch(err:any){
      alert(err.message);
      return false;
    }
  }

  public getUserTasks(currentUserId: string) {
    const data = db.collection(USER_COLLECTION).doc(currentUserId);
    return data
      .get()
      .then((doc: any) => {
        console.log(doc.data());
        return doc.data();
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  public updateUserTasks(
    currentUser: any,
    tasks: string[] = [],
    otherTasks: string[] = [],
    type: string = "To-Do",
  ) {
    db.collection(USER_COLLECTION)
      .doc(currentUser.uid)
      .update({
        email: currentUser.email,
        toDoList: type === "To-Do" ? tasks : otherTasks,
        doneList: type === "To-Do" ? otherTasks : tasks,
      });
    return true;
  }

  public async isUserValid(currentUserId: string) {
    const data = await db.collection(USER_COLLECTION).doc(currentUserId);

    return data.get().then((doc: any) => {
      if (doc.exists) {
        return true;
      } else {
        localStorage.removeItem(USER_ID);
        return false;
      }
    });
  }

  public deleteCurrentUser(){
    const auth = getAuth();
    const user:any = auth.currentUser;
    deleteUser(user);
  }
}