<template>
    <div>
        <swipe :auto="4000" :show-indicators="false">
            <swipe-item class="slide1">1</swipe-item>
            <swipe-item class="slide2">2</swipe-item>
            <swipe-item class="slide3">3</swipe-item>
        </swipe>
    </div>

</template>

<script>
import Vue from 'vue'
import swipe from '@/components/swipe'
import swipeitem from '@/components/swipe-item'

Vue.use(swipe)
Vue.use(swipeitem)



</script>

<style scoped>
.swipe {
    height: 200px;
    color: #fff;
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
}

.swipe-item {
    line-height: 200px;
}

.slide1 {
    background-color: #0089dc;
    color: #fff;
}
.slide2 {
    background-color: #ffd705;
    color: #000;
}
.slide3 {
    background-color: #ff2d4b;
    color: #fff;
}
.swipe-desc {
    text-align: center;
    color: #666;
    margin-bottom: 5px;
}
</style>
