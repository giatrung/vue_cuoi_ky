<template>
  <h1 class="text-center" style="margin-top: 5%">Thanh toán</h1>
  <div class="row container-fluid">
    <div class="col-md-6 text-center" style="border-right: 3px solid black">
      <h2>Thông tin người nhận</h2>
      <form
        action=""
        ref="frmPayment"
        @submit.prevent="pay()"
        enctype="multipart/form-data"
      >
        <table class="m-auto">
          <tr>
            <td><label for="name">Họ tên:</label></td>
            <td>
              <input
                style="width: 100%"
                type="text"
                name="name"
                class="form-control"
                :value="name"
                required
              />
            </td>
          </tr>
          <tr>
            <td><label for="address">Địa chỉ:</label></td>
            <td>
              <input
                style="width: 100%"
                type="text"
                name="address"
                class="form-control"
                :value="address"
                required
              />
            </td>
          </tr>
          <tr>
            <td><label for="phone">Điện thoại:</label></td>
            <td>
              <input
                style="width: 100%"
                type="text"
                name="phone"
                class="form-control"
                :value="phone"
                required
              />
            </td>
          </tr>
        </table>
        <button type="submit" class="btn btn-primary mt-2">Thanh toán</button>
      </form>
    </div>
    <div class="col-md-6">
      <ProductList :isShowOperator="isShowOperator"/>
    </div>
  </div>
</template>

<script>
import ProductList from "@/components/ProductList.vue";
import router from '@/router';
import {useStore} from 'vuex'
export default {
  components: {
    ProductList,
  },
  data(){
    return {
        isShowOperator: false,
        store: useStore(),
        name:'',
        address:'',
        phone:'',
    }
  },
  async mounted(){
    await this.$store.dispatch("getProducts")
    await this.$store.dispatch("getCart")
    await this.fethUserLogin()
    console.log(this.store.state)
    this.loaded = true
  },
  methods:{
    pay(){
      this.$refs.frmPayment.elements['cart'] = this.$store.state.cart
      this.$store
        .dispatch("payBill", this.$refs.frmPayment.elements)
        .then(() => {
          alert("Thanh toán thành công!");
          this.$refs.frmPayment.reset();
          router.push('/')
        })
        .catch((err) => {
          alert(err);
        });
    },
    fethUserLogin(){
      this.name=this.store.state.userInfo?.displayName?? ''
      this.address=this.store.state.userInfo?.address ?? ''
      this.phone=this.store.state.userInfo?.phone?? ''
    }
  }
};
</script>

<style></style>
