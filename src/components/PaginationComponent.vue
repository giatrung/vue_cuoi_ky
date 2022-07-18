<template>
  <ul class="pagination" style="justify-content: center">
    <li class="page-item"><a class="page-link" :href="'/product?page='+1">Trước</a></li>
    <li class="page-item" v-for="index in numberOfPage" :key="index"><a class="page-link" :href="'/product?page='+index">{{index}}</a></li>
    <li class="page-item"><a class="page-link" :href="'/product?page='+numberOfPage">Sau</a></li>
  </ul>
</template>

<script>
export default {
  props:{
    numberOfPage:{
      type: Number,
      default: 1
    }
  },
  data(){
    return {}
  },
  mounted(){
  },
  computed:{
  },
};
</script>

<style></style>
