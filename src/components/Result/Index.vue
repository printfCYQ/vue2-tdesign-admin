<template>
  <div class="result-container">
    <div class="result-bg-img">
      <CloseCircleFilledIcon
        size="80px"
        style="color: #e34d59"
        v-if="type === '403'"
      />
      <HelpCircleFilledIcon
        size="80px"
        style="color: #ed7b2f"
        v-else-if="type === '404'"
      />
      <ErrorCircleFilledIcon size="80px" style="color: #e7e7e7" v-else />
    </div>
    <div class="result-title">{{ title }}</div>
    <div class="result-tip">{{ tip }}</div>
    <slot />
  </div>
</template>
<script>
import {
  CloseCircleFilledIcon,
  ErrorCircleFilledIcon,
  HelpCircleFilledIcon,
} from "tdesign-icons-vue";
export default {
  name: "Result",
  components: {
    CloseCircleFilledIcon,
    ErrorCircleFilledIcon,
    HelpCircleFilledIcon,
  },
  props: {
    bgUrl: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    tip: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
.result {
  &-container {
    min-height: 400px;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
  &-title {
    font-style: normal;
    font-weight: 500;
    margin-top: 20px;
    color: var(--td-text-color-primary);
    font-size: 20px;
    line-height: 20px;
  }
  &-tip {
    margin: 8px 0 32px;
    font-size: 16px;
    color: var(--td-text-color-secondary);
    line-height: 16px;
  }
}
</style>
