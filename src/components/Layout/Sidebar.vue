<template>
  <t-aside :width="collapsed ? '64px' : '232px'">
    <div class="side-menu">
      <t-menu :collapsed="collapsed" :theme="theme" :defaultValue="$route.name">
        <!--         :defaultExpanded="defaultExpanded" -->
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
    // defaultExpanded() {
    //   const path = this.active;
    //   console.log(path);
    //   const parentPath = path.substring(0, path.lastIndexOf("/"));
    //   return parentPath === "" ? [] : [parentPath];
    // },
    // active() {
    //   if (!this.$route.path) {
    //     return "";
    //   }
    //   console.log(this.$route.path);
    //   let a = this.$route.path
    //     .split("/")
    //     .filter((_item, index) => index === 1)
    //     // .filter((_item, index) => index <= this.maxLevel && index > 0)
    //     .map((item) => `/${item}`)
    //     .join("");
    //   console.log(a);
    //   return a;
    // },
  },
  components: { SidebarItme },
  created() {
    console.log(this.menuRoutes);
  },
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
