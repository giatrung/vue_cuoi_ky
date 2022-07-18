<template>
  <div v-if="loaded" class="container">
    <div class="row mt-4">
      <div class="col-md-6">
        <img class="bigimage" style="width:85%" :src="bigimage" alt="" />
      </div>
      <div class="col-md-6">
        <h1>{{ productDetail.name }}</h1>
        <h2>${{ Number(productDetail.price).toLocaleString() }}</h2>
        <div class="color">
            <img class="image" style="width:10%" v-for="(image,index) of this.$store.state.productDetail.image" 
             @click="changeImage(image)" 
            :key="index" :src="image" alt="">
        </div>
        <div class="description">
          <h3>Description:</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          <p v-if="productDetail.quantity">Còn: {{productDetail.quantity}} chiếc</p>
          <p v-else>Đã hết hàng</p>
        </div>
        <div class="button-area">
          <button class="btn btn-primary" @click="addCart" :disabled = "$store.state.cart[index]>0">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductDetail",
  async mounted() {
    await this.$store.dispatch('getProductDetail', this.$route.params.id)
    this.loaded = true
  },
  data(){
    return {
      productImage: null,
      loaded: false,
    }
  },
  computed: {
    productDetail() {
      return this.$store.state.productDetail;
    },
    bigimage() {
      return this.productImage ?? this.$store.state.productDetail.image[0];
    },
  },
  methods:{
    changeImage(image){
      this.productImage = image
    },
    addCart(){
      if(this.productDetail.quantity>0)
      {
        this.productDetail.quantity--;
        this.$emit('addToCart',this.$route.params.id)
      }
      else{
        alert('Bạn đặt quá số lượng tồn kho!')
      }
    }
  },
};
</script>

<style>
.image:hover{
  border: 1px solid black;
}
.bigimage{
  border: 1px solid silver;
}
</style>