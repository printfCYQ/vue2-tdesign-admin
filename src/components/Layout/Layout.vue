<template>
  <div>
    <t-layout>
      <Sidebar :collapsed="collapsed"></Sidebar>
      <t-layout>
        <t-header
          ><Header
            :collapsed="collapsed"
            @on-toggle-collapsed="toggleCollapsed"
          ></Header
        ></t-header>
        <t-content>
          <router-view />
        </t-content>
        <t-footer>footer</t-footer>
      </t-layout>
    </t-layout>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
export default {
  name: "Layout",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style lang="scss" scoped></style>
