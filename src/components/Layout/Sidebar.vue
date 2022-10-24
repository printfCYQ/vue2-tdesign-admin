<template>
  <t-aside :width="collapsed ? '64px' : '232px'">
    <div class="side-menu">
      <t-menu :collapsed="collapsed">
        <!-- <template #logo>
          <img
            width="136"
            src="https://www.tencent.com/img/index/menu_logo_hover.png"
            alt="logo"
          />
        </template> -->
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
  components: { SidebarItme },
};
</script>

<style lang="scss" scoped>
.side-menu {
  height: 100vh;
}
</style>
