<template>
<div >
  <CmpHeader/>
  <router-view style="margin-top: 5%"></router-view>
  <component-footer class="fixed-bottom"/>
</div>
</template>

<script>
import CmpHeader from '@/components/ComponentHeader.vue'
import {onBeforeMount} from 'vue'
import {useStore} from 'vuex'
import ComponentFooter from './components/ComponentFooter.vue';
// import store from './store';
// import createUser from './store'
export default {
  name: "App",
  // đăng ký
  components: {
    CmpHeader,
    ComponentFooter,
    // Index,
  },
  setup() {
    const store = useStore()
    onBeforeMount(()=>{
      store.dispatch('fetchUser')
    });
    
  },
  data(){
    return {
      menu : [],
      loaded:false
    }
  },
  mounted(){
    this.$store.dispatch('fetchUser')
  },
  computed:{
  },
  methods:{
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.main {
background-color: #f8f9fa;
}
</style>
