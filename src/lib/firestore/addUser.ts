import { app } from "@/config/firebase";
import { User } from "@/types/user";
import {
    getFirestore,
    setDoc,
    doc
   } from 'firebase/firestore/lite';



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
        points : 0,
        images : []
      });
      console.log("Document written with ID: ", docRef.id);
      
    } catch (error) {
      console.log(`error`, error);
      return error;
    }
  }