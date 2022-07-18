<template>
  <main style="margin-top:6%">
    <section class="form">
      <form class="login" @submit.prevent="login">
        <h2>Login</h2>
        <input
        class="form-control"
        type="email"
        placeholder="Email address"
        v-model="login_form.email"
        />
        <input
        class="form-control"
        type="password"
        placeholder="Password"
        v-model="login_form.password"
        />
        <input class="btn btn-primary mt-2" type="submit" value="Login" />
      </form>
    </section>
  </main>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import store from "@/store";
import { app } from "@/firebase/firebaseInit";
app;

export default {
  setup() {
    const login_form = ref({});
    const register_form = ref({});
    const store_form = useStore({});

    const login = () => {
      store.dispatch("login", login_form.value).then(()=>{
        window.location.pathname='admin'
      });
      
    };
    const register = () => {
      store.dispatch("register", register_form.value);
    };
    return {
      login_form,
      register_form,
      login,
      register,
      store_form,
    };
  },
  data() {
    return {
      isSignIn: false,
    };
  },
  methods: {
  },
};
</script>

<style>
.login{
  width: 30%;
  margin: auto;
  text-align: center;
  border: 2px solid silver;
  padding: 2%;
  border-radius: 10px;
  background-color: rgb(237, 237, 237);
  overflow: hidden;
  box-shadow: 1px 2px 5px rgb(145, 145, 145);
}
.form{
  margin-top:12%
}
</style>