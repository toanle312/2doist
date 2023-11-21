import {
  DocumentReference,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { TUser } from "@/interface";
import { db } from "./config";

class FirebaseProvider {
  public addUser = (
    group: string,
    userData: TUser
  ): Promise<DocumentReference> => {
    const collectionRef = collection(db, group);
    return addDoc(collectionRef, userData);
  };

  /**
   * Fetchs all documents in <group> collection
   * @param group name of the group
   * @returns A Promise that will be resolved with the results of the query
   */
  public fetchDocs = (group: string): Promise<QuerySnapshot> => {
    const refCollection = collection(db, group);
    return getDocs(refCollection);
  };

  /**
   * add new document to collection
   * @param group name of the group
   * @param element new data
   * @returns A Promise resolved with a DocumentReference pointing to the newly created document after it has been written to the backend (Note that it won't resolve while you're offline)
   */
  public addNewDoc = (group: string, element: any): Promise<DocumentReference> => {
    const collectionRef = collection(db, group);
    return addDoc(collectionRef, element);
  };

  /**
   * update existing document in collection
   * @param group name of the group
   * @param element updated data
   * @returns A Promise resolved once the data has been successfully written to the backend (note that it won't resolve while you're offline)
   */
  public updateDoc = (
    group: string,
    element: any
  ): Promise<void> => {
    const documentRef = doc(db, group, element?.id as string);
    delete element.id;
    return setDoc(documentRef, element);
  };

  /**
   * get specific document in collection
   * @param group name of the group
   * @param id id of the document
   * @returns data of the document
   */
  public getDocById = async (group: string, id: string) => {
    const docRef = doc(db, group, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // docSnap.data() will be returned in this case
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toDate() as Date,
      };
    } else {
      // docSnap.data() will be undefined in this case
      return undefined;
    }
  }

}

export const firebaseProvider = new FirebaseProvider();
