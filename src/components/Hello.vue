<template>
  <div>
    <ul class="text-left list-wrap">
      <router-link to="/swipe" tag="li">Go to swipe</router-link>
      <router-link to="/tab" tag="li">Go to tab</router-link>
      <router-link to="/lazyload" tag="li">Go to lazyload</router-link>
      <router-link to="/actionsheet" tag="li">Go to actionsheet</router-link>
      <router-link to="/toast" tag="li">Go to toast</router-link>
    </ul>
  </div>
</template>

<style>
ul{
  list-style-type:none;
  margin:0;
  padding:0;
}
a {
  text-decoration: none;
}
.text-left {
  text-align: left;
}
.list-wrap>li {
  margin: 10px auto;
}
</style>