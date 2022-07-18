<template> 
  <div v-if="isShow" id="footer" class="text-center">
      <h3 class="text-light mt-1">Bao uy tín</h3>
      <p class="text-light" style="font-size:smaller; font-style:italic">@Dương Gia Trung, 501200674, CD20CT13</p>
  </div>
  <!-- <h2>{{a}}</h2> -->
</template>

<script>
export default {
  name:'CmpFooter',
  data(){
    return {
      isShow:true
    }
  },
  async mounted(){
    if(window.location.pathname=='/admin/login')
      {
        this.isShow= false;
      }
    this.loaded = true
  },
  // props:['a'],
}
</script>

<style>
  #footer{
    background-color: #353a3f;
    min-height: 10%;
  }
</style>