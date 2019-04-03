<template>
  <div class="error">
    <img src="../assets/vue.png" alt>
  </div>
</template>

<script>
export default {
  name: "error",
  created() {
      setTimeout(() => {
        this.$router.push('/login') 
      }, 3000);
  },
  
};
</script>

<style lang="scss">
.error {
  img {
    width: 100%;
    display: block;
  }
}
</style>
