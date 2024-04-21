import { app , db } from "@/config/firebase";
import {
  collection,
  getFirestore,
  orderBy,
  query,
  limit,
  getDocs,
  startAfter,
  doc,
  getDoc,
  setDoc,
  where,
  updateDoc,
} from "firebase/firestore";

export const updateUser = async (uid: string, data: any) => {
  const firestore = getFirestore(app);
  console.log(uid , data);
  
  try {
    const userRef = doc(db, "users", uid);
    // update user
    await updateDoc(userRef, data);
    console.log("user updated");
    
  } catch (error) {
    console.log(error);
  }
};

import { User } from "@/types/user";




export const addUserToDatabase = async (user : User) => {
    const firestore = getFirestore(app);
    try {
      const docRef = doc(firestore, "users", user.uid);
      await setDoc(docRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        providerId: user.providerId,
      });
      console.log("Document written with ID: ", docRef.id);
      
    } catch (error) {
      console.log(`error`, error);
      return error;
    }
  }

  