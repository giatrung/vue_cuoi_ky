<template>
  <nav v-if="loaded && isShowNav" class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="#">Trung Shop</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto" v-if="$store.state.userInfo?.level==0">
        <li class="nav-item active">
          <router-link :to="{ name: 'Admin' }" class="nav-link">Quản lí sản phẩm</router-link>
        </li>
        <li class="nav-item active">
          <router-link :to="{ name: 'Order' }" class="nav-link">Quản lí đơn hàng</router-link>
        </li>
      </ul>
      <ul class="navbar-nav mr-auto" v-else>
        <li class="nav-item active">
          <a href="/product" class="nav-link"
            >Trang chủ</a>
        </li>
        <li>
          <router-link :to="{ name: 'CheckOrders' }" class="nav-link">Kiểm tra đơn hàng</router-link>
        </li>
        <!-- <li class="nav-item d-flex">
          <input v-model="searchStr" type="search" placeholder="Tìm sản phẩm..." class="input form-control" />
          <button class="btn btn-primary ml-1" @click="search(searchStr)">Tìm</button>
        </li> -->
      </ul>
      <div class="button d-flex">
        <router-link
          :to="{ name: 'Login' }"
          v-if="!$store.state.userInfo"
          class="nav-link"
          >Login</router-link
        >
        <a class="nav-link" v-if="$store.state.userInfo?.level==0">
          <b>Admin</b></a
        >
        <a class="nav-link" v-if ="$store.state.userInfo?.level!=0 && $store.state.userInfo">
          <b>Hello {{$store.state.userInfo?.email}}</b></a
        >
        <a
          class="nav-link mr-3 logout"
          v-if="$store.state.userInfo"
          @click="$store.dispatch('logout')"
          >Thoát</a
        >
      </div>
      <div class="form-inline my-2 my-lg-0" v-if="$store.state.userInfo?.level!=0">
        <button v-if="isShowCart"
          class="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          data-toggle="modal" data-target="#productInCart"
          :disabled="$store.state.cart.length == 0"
        >
          Giỏ hàng của bạn ! 
          <span v-if="$store.state.cart.length == 0">Bạn chưa mua hàng</span>
          <span v-else> Bạn đã mua {{$store.state.cart.length}} món ! </span>
        </button>
      </div>
    </div>
  </nav>
  <modal-cart/>
</template>

<script>
import ModalCart from './ModalCart.vue';
export default {
  components: { ModalCart },
  name: "CmpHeader",
  data(){
    return {
      isShowCart:true,
      loaded: false,
      isShowNav:true
    }
  },
  created(){
    
  },
  async mounted(){
    await this.$store.dispatch('fetchUser')
    this.isShowNav=true
    console.log(this.$store.state)
    if(window.location.pathname.includes('/payment')){
      this.isShowCart= false;
    }
    if(window.location.pathname=='/admin/login')
      {
        this.isShowNav= false;
      }
    this.loaded = true
  },
  methods: {
    search(value){
      console.log(value)
    }
  },
  computed: {
    currentRoute(){
      return this.$route.path;
    },
    isAdminRoute(){
      return window.location.pathname=='/admin/login';
    },
  },
};
</script>

<style lang="scss">
.navbar {
  .button {
    .logout,
    .login {
      cursor: pointer;
    }
  }
}
.modal-dialog {
    max-width: 80% !important;
}
</style>