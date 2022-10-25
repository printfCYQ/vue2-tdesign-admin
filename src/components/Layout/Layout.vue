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
        <t-footer>
          <Footer></Footer>
        </t-footer>
      </t-layout>
    </t-layout>
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
export default {
  name: "Layout",
  components: {
    Sidebar,
    Footer,
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
