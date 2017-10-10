<template>
  <div :class="['tab-item__pane', { 'tab-item__pane--select': key === $parent.curActive }]">
    <slot></slot>
  </div>
</template>

<script>
import findParent from '@/mixins/findParent';

export default {
  name: 'tab-item',

  mixins: [findParent],

  props: {
    title: {
      type: String,
      required: true
    },
    disabled: Boolean
  },

  data() {
    this.findParentByComponentName('tab');
    const nextIndex = this.parentGroup.tabs.length;
    this.updateParentData(nextIndex);
    return {
      key: nextIndex
    };
  },

  watch: {
    title() {
      this.updateParentData();
    },
    disabled() {
      this.updateParentData();
    }
  },

  methods: {
    updateParentData(nextIndex) {
      const index = arguments.length ? nextIndex : this.key;
      this.parentGroup.tabs.splice(index, 1, {
        title: this.title,
        disabled: this.disabled,
        index
      });
    }
  }
};
</script>
