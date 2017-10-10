<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <div class="header"><router-link to="/">Go to Index</router-link></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header{
  margin-bottom: 20px;
}
</style>
