<template>
    <div>
        <button class="button" @click="show">点击上拉action sheet</button>
        <actionsheet :actions="actions" v-model="sheetVisible"></actionsheet>
    </div>
</template>

<script>
import Vue from 'vue'
import actionsheet from '@/components/actionsheet'
Vue.use(actionsheet)

export default {
    data () {
        return {
            actions:[
                {
                    name : '微信支付',
                    method:'wechatPay'
                },
                {
                    name : '支付宝支付',
                    method:'aliPay'
                }
            ],
            sheetVisible: false
        }
    },
    methods: {
        show() {
            var self = this;
            self.sheetVisible = true;
        }
    }
}
</script>