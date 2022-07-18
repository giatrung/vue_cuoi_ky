<template>
  <div v-if="loaded" class="container">
    <h1 class="text-center">Kiểm tra đơn hàng</h1>
    <div class="text-center" v-if="!$store.state.userInfo">
          <form
        action=""
        ref="frmSearchOrders"
        @submit.prevent="searchOrders()"
        enctype="multipart/form-data"
      >
        <table class="m-auto">
          <tr>
            <td><label for="phone">Điện thoại:</label></td>
            <td>
              <input
                style="width: 100%"
                type="text"
                name="phone"
                class="form-control"
                placeholder="Nhập số điện thoại đặt hàng..."
                required
              />
            </td>
          </tr>
        </table>
        <button type="submit" class="btn btn-primary mt-2">Tìm</button>
      </form>
    </div>
   
    <orders-list class="mt-2" :orders="orders"/>
  </div>
</template>

<script>
import OrdersList from '@/components/OrdersList.vue';
export default {
  components: { OrdersList },
    data(){
        return {
            loaded: false
        }
    },
    async mounted(){
        if(this.$store.state.userInfo)
        {
            await this.$store.dispatch('getOrdersByUser');
        }
        this.loaded=true
        console.log(this.$store.state.orders)
    },
    computed:{
        orders(){
            return this.$store.state.orders
        }
    },
    methods:{
        searchOrders(){
            this.$store.dispatch('getOrdersByUser',this.$refs.frmSearchOrders.elements);
        }
    }
}
</script>

<style>

</style>