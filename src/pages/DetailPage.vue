<template>
  <!-- <CmpHeader /> -->
  <ProductDetail @addToCart = "addToCart"/>
</template>

<script>
import ProductDetail from '@/components/ProductDetail.vue'
// import CmpHeader from '@/components/ComponentHeader.vue'
export default {
  components:{
    ProductDetail,
  },
  data() {
    return {
    }
  },
  async mounted(){
    await this.$store.dispatch("getProducts");
    await this.$store.dispatch("fetchUser")
    await this.$store.dispatch("getCart")
  },
  methods:{
    addToCart(){
      this.$store.state.productDetail.id = this.$route.params.id
      this.$store.dispatch('addToCart',this.$store.state.productDetail);
    }
  }
}
</script>

<style>

</style>