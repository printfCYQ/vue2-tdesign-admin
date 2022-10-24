<template>
  <div class="header">
    <t-button shape="square" variant="text" @click="toggleCollapsed">
      <menu-fold-icon slot="icon" v-if="collapsed" />
      <menu-unfold-icon slot="icon" v-if="!collapsed" />
    </t-button>
    <t-dropdown
      class="dropdown-container"
      :min-column-width="125"
      trigger="click"
    >
      <template #dropdown>
        <t-dropdown-menu>
          <t-dropdown-item class="dropdown-item" @click="personalCenter">
            <user-circle-icon />个人中心
          </t-dropdown-item>
          <t-dropdown-item class="dropdown-item" @click="handleLogout">
            <poweroff-icon />退出登录
          </t-dropdown-item>
        </t-dropdown-menu>
      </template>
      <t-button theme="default" variant="text">
        <template #icon>
          <user-circle-icon />
        </template>
        <div>
          Tencent
          <chevron-down-icon />
        </div>
      </t-button>
    </t-dropdown>
  </div>
</template>

<script>
import {
  ChevronDownIcon,
  MenuFoldIcon,
  MenuUnfoldIcon,
  PoweroffIcon,
  UserCircleIcon,
} from "tdesign-icons-vue";
export default {
  name: "Header",
  components: {
    MenuFoldIcon,
    MenuUnfoldIcon,
    ChevronDownIcon,
    UserCircleIcon,
    PoweroffIcon,
  },
  data() {
    return {
      options: [
        {
          content: "操作一",
          value: 1,
        },
        {
          content: "操作二",
          value: 2,
        },
        {
          content: "操作三",
          value: 3,
          disabled: true,
        },
        {
          content: "操作四",
          value: 4,
          disabled: true,
        },
      ],
    };
  },
  props: {
    collapsed: {
      default: false,
      type: Boolean,
    },
  },
  methods: {
    toggleCollapsed() {
      this.$emit("on-toggle-collapsed");
    },
    handleLogout() {
      console.log("logout");
      this.$router.push("/login");
    },
    personalCenter() {
      console.log("personalCenter");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
}

.t-dropdown__item {
  .t-icon {
    margin-right: 8px;
  }
}
</style>
