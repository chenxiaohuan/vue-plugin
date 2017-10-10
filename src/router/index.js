import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Swipe from '@/pages/swipe'
import Tab from '@/pages/tab'
import LazyLoad from '@/pages/lazyload'
import ActionSheet from '@/pages/actionsheet'
import Toast from '@/pages/toast'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/swipe',
            name: 'Swipe',
            component: Swipe
        },
        {
            path: '/tab',
            name: 'Tab',
            component: Tab
        },
        {
            path: '/lazyload',
            name: 'LazyLoad',
            component: LazyLoad
        },
        {
            path: '/actionsheet',
            name: 'ActionSheet',
            component: ActionSheet
        },
        {
            path: '/toast',
            name: 'Toast',
            component: Toast
        }
    ]
})