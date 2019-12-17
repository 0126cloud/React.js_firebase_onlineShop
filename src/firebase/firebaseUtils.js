import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCCjjSaONh4vKal_U5ABAH-UZNeLv0ynbA",
  authDomain: "shop-db-9deaa.firebaseapp.com",
  databaseURL: "https://shop-db-9deaa.firebaseio.com",
  projectId: "shop-db-9deaa",
  storageBucket: "shop-db-9deaa.appspot.com",
  messagingSenderId: "367019301561",
  appId: "1:367019301561:web:a954a24243ebf6f60ad968",
  measurementId: "G-J11HVH6ZSL"
};


export const creatCollectionAndDocuments = async (collectionKey, docsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef);

  const batch = firestore.batch();
  docsToAdd.forEach(doc => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, doc);
  });

  return await batch.commit();
  
}

export const convertCollectionsSnapshotToOneObject = collections => {
  const transformedCollections = collections.docs.map(doc => {
    const {title, items} = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformedCollections.reduce((currentObject, collection) => {
    currentObject[collection.title.toLowerCase()] = collection;
    return currentObject;
  } ,{})
} 

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}


export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth){return;}
  
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("Error creating user!", error.message);
      
    }
  }

  return userRef;

}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider);
};


export default firebase;