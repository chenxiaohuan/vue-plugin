<template>
    <div>
        <tab>
            <tab-item title="选项一">内容一</tab-item>
            <tab-item title="选项二">内容二</tab-item>
            <tab-item title="选项三">内容三</tab-item>
            <tab-item title="选项四">内容四</tab-item>
            <tab-item title="选项五">内容五</tab-item>
            <tab-item title="选项六">内容六</tab-item>
            <tab-item title="选项七">内容七</tab-item>
            <tab-item title="选项八">内容八</tab-item>
        </tab>
    </div>
</template>

<script>
import Vue from 'vue'
import Tab  from '@/components/tab'
import TabItem  from '@/components/tab-item'

Vue.component(Tab.name, Tab)
Vue.component(TabItem.name, TabItem)

</script>