import { createStore } from "vuex";
import router from "@/router";
import { auth } from "@/firebase/firebaseInit";
import { db } from "@/firebase/firebaseInit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

// import useEventsBus from "./eventBus"
// import emitter from './eventBus'
export default createStore({
  state: {
    userInfo: null,
    products: [],
    cart: [],
    index: 0,
    quantity: 0,
    total: 0,
    productDetail: null,
    orders: [],
    orderstWithoutLogin: [],
    users: [],
    sort: 0,
    searchStr: ''
  },
  mutations: {
    GET_USERS(state, users) {
      state.users = users;
    },
    SET_USER(state, user) {
      state.userInfo = user;
    },
    CLEAR_USER(state) {
      state.userInfo = null;
      state.sort = null;
    },
    SET_PRODUCT(state, product) {
      state.products.push(product);
    },
    SEARCH(state, data){
      state.searchStr = data
    },
    async GET_PRODUCT(state) {
      try {
        state.products = [];
        let q;
        switch (Number(state.sort)) {
          case 1:
            q = query(collection(db, "products"), orderBy("price", "asc"));
            break;
          case 2:
            q = query(collection(db, "products"), orderBy("price", "desc"));
            break;
          case 3:
            q = query(collection(db, "products"), orderBy("quantity", "asc"));
            break;
          case 4:
            q = query(
              collection(db, "products"),
              orderBy("quantity", "desc")
            );
            break;
          default:
            q = query(collection(db, "products"));
        }

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          let product = {
            id: doc.id,
            data: doc.data(),
          };
          // doc.data().id = doc.id
          state.products.push(product);
        });
      } catch (err) {
        console.log(err);
      }
    },
    SET_PRODUCT_DETAIL(state, product) {
      state.productDetail = product;
    },
    ADD_TO_CART(state, product) {
      state.cart.push(product);
      let nameCart = "cart";
      let nameTotal = "total";
      if (state.userInfo) {
        nameCart = nameCart + "-" + state.userInfo.uid;
        nameTotal = nameTotal + "-" + state.userInfo.uid;
      }
      localStorage.setItem(nameCart, JSON.stringify(state.cart));
      state.total = localStorage.getItem(nameTotal)
        ? parseInt(JSON.parse(localStorage.getItem(nameTotal)))
        : 0;
      state.total += parseInt(product.price);
      localStorage.setItem(nameTotal, JSON.stringify(state.total));
    },
    GET_CART(state) {
      let nameCart = "cart";
      let nameTotal = "total";
      if (state.userInfo) {
        nameCart = nameCart + "-" + state.userInfo.uid;
        nameTotal = nameTotal + "-" + state.userInfo.uid;
      }
      state.cart = localStorage.getItem(nameCart)
        ? JSON.parse(localStorage.getItem(nameCart))
        : [];
      state.total = localStorage.getItem(nameTotal)
        ? parseInt(JSON.parse(localStorage.getItem(nameTotal)))
        : 0;
    },
    CLEAR_CART(state) {
      state.cart = [];
      state.total = 0;
      // let nameCart = 'cart'
      // let nameTotal = 'total'
      // if(state.userInfo){
      //   nameCart = nameCart + '-' + state.userInfo.uid
      //   nameTotal = nameTotal + '-' + state.userInfo.uid
      // }
      // localStorage.removeItem(nameCart)
      // localStorage.removeItem(nameTotal)
    },
    GET_ORDERS(state, data) {
      state.orders = data;
    },
    GET_ORDERS_WITHOUT_LOGIN(state, data) {
      state.orderstWithoutLogin = data;
    },
    SORT(state, value) {
      state.sort = value;
      console.log(state.sort);
    },
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        switch (e.code) {
          case "auth/user-not-found":
            alert("User not found");
            break;
          case "auth/wrong-password":
            alert("User not found");
            break;
          default:
            alert("Something went wrong");
        }
        return;
      }
      let user = await getDoc(doc(db, "users", auth.currentUser.uid));
      commit("SET_USER", user.data());
      localStorage.setItem("adminLogin", JSON.stringify(user.data()));
      // commit('SET_PRODUCT')
      // emitter.emit('login',auth.currentUser);
      router.push("/admin");
    },
    async register({ commit }, details) {
      const { email, password } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(
          (res) => {
            setDoc(doc(db, "users", res.user.uid), {
              name: document.getElementById("name").value,
              level: 0,
            });
          }
        );
      } catch (e) {
        switch (e.code) {
          case "auth/email-already-in-use":
            alert("Email already in use");
            break;
          case "auth/operation-not-allowed":
            alert("Operation not allowed");
            break;
          case "auth/weak-password":
            alert("Weak password");
            break;
          case "auth/invalid-email":
            alert("Invalid email");
            break;
          default:
            alert("Something went wrong");
        }
        return;
      }
      let user = await getDoc(doc(db, "users", auth.currentUser.uid));

      commit("SET_USER", user.data());
      // commit('SET_PRODUCT')
      router.push("/admin");
    },
    async logout({ commit }) {
      await signOut(auth);
      if (window.location.pathname.includes("admin")) {
        localStorage.removeItem("adminLogin");
        window.location.pathname = "admin/login";
      } else {
        localStorage.removeItem("userLogin");
        commit("CLEAR_CART");
        window.location.pathname = "/";
      }
      commit("CLEAR_USER");
    },

    fetchUser({ commit }) {
      if (!window.location.pathname.includes("/admin")) {
        let userLocalStorage = localStorage.getItem("userLogin")
          ? JSON.parse(localStorage.getItem("userLogin"))
          : null;
        if (userLocalStorage == null) {
          commit("CLEAR_USER");
        } else {
          commit("SET_USER", userLocalStorage);
          if (router.isReady() && router.currentRoute.value.path === "/login") {
            router.push("/");
          }
        }
      } else {
        let adminLocalStorage = localStorage.getItem("adminLogin")
          ? JSON.parse(localStorage.getItem("adminLogin"))
          : null;
        if (adminLocalStorage) {
          commit("SET_USER", adminLocalStorage);
        }
      }
    },

    postProduct({ commit }, data) {
      const productsRef = collection(db, "products");
      let r = (Math.random() + 1).toString(36).substring(7);
      let new_product = {
        name: data["name"].value,
        image: data["image"],
        price: Number(data["price"].value),
        quantity: Number(data["quantity"].value),
      };
      setDoc(doc(productsRef, r), new_product);
      commit("SET_PRODUCT", new_product);
    },

    //DElete product
    async deleteProduct(fn, data) {
      fn;
      await deleteDoc(doc(db, "products", data));
    },
    //edit product
    async editProduct(fn, data) {
      fn;
      const productRef = doc(db, "products", data["productId"]);

      await setDoc(productRef, {
        name: data["name"].value,
        image: data["image"],
        price: Number(data["price"].value),
        quantity: Number(data["quantity"].value),
      });
    },
    async getProducts({ commit }) {
      commit("GET_PRODUCT");
    },

    async getProductDetail({ commit }, data) {
      const docRef = doc(db, "products", data);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        commit(
          "SET_PRODUCT_DETAIL",
          JSON.parse(JSON.stringify(docSnap.data()))
        );
      } else {
        router.push("/");
      }
    },
    async getUsers({ commit }) {
      let users = [];
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let user = {
          id: doc.id,
          data: doc.data(),
        };
        users.push(user);
        // state.products.push(receipt)
      });
      commit("GET_USERS", users);
    },
    addToCart({ commit }, data) {
      commit("ADD_TO_CART", data);
    },

    getCart({ commit }) {
      commit("GET_CART");
    },
    deleteInCart({ commit, state }, id) {
      let nameCart = "cart";
      let nameTotal = "total";
      if (state.userInfo) {
        nameCart = nameCart + "-" + state.userInfo.uid;
        nameTotal = nameTotal + "-" + state.userInfo.uid;
      }
      let index = state.cart.findIndex((el) => {
        return el.id == id;
      });
      if (state.cart[index]) {
        state.total -= state.cart[index].price;
        localStorage.setItem(nameTotal, JSON.stringify(state.total));
        state.cart.splice(index, 1);
        localStorage.setItem(nameCart, JSON.stringify(state.cart));
        commit("GET_CART");
      }
    },
    async payBill({ commit, state }, data) {
      if (state.userInfo != null) {
        const productRef = doc(db, "users", state.userInfo.uid);
        await setDoc(productRef, {
          name: data["name"].value,
          phone: data["phone"].value,
          address: data["address"].value,
          level: 1,
        });
        const productsRef = collection(db, "orders");
        let r = (Math.random() + 1).toString(36).substring(7);
        let new_product = {
          userId: state.userInfo.uid,
          cart: data["cart"],
          total: state.total,
          status: 0,
          createdAt: Date.now(),
        };
        setDoc(doc(productsRef, r), new_product);
        console.log(state.products);
        data["cart"].forEach((item) => {
          state.products.forEach((el) => {
            console.log(el.id);
            if (item.id == el.id) {
              const productsRef = doc(db, "products", item.id);
              el.data.quantity--;
              updateDoc(productsRef, {
                quantity: el.data.quantity,
              });
            }
          });
        });
        commit("CLEAR_CART");
      } else {
        const productsRef = collection(db, "orderstWithoutLogin");
        let r = (Math.random() + 1).toString(36).substring(7);
        let new_product = {
          name: data["name"].value,
          phone: data["phone"].value,
          address: data["address"].value,
          level: 1,
          cart: data["cart"],
          total: state.total,
          status: 0,
          createdAt: Date.now(),
        };
        setDoc(doc(productsRef, r), new_product);
      }
      commit("CLEAR_CART");
    },
    async getOrders({ commit }) {
      let orders = [];
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let order = {
          id: doc.id,
          data: doc.data(),
        };
        orders.push(order);
        // state.products.push(receipt)
      });
      commit("GET_ORDERS", orders);
    },
    async getOrdersWithoutLogin({ commit }) {
      let orders = [];
      const q = query(
        collection(db, "orderstWithoutLogin"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let order = {
          id: doc.id,
          data: doc.data(),
        };
        orders.push(order);
        // state.products.push(receipt)
      });
      commit("GET_ORDERS_WITHOUT_LOGIN", orders);
    },
    async updateOrdersWithoutLogin({ commit }, data) {
      try {
        const orderstWithoutLoginRef = doc(
          db,
          "orderstWithoutLogin",
          data.orderId
        );
        await updateDoc(orderstWithoutLoginRef, {
          status: data.status,
        });
        commit;
        alert("Chuyển trạng thái thành công!");
      } catch (err) {
        alert("Lỗi!");
        console.log(err);
      }

      // commit('GET_ORDERS_WITHOUT_LOGIN',orders)
    },
    async updateOrders({ commit }, data) {
      try {
        const ordersRef = doc(db, "orders", data.orderId);
        await updateDoc(ordersRef, {
          status: data.status,
        });
        commit;
        alert("Chuyển trạng thái thành công!");
      } catch (err) {
        console.log(err);
        alert("Lỗi!");
      }
      // commit('GET_ORDERS_WITHOUT_LOGIN',orders)
    },
    async getOrdersByUser({ commit, state }, data = null) {
      try {
        let orders = [];
        console.log(state);
        let q;
        if (state.userInfo) {
          q = query(
            collection(db, "orders"),
            where("userId", "==", state.userInfo.uid),
            orderBy("createdAt", "desc")
          );
        } else {
          console.log(data["phone"]);
          q = query(
            collection(db, "orderstWithoutLogin"),
            where("phone", "==", data["phone"].value),
            orderBy("createdAt", "desc")
          );
        }

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let order = {
            orderId: doc.id,
            data: doc.data(),
          };
          orders.push(order);
          // console.log(doc.id, " => ", doc.data());
        });
        commit("GET_ORDERS", orders);
      } catch (err) {
        console.log(err);
        alert("Lỗi!");
      }
      // commit('GET_ORDERS_WITHOUT_LOGIN',orders)
    },
    sort({ commit }, value) {
      commit("SORT", value);
    },
    search({commit}, value){
        commit("SEARCH", value)
    }
  },
  modules: {},
  getters: {
    user: (state) => state.userInfo,
    products: (state) => state.products,
    cart: (state) => state.cart,
    quantity: (state) => state.quantity,
    index: (state) => state.index,
    total: (state) => state.total,
  },
});
