<template>
  <div v-if="loaded" class="modal" id="productInCart">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Cart</h4>
        </div>

        <div class="modal-body">
          <ProductList/>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer d-flex">
          <a href="/payment" class="btn btn-success">Thanh toán</a>
          <button type="button" class="btn btn-danger" data-dismiss="modal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from './ProductList.vue';
export default {
  components: { ProductList },
  data(){
    return {
      loaded:false
    }
  },
  async mounted(){
    this.loaded = true
  },
  computed:{
    getUser(){
      return this.$store.dispatch('fetchUser')
   }
  },
  methods:{
   
  }
};
</script>

<style></style>
