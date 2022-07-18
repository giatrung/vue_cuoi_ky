import {createApp} from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from "./router/index";
import store from "./store"
import Vue3Editor from "vue3-editor"
import VSwitch from 'v-switch-case'

// import mitt from "mitt"
 // This is a global mixin, it is applied to every vue instance


// Initialize the FirebaseUI Widget using Firebase.
let app = createApp(App)
app.use(store).use(router).use(Vue3Editor).use(VSwitch)
 // This is a global mixin, it is applied to every vue instance
app.mount("#app")
