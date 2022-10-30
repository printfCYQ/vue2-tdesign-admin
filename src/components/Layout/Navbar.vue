<template>
  <div class="nav-bar">
    <t-tabs
      theme="card"
      :value="activeTabPath"
      @change="handleChangeCurrentTab"
      :style="{ position: 'sticky', top: 0, width: '100%' }"
    >
      <t-tab-panel
        v-for="(route, idx) in navbarList"
        :value="route.path"
        :key="`${route.name}_${idx}`"
        :removable="!route.isHome"
        @remove="() => handleRemove(route.path, idx)"
      >
        <template #label>
          <t-dropdown
            trigger="context-menu"
            :minColumnWidth="128"
            :popupProps="{
              overlayClassName: 'route-tabs-dropdown',
              onVisibleChange: (visible, ctx) =>
                handleTabMenuClick(visible, ctx, route.path),
              visible: activeTabPath === route.path,
            }"
          >
            <template v-if="!route.isHome">
              {{ route.meta && route.meta.title }}
            </template>
            <home-icon v-else />
            <template #dropdown>
              <t-dropdown-menu>
                <!-- <t-dropdown-item @click="() => handleRefresh(route.name)">
                  <refresh-icon />
                  刷新
                </t-dropdown-item> -->
                <t-dropdown-item
                  v-if="idx > 0"
                  @click="() => handleCloseAhead(route.path, idx)"
                >
                  <arrow-left-icon />
                  关闭左侧
                </t-dropdown-item>
                <t-dropdown-item
                  v-if="idx < navbarList.length - 1"
                  @click="() => handleCloseBehind(route.path, idx)"
                >
                  <arrow-right-icon />
                  关闭右侧
                </t-dropdown-item>
                <t-dropdown-item
                  @click="() => handleCloseOther(route.path, idx)"
                >
                  <close-circle-icon />
                  关闭其它
                </t-dropdown-item>
              </t-dropdown-menu>
            </template>
          </t-dropdown>
        </template>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<script>
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseCircleIcon,
  HomeIcon,
} from "tdesign-icons-vue";
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  components: {
    // RefreshIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    HomeIcon,
    CloseCircleIcon,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      navbarList: "navbar/navbarList",
      activeTabPath: "navbar/activeTabPath",
    }),
  },
  methods: {
    handleChangeCurrentTab(path) {
      this.$router.push(path);
      this.$store.dispatch("navbar/setActiveTabPath", path);
    },
    handleRemove(path, index) {
      const nextRouter =
        this.navbarList[index + 1] || this.navbarList[index - 1];
      this.$store.dispatch("navbar/removeNavbar", index);
      this.$router.push(nextRouter.path);
    },
    handleTabMenuClick(visible, ctx, path) {
      if (ctx?.trigger === "document") {
        this.$store.dispatch("navbar/setActiveTabPath", "");
      }
      if (visible) {
        this.$store.dispatch("navbar/setActiveTabPath", path);
      }
    },

    handleCloseAhead(path, index) {
      this.$store.dispatch("navbar/closeAhead", index);
      this.$router.push(path);
      this.$store.dispatch("navbar/setActiveTabPath", path);
    },
    handleCloseBehind(path, index) {
      this.$store.dispatch("navbar/closeBehind", index);
      this.$router.push(path);
      this.$store.dispatch("navbar/setActiveTabPath", path);
    },
    handleCloseOther(path, index) {
      this.$store.dispatch("navbar/closeOther", index);
      this.$router.push(path);
      this.$store.dispatch("navbar/setActiveTabPath", path);
    },

    handleRefresh() {
      //
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
}
</style>
