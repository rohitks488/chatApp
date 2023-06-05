import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDtNSPBiMLwnyZmzw70XfmMhwsCOVa-uec",
  authDomain: "chatapp-8c813.firebaseapp.com",
  projectId: "chatapp-8c813",
  storageBucket: "chatapp-8c813.appspot.com",
  messagingSenderId: "1034272552088",
  appId: "1:1034272552088:web:09c9df0bd61b6cda2b8ced",
});
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
