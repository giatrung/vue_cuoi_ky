<template>
  <h1>About</h1>
</template>

<script>
export default {
 async mounted() {
    await this.$store.dispatch("getProducts");
    await this.$store.dispatch("getCart").then(()=>{
      this.loaded = true
    });
    console.log('Home Page',this.$store.state)
    
  },
}
</script>

<style>

</style>