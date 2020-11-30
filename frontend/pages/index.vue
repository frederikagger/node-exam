<template>
  <Header/>
</template>

<script>
import Header from '../components/Header.vue'
export default {
  components: { Header },
  middleware: "auth",

}
</script>

<style>

</style>