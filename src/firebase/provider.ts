import {
  DocumentReference,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { TodoDTO, UserDTO } from "src/interface";
import { db } from "./config";

export const addUser = (
  group: string,
  userData: UserDTO
): Promise<DocumentReference> => {
  const collectionRef = collection(db, group);
  return addDoc(collectionRef, userData);
};

export const fetchTodos = (group: string): Promise<QuerySnapshot> => {
  const refCollection = collection(db, group);
  return getDocs(refCollection);
};

export const addTodo = (
  group: string,
  todo: TodoDTO
): Promise<DocumentReference> => {
  const collectionRef = collection(db, group);
  return addDoc(collectionRef, todo);
};
