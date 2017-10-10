<template>
    <div>
        <button class="button" @click="showToast">点击显示Toast</button>
        <button class="button" @click="showToast2">点击显示Toast2</button>
        <button class="button" @click="showToast3">点击显示Toast3</button>
    </div>
</template>

<script>
import Toast from '@/components/toast'
import MessageBox from '@/components/message-box'

export default {
    methods: {
        showToast() {
            Toast.success('成功文案')
        },
        showToast2() {
            Toast.fail('失败文案');
        },
        showToast3() {
            const toast = Toast.loading({
                duration: 0,       // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                message: '倒计时 3 秒'
            });
            let second = 3;
            const timer = setInterval(() => {
                second--;
                if (second) {
                    toast.message = `倒计时 ${second} 秒`;
                } else {
                    clearInterval(timer);
                    Toast.clear();
                }
            }, 1000);

            // let instance = Toast('提示信息');
            // setTimeout(() => {
            //     instance.close();
            // }, 2000);

            //MessageBox('提示', '操作成功');

            // MessageBox({
            //   title: '提示',
            //   message: '确定执行此操作?',
            //   showCancelButton: true
            // });
        }
    }
}
</script>