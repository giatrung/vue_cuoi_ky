import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore'
import { onUnmounted, ref } from 'vue'

const firebaseConfig = {
  apiKey: "AIzaSyB25HkXC98vZhFww0dy8xPzzeVm1CjhYEw",
  authDomain: "fireblogs-712b1.firebaseapp.com",
  projectId: "fireblogs-712b1",
  storageBucket: "fireblogs-712b1.appspot.com",
  messagingSenderId: "1066297869357",
  appId: "1:1066297869357:web:0abb0981581e8a7189e4a4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

//Product
/**
 * nameCollection (String): ten collection,
 * data: (Object) du lieu can nhap
 */
export const storeProduct=(nameCollection, data)=>{
  return setDoc(doc(collection(db, nameCollection)), data);
}
       /**
       * nameCollection (String): ten collection,
       * id: (interger) id 
       */
export const get=(nameCollection, id)=>{
  const docRef = doc(db, nameCollection, id);
  const docSnap = getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data()
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

      /**
       * nameCollection (String): ten collection,
       * id: (interger) id 
       */
export const deleteProduct=(nameCollection, id)=>{
  return deleteDoc(doc(db, nameCollection, id))
}

/**
 * nameCollection (String): ten collection,
 * id: (interger) id 
 */
export const useLoadItem=(nameCollection) => {
  const array = ref([])
  onSnapshot(collection(db, nameCollection), (snapshot) => {
    array.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  })
  onUnmounted(close)
  return array
}


export { auth, db }