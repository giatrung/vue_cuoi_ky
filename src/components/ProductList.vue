<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>STT</th>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th v-if="isShowOperator">#</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in cart" :key="index">
        <td>{{ index + 1}}</td>
        <td style="width: 15%">
          <img
            style="width: 100%"
            class="card-img-top"
            :src="item.image[0]"
            alt="Card image"
          />
        </td>
        <td>{{ item.name }}</td>
        <td>${{ Number(item.price).toLocaleString() }}</td>
        <td style="width: fit-content" v-if="isShowOperator">
          <button class="btn btn-danger" @click="deleteProductInCart(item.id)">
            x
          </button>
        </td>
      </tr>
      <tr>
        <td colspan="3">Tổng tiền:</td>
        <td colspan="3">${{ Number($store.state.total).toLocaleString() }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    isShowOperator: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed:{
    cart(){
      return this.$store.state.cart;
    }
  },
  mounted() {
  },
  methods: {
    deleteProductInCart(key) {
      this.$store.dispatch("deleteInCart", key);
    },
    
  },
};
</script>

<style></style>
