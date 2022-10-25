<template>
  <t-aside :width="collapsed ? '64px' : '232px'">
    <div class="side-menu">
      <t-menu :collapsed="collapsed" :theme="theme">
        <template #logo>
          <div class="logo-text">{{ collapsed ? "CYQ" : "CYQ admin" }}</div>
        </template>
        <SidebarItme
          v-for="item in menuRoutes"
          :key="item.name"
          :item="item"
        ></SidebarItme>
      </t-menu>
    </div>
  </t-aside>
</template>

<script>
import { menuRoutes } from "@/router/index";
import { mapState } from "vuex";
import SidebarItme from "./SidebarItme.vue";
export default {
  name: "Sidebar",
  data() {
    return {
      menuRoutes,
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
  components: { SidebarItme },
};
</script>

<style lang="scss" scoped>
.side-menu {
  height: 100vh;
}
.logo-text {
  text-align: center;
  width: 100%;
  font-size: 20px;
}
</style>
