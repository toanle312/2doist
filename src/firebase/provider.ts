import {
  DocumentReference,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { TTodo, TUser } from "src/interface";
import { db } from "./config";

class FirebaseProvider {
  public addUser = (
    group: string,
    userData: TUser
  ): Promise<DocumentReference> => {
    const collectionRef = collection(db, group);
    return addDoc(collectionRef, userData);
  };
  
  public fetchTodos = (group: string): Promise<QuerySnapshot> => {
    const refCollection = collection(db, group);
    return getDocs(refCollection);
  };
  
  public addTodo = (
    group: string,
    todo: TTodo
  ): Promise<DocumentReference> => {
    const collectionRef = collection(db, group);
    return addDoc(collectionRef, todo);
  };
}

export const firebaseProvider = new FirebaseProvider();

export const addUser = (
  group: string,
  userData: TUser
): Promise<DocumentReference> => {
  const collectionRef = collection(db, group);
  return addDoc(collectionRef, userData);
};

export const fetchTodos = (group: string): Promise<QuerySnapshot> => {
  const refCollection = collection(db, group);
  return getDocs(refCollection);
};