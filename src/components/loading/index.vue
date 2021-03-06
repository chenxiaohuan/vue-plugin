<template>
  <div :class="['loading', 'loading--' + type]">
    <span :class="['loading__spinner', 'loading__spinner--' + type, 'loading__spinner--' + color]"></span>
  </div>
</template>

<script>
const VALID_TYPES = ['gradient-circle', 'circle'];
const VALID_COLORS = ['black', 'white'];

export default {
  name: 'loading',

  props: {
    type: {
      type: String,
      default: 'gradient-circle',
      validator: value => VALID_TYPES.indexOf(value) > -1
    },
    color: {
      type: String,
      default: 'black',
      validator: value => VALID_COLORS.indexOf(value) > -1
    }
  }
};
</script>

<style>
@-webkit-keyframes loading {
  from {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

@keyframes loading {
  from {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

.loading {
  font-size: 0;
  line-height: 0;
}

.loading--circle {
    width: 16px;
    height: 16px;
    vertical-align: middle;
  }

.loading--gradient-circle {
    width: 30px;
    height: 30px;
  }

.loading__spinner {
    width: 100%;
    height: 100%;
    display: inline-block;
    -webkit-animation: loading 0.8s linear infinite;
            animation: loading 0.8s linear infinite;
  }

.loading__spinner--circle {
      border-radius: 100%;
      border: 3px solid transparent;
      box-sizing: border-box
    }

.loading__spinner--circle.loading__spinner--black {
  border-color: #c9c9c9;
  border-top-color: #666;
}

.loading__spinner--circle.loading__spinner--white {
  border-color: rgba(0, 0, 0, .1);
  border-top-color: rgba(255, 255, 255, .7);
}

.loading__spinner--gradient-circle.loading__spinner--black {
  background: url('data:image/png;base64,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');
  background-size: contain;
}

.loading__spinner--gradient-circle.loading__spinner--white {
  background: url('data:image/png;base64,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');
  background-size: contain;
}
</style>

