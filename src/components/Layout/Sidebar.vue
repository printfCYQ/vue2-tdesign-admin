<template>
  <t-aside :width="collapsed ? '64px' : '232px'">
    <div class="side-menu">
      <t-menu
        :collapsed="collapsed"
        :theme="theme"
        :defaultValue="$route.name"
        :defaultExpanded="defaultExpanded"
      >
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
import { mapGetters, mapState } from "vuex";
import SidebarItme from "./SidebarItme.vue";
export default {
  name: "Sidebar",
  props: {
    collapsed: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      // defaultExpanded: [],
    };
  },
  computed: {
    ...mapState(["theme"]),
    ...mapGetters(["menuRoutes"]),
    defaultExpanded() {
      let pathList = this.$route.path.split("/");
      let routes = this.menuRoutes;
      let menuNameList = [];
      for (let i = 1; i < pathList.length - 1; i++) {
        let route = routes.find((item) => {
          item.children && (routes = item.children);
          return item.path === (i === 1 ? "/" : "") + pathList[i];
        });
        menuNameList.push(route.name);
      }
      return menuNameList;
    },
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
