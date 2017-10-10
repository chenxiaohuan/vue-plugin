<template>
  <div class="tab" :class="[`tab--${type}`]">
    <div class="tab__nav-wrap" v-if="type === 'line' && tabs.length > 4">
      <div class="tab__swipe" ref="swipe">
        <div class="tab__nav tab__nav--line">
          <div class="tab__nav-bar" :style="navBarStyle"></div>
          <div
            v-for="(tab, index) in tabs"
            :key="index"
            class="tab-item van-hairline"
            :class="{ 'tab-item--active': index === curActive }"
            ref="tabkey"
            @click="handleTabClick(index)"
          >
            {{ tab.title }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="tab__nav"
      :class="[`tab__nav--${this.type}`]"
    >
      <div class="tab__nav-bar" :style="navBarStyle" v-if="type === 'line'"></div>
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-item van-hairline"
        :class="{ 'tab-item--active': index === curActive }"
        ref="tabkey"
        @click="handleTabClick(index)"
      >
        {{ tab.title }}
      </div>
    </div>
    <div class="tab__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import swipe from './swipe';
  import translateUtil from '@/utils/transition';

  export default {
    name: 'tab',

    props: {
      // 外部传入的激活的tab标签
      active: {
        type: [Number, String],
        default: 0
      },
      // 是默认的line还是card
      type: {
        type: String,
        default: 'line'
      },
      // 切换tab的动画时间
      duration: {
        type: Number,
        default: 0.3
      }
    },

    data() {
      return {
        tabs: [],
        isReady: false,
        curActive: +this.active,
        isSwiping: false
      };
    },

    watch: {
      active(val) {
        this.curActive = +val;
      },

      curActive() {
        /* istanbul ignore else */
        if (this.tabs.length > 4) {
          this.doOnValueChange();
        }
      }
    },

    computed: {
      /**
       * `type`为`line`时，tab下方的横线的样式
       */
      navBarStyle() {
        if (!this.isReady || this.type !== 'line' || !this.$refs.tabkey) return;

        const tabKey = this.curActive;
        const elem = this.$refs.tabkey[tabKey];
        const offsetWidth = `${elem.offsetWidth || 0}px`;
        const offsetLeft = `${elem.offsetLeft || 0}px`;

        return {
          width: offsetWidth,
          transform: `translate3d(${offsetLeft}, 0, 0)`,
          transitionDuration: `${this.duration}s`
        };
      },
      swipeWidth() {
        return this.$refs.swipe && this.$refs.swipe.getBoundingClientRect().width;
      },
      maxTranslate() {
        /* istanbul ignore if */
        if (!this.$refs.tabkey) return;

        const lastTab = this.$refs.tabkey[this.tabs.length - 1];
        const lastTabWidth = lastTab.offsetWidth;
        const lastTabOffsetLeft = lastTab.offsetLeft;

        return (lastTabOffsetLeft + lastTabWidth) - this.swipeWidth;
      }
    },

    mounted() {
      // 页面载入完成
      this.$nextTick(() => {
        // 可以开始触发在computed中关于nav-bar的css动画
        this.isReady = true;
        this.initEvents();
  
        if (this.tabs.length > 4) {
          this.doOnValueChange();
        }
      });
    },

    methods: {
      handleTabClick(index) {
        if (this.tabs[index].disabled) {
          this.$emit('disabled', index);
          return;
        }

        this.$emit('click', index);
        this.curActive = index;
      },

      /**
       * 将当前value值转换为需要translate的值
       */
      value2Translate(value) {
        /* istanbul ignore if */
        if (!this.$refs.tabkey) return 0;

        const tab = this.$refs.tabkey[value];
        const maxTranslate = this.maxTranslate;
        const tabWidth = tab.offsetWidth;
        const tabOffsetLeft = tab.offsetLeft;
        let translate = tabOffsetLeft + (tabWidth * 2.7) - this.swipeWidth;
        if (translate < 0) {
          translate = 0;
        }

        return -1 * (translate > maxTranslate ? maxTranslate : translate);
      },

      initEvents() {
        const el = this.$refs.swipe;
        if (!el) return;

        let swipeState = {};

        swipe(el, {
          start: event => {
            swipeState = {
              start: new Date(),
              startLeft: event.pageX,
              startTranslateLeft: translateUtil.getElementTranslate(el).left
            };
          },

          drag: event => {
            this.isSwiping = true;

            swipeState.left = event.pageX;
            const deltaX = swipeState.left - swipeState.startLeft;
            const translate = swipeState.startTranslateLeft + deltaX;

            /* istanbul ignore else */
            if (translate > 0 || (translate * -1) > this.maxTranslate) return;

            translateUtil.translateElement(el, translate, null);
          },

          end: () => {
            this.isSwiping = false;
          }
        });
      },

      doOnValueChange() {
        const value = +this.curActive;
        const swipe = this.$refs.swipe;

        translateUtil.translateElement(swipe, this.value2Translate(value), null);
      }
    }
  };
</script>

<style>
.tab {
  position: relative;
}

.tab__nav-wrap {
    overflow: hidden;
}

.tab__swipe {
    -webkit-user-select: none;
            user-select: none;
    -webkit-transition: -webkit-transform linear .2s;
    transition: -webkit-transform linear .2s;
    transition: transform linear .2s;
    transition: transform linear .2s, -webkit-transform linear .2s;
}

.tab__swipe .tab-item {
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 22%;
    flex: 0 0 22%;
}

.tab__swipe .tab__nav {
    overflow: visible;
}

.tab__nav {
    overflow: hidden;
    -webkit-transition: -webkit-transform .5s cubic-bezier(.645, .045, .355, 1);
    transition: -webkit-transform .5s cubic-bezier(.645, .045, .355, 1);
    transition: transform .5s cubic-bezier(.645, .045, .355, 1);
    transition: transform .5s cubic-bezier(.645, .045, .355, 1), -webkit-transform .5s cubic-bezier(.645, .045, .355, 1);
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
}

.tab__nav--line {
    height: 44px;
}

.tab__nav--line .tab-item::after {
  border-width: 1px 0;
}

.tab__nav--card {
    height: 28px;
    margin: 0 15px;
    background-color: #fff;
    border-radius: 2px;
    border: 1px solid #666;
    overflow: hidden;
}

.tab__nav--card .tab-item {
    color: #666;
    line-height: 28px;
    border-right: 1px solid #666
}

.tab__nav--card .tab-item:last-child {
  border-right: none;
}

.tab__nav--card .tab-item.tab-item--active {
  background-color: #666;
  color: #fff;
}

.tab__nav-bar {
    z-index: 1;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 2px;
    background-color: #f13e3a;
    -webkit-transition: -webkit-transform .3s cubic-bezier(.645, .045, .355, 1);
    transition: -webkit-transform .3s cubic-bezier(.645, .045, .355, 1);
    transition: transform .3s cubic-bezier(.645, .045, .355, 1);
    transition: transform .3s cubic-bezier(.645, .045, .355, 1), -webkit-transform .3s cubic-bezier(.645, .045, .355, 1);
    -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
}

.tab-item {
  position: relative;
  color: #333;
  background-color: #fff;
  font-size: 14px;
  line-height: 44px;
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
          flex: 1;
}

.tab-item--active {
    color: #f44;
}

.tab-item__pane {
    display: none;
}

.tab-item__pane--select {
      display: block;
}
</style>

