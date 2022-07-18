<template>
  <ProductPage v-if="loaded" />
</template>

<script>
import ProductPage from "@/components/ProductPage.vue";
export default {
  components: {
    ProductPage,
  },

  data() {
    return {
      loaded:false,
    };
  },
  async mounted() {
    await this.$store.dispatch("getProducts")
    await this.$store.dispatch("fetchUser")
    await this.$store.dispatch("getCart")
    this.loaded = true
  },
  methods: {},
};
</script>

<style></style>
