import {db} from "@/firebase/firebaseInit";
import { collection, getDocs } from "@firebase/firestore";

async function getProducts(db) {
    const productsCol = collection(db, "products");
    const productsDocs = await getDocs(productsCol);
    const productList = productsDocs.docs.map((doc) => {
      return { ...doc.data(),id:doc.id };
    });
    return productList;
}
// console.log(getProducts(db))
export const products = getProducts(db)