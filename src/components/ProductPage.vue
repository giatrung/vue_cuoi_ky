<template>
  <div class="container" v-if="loaded">
    <h1 class="text-center">Mobile Phone</h1>
    <Pagination :numberOfPage="numberOfPage"/>
    <div class="d-flex">
     <span class="mt-2">Sắp xếp: </span> 
     <select
          class="form-control"
          style="width: 22%"
          name="sort"
          id="filter"
          v-model="sortValue"
          @change="sort(sortValue)"
        >
          <option value="1">Tăng theo giá</option>
          <option value="2">Giảm theo giá</option>
        </select>
      </div>
    <div class="productsList d-flex">
      <div
        class="card m-3 text-center"
        v-for="(item, index) in products"
        :key="index"
        style="width: 25%; box-shadow: 1px 5px 10px silver"
      >
        <router-link :to="{ name: 'ProductDetail', params: { id: item.id } }">
          <div class="card-header p-1" style="min-height: 62%; background:white;">  
            <img
            class="card-img-top"
            :src="item.data.image[0]"
            alt="Card image"
            />
          </div>
        
          <div class="card-body">
            <h4 class="card-title text-dark">{{ item.data.name }}</h4>
            <p class="m-0" style="font-weight:bolder; font-size:larger">${{ Number( item.data.price).toLocaleString() }}</p>
            <p class="card-text m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <a href="#" class="btn btn-primary">See Profile</a>
          </div>
        </router-link>
      </div>
    </div>
    <Pagination style="margin-bottom:10%;" :numberOfPage="numberOfPage"/>
  </div>
</template>

<script>
import Pagination from "./PaginationComponent.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      per: 6,
      currentPage: 1,
      baseLink:"/product",
      loaded:false
    };
  },
  async mounted() {
    if(this.$route.query.page)
    {
      this.$router.push(this.baseLink+"?page="+ this.$route.query.page)
    }
    this.currentPage = this.$route.query.page ?? 1
    
    this.loaded=true;
  },
  computed: {
    products() {
      let productList=[]
      for (let i = (this.per*this.currentPage)-this.per; i<(this.currentPage*this.per) && i< this.$store.state.products.length;i++) {
        productList.push(this.$store.state.products[i]);
      }
      return productList;
    },
    numberOfPage(){
      let nums = 1;
      let productLength = this.$store.state.products.length;
      if(productLength % this.per ==0)
      {
        nums = productLength/this.per
      }
      else{
        nums = (productLength/this.per)+1
      }
      return Math.floor(nums)
    }
  },
  methods:{
    sort(value){
      this.$store.dispatch("sort",value);
      this.$store.dispatch("getProducts");
    }
  }
};
</script>

<style>
.banner {
  width: 100%;
}
.productsList {
  flex-wrap: wrap;
  justify-content: center;
}
</style>
