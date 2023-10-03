import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage' //getStorage function
import { firebaseConfig } from './config'
const app = initializeApp(firebaseConfig)//Firebase app is used to access various Firebase services, including Firebase Storage.
export const storageAuth = getStorage(app) // creating an instance of Firebase Storage 

//use the storageAuth instance to interact with Firebase Storage, such as uploading, downloading, and managing files stored in your Firebase project.