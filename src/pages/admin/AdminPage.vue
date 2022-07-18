<template>
  <ProductList v-if="loaded"/>
</template>

<script>
// import CmpHeader from "@/components/ComponentHeader.vue"
import ProductList from "@/components/admin/ProductList.vue"
export default {
  components:{
    ProductList,
  },
  data(){
    return{
      loaded:false,
    }
  },
  async mounted(){
    await this.$store.dispatch("fetchUser")
    this.loaded=true
  },
  computed:{},
}
</script>

<style>

</style>