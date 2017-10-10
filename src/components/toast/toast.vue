<template>
  <transition name="toast-fade">
    <div class="toast-wrapper" v-show="visible">
      <div :class="['toast', 'toast--' + displayStyle]">
        <!-- text only -->
        <div v-if="displayStyle === 'text'" class="toast__text">{{ message }}</div>
        <div v-if="displayStyle === 'html'" class="toast__text" v-html="message" />

        <!-- with icon -->
        <template v-if="displayStyle === 'default'">
          <loading v-if="type === 'loading'" color="white" />
          <icon v-else class="toast__icon" :name="type" />
          <div v-if="message" class="toast__text">{{ message }}</div>
        </template>
      </div>
      <div class="toast__overlay" v-if="forbidClick" />
    </div>
  </transition>
</template>

<script>
import Icon from '../icon';
import Loading from '../loading';

const TOAST_TYPES = ['text', 'html', 'loading', 'success', 'fail'];
const DEFAULT_STYLE_LIST = ['success', 'fail', 'loading'];

export default {
  name: 'toast',

  components: {
    [Icon.name]: Icon,
    [Loading.name]: Loading
  },

  props: {
    type: {
      type: String,
      default: 'text',
      validator: value => TOAST_TYPES.indexOf(value) > -1
    },
    message: {
      type: String,
      default: ''
    },
    forbidClick: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible: false
    };
  },

  computed: {
    displayStyle() {
      return DEFAULT_STYLE_LIST.indexOf(this.type) !== -1 ? 'default' : this.type;
    }
  }
};
</script>

<style>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;  
  color: #fff;
  z-index: 3001;
  font-size: 12px;
  line-height: 1.2;
  border-radius: 5px;
  -webkit-box-align: center;
  -webkit-align-items: center;
          align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
          justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
          flex-direction: column;
  -webkit-transform: translate3d(-50%, -50%, 0);
          transform: translate3d(-50%, -50%, 0);
  background-color: rgba(39, 39, 39, .7);
}

.toast-wrapper {
    -webkit-transition: opacity .2s;
    transition: opacity .2s;
}

.toast__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3000;
    background: transparent;
}

.toast--text {
    padding: 12px;
    min-width: 200px;
}

.toast--default {
    width: 90px;
    min-height: 90px;
    padding: 15px;
}

.toast--default .toast__icon {
      font-size: 50px;
}

.toast--default .van-loading {
      margin: 10px 0 5px;
}

.toast--default .toast__text {
      font-size: 14px;
      padding-top: 10px;
}

.toast-fade-enter, .toast-fade-leave-to {
  opacity: 0;
}

</style>

