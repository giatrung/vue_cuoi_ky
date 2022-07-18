<template>
  <div class="container" v-if="loaded" id="Orders">
    <a @click="switchTab=true">Đơn hàng của thành viên</a> | <a @click="switchTab=false">Đơn hàng không phải thành viên</a>
    <order-without-login-page :orders="ordersWithoutLogin"  :users="users" v-if="!switchTab" @updateStatusOrders="updateStatusOrders"/>
    <orders-with-member-page v-if="switchTab" :orders="orders" :users="users" @updateStatusOrders="updateStatusOrders"/>
    
  </div>
</template>

<script>
import OrderWithoutLoginPage from '@/components/admin/OrderWithoutLoginPage.vue';
import OrdersWithMemberPage from '@/components/admin/OrdersWithMemberPage.vue';
export default {
  components:{
    OrderWithoutLoginPage,
    OrdersWithMemberPage
  },
  data() {
    return {
      loaded: false,
      switchTab: true
    };
  },
  async mounted() {
    await this.$store.dispatch("getOrders");
    await this.$store.dispatch("getUsers");
    await this.$store.dispatch("getOrdersWithoutLogin");
    this.loaded = true;
  },
  methods:{
    updateStatusOrders(e){
      console.log(e);
      if(e.type==0){
        this.$store.dispatch('updateOrdersWithoutLogin',e)
      } 
      else{
        this.$store.dispatch('updateOrders',e)
      }
    }
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    users() {
      return this.$store.state.users;
    },
    ordersWithoutLogin(){
      return this.$store.state.orderstWithoutLogin;
    }
  },
};
</script>

<style>
  #Orders background1{
    background-color: blue;
  }
  #Orders a:hover{
    cursor: pointer;
    color: blue;
  }
</style>
