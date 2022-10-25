<template>
  <div class="header">
    <div>
      <t-button shape="square" variant="text" @click="toggleCollapsed">
        <menu-fold-icon slot="icon" v-if="collapsed" />
        <menu-unfold-icon slot="icon" v-if="!collapsed" />
      </t-button>
    </div>
    <div class="header-right">
      <t-tooltip placement="bottom" content="代码仓库">
        <t-button
          theme="default"
          shape="square"
          variant="text"
          @click="navToGitHub"
        >
          <logo-github-filled-icon />
        </t-button>
      </t-tooltip>
      <t-tooltip placement="bottom" content="主题">
        <t-button
          theme="default"
          shape="square"
          variant="text"
          v-if="theme === 'light'"
          @click="toggleTheme"
        >
          <heart-icon />
        </t-button>
        <t-button
          theme="default"
          shape="square"
          variant="text"
          v-else
          @click="toggleTheme"
        >
          <heart-filled-icon />
        </t-button>
      </t-tooltip>
      <div class="theme"></div>
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
            {{ user.username }}
            <chevron-down-icon />
          </div>
        </t-button>
      </t-dropdown>
    </div>
  </div>
</template>

<script>
import storage from "@/utils/storage";
import {
  ChevronDownIcon,
  HeartFilledIcon,
  HeartIcon,
  LogoGithubFilledIcon,
  MenuFoldIcon,
  MenuUnfoldIcon,
  PoweroffIcon,
  UserCircleIcon,
} from "tdesign-icons-vue";
import { mapState } from "vuex";

export default {
  name: "Header",
  components: {
    MenuFoldIcon,
    MenuUnfoldIcon,
    ChevronDownIcon,
    UserCircleIcon,
    PoweroffIcon,
    HeartFilledIcon,
    HeartIcon,
    LogoGithubFilledIcon,
  },
  data() {
    return {
      user: storage.get("currentUser"),
    };
  },
  props: {
    collapsed: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    ...mapState(["theme"]),
  },
  created() {
    if (this.theme === "dark") {
      document.documentElement.setAttribute("theme-mode", "dark");
    } else {
      document.documentElement.removeAttribute("theme-mode");
    }
  },
  methods: {
    toggleCollapsed() {
      this.$emit("on-toggle-collapsed");
    },
    handleLogout() {
      this.$store.dispatch("logout");
      this.$router.push({
        path: `/login?redirect=${this.$route.fullPath}`,
      });
    },
    toggleTheme() {
      if (this.theme === "dark") {
        document.documentElement.removeAttribute("theme-mode");
        this.$store.dispatch("toggleTheme", "light");
      } else {
        document.documentElement.setAttribute("theme-mode", "dark");
        this.$store.dispatch("toggleTheme", "dark");
      }
    },
    navToGitHub() {
      window.open("https://github.com/cyq-vue-admin/vue2-tdesign-admin");
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

  .header-right {
    display: flex;
    align-items: center;
    .theme {
      margin-right: 20px;
      cursor: pointer;
    }
  }
}

.t-dropdown__item {
  .t-icon {
    margin-right: 8px;
  }
}
</style>
