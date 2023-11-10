import {
  DocumentReference,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { TTodo, TUser } from "@/interface";
import { db } from "./config";

class FirebaseProvider {
  public addUser = (
    group: string,
    userData: TUser
  ): Promise<DocumentReference> => {
    const collectionRef = collection(db, group);
    return addDoc(collectionRef, userData);
  };

  public fetchDocs = (group: string): Promise<QuerySnapshot> => {
    const refCollection = collection(db, group);
    return getDocs(refCollection);
  };

  public addDocs = (group: string, element: any): Promise<DocumentReference> => {
    console.log(element)
    const collectionRef = collection(db, group);
    return addDoc(collectionRef, element);
  };

  public updateDocs = (
    group: string,
    element: any
  ): Promise<void> => {
    const documentRef = doc(db, group, element?.id as string);
    delete element.id;
    return setDoc(documentRef, element);
  };
}

export const firebaseProvider = new FirebaseProvider();
