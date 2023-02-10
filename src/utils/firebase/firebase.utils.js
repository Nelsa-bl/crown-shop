// Firebase Database
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Authorisation for Google sign-in
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

// Import Firebase Database
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDelmIMsehw5kP0e2daE-3yRddcev_5mMY',
  authDomain: 'crown-webshop-db.firebaseapp.com',
  projectId: 'crown-webshop-db',
  storageBucket: 'crown-webshop-db.appspot.com',
  messagingSenderId: '57776200133',
  appId: '1:57776200133:web:1bb0a5cb6ac1adc9b3d3ac',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Provider (Google, Facebook, etc..)
const googleProvider = new GoogleAuthProvider();

// Set config
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Initialize Auth
export const auth = getAuth();

// Set up Google signup with Popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Set up signup with Google Redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Initialize DB
export const db = getFirestore();

///////////////////////////////////////////
// Upload data to Firebase db
///////////////////////////////////////////
// Parameters (key, objects)
export const addCollectionAndDocumnets = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('Done');
};

///////////////////////////////////////////
// Retrive data from Firebase DB
///////////////////////////////////////////
export const getCategoriesAndDodcuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querrySnapShot = await getDocs(q);

  const categoryMap = querrySnapShot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

///////////////////////////////////////////
// Google popup login
///////////////////////////////////////////

// Create user to DB from Google sign in
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  // Check condition
  if (!userAuth) return;
  // doc uses 3 arrguments (database, collections, uniqe id)
  const userDocRef = doc(db, 'users', userAuth.uid);
  // console.log(userDocRef);

  // Get data from login
  const userSnapShot = await getDoc(userDocRef);
  // console.log(userSnapShot);
  // Check if user exists
  // console.log(userSnapShot.exists());

  // Check if data already exists or create new
  if (!userSnapShot.exists()) {
    // Get Name and email
    const { displayName, email } = userAuth;
    // Get created date
    const createdAt = new Date();

    try {
      // Send data back to DB with following data
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log('Error creating the user', err.message);
    }
  }

  // If user exists
  return userDocRef;
};

///////////////////////////////////////////
// Mail and password login
///////////////////////////////////////////

// Create Login for native email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  // Check for conditions
  // If condition is false
  if (!email || !password) return;
  // If condition is true
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in for native email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  // Check for conditions
  // If condition is false
  if (!email || !password) return;
  // If condition is true
  return await signInWithEmailAndPassword(auth, email, password);
};

///////////////////////////////////////////
// Sign out user
///////////////////////////////////////////

export const signOutUser = async () => await signOut(auth);

///////////////////////////////////////////
// Listner Observer hook for contolling login/log out
///////////////////////////////////////////
// onAuthStateChanged takes 2 arrguments (auth, calback)
// Always listens must unmount
export const onAuthStateChangedListner = (calback) =>
  onAuthStateChanged(auth, calback);
