<template>
  <t-tabs
    theme="card"
    :value="$route.path"
    @change="handleChangeCurrentTab"
    :style="{ position: 'sticky', top: 0, width: '100%' }"
  >
    <t-tab-panel
      v-for="(route, idx) in tabRouterList"
      :value="route.path"
      :key="`${route.path}_${idx}`"
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
            {{ route.title }}
          </template>
          <home-icon v-else />
          <template #dropdown>
            <t-dropdown-menu>
              <t-dropdown-item @click="() => handleRefresh(route.path, idx)">
                <refresh-icon />
                刷新
              </t-dropdown-item>
              <t-dropdown-item
                v-if="idx > 0"
                @click="() => handleCloseAhead(route.path, idx)"
              >
                <arrow-left-icon />
                关闭左侧
              </t-dropdown-item>
              <t-dropdown-item
                v-if="idx < tabRouterList.length - 1"
                @click="() => handleCloseBehind(route.path, idx)"
              >
                <arrow-right-icon />
                关闭右侧
              </t-dropdown-item>
              <t-dropdown-item @click="() => handleCloseOther(route.path, idx)">
                <close-circle-icon />
                关闭其它
              </t-dropdown-item>
            </t-dropdown-menu>
          </template>
        </t-dropdown>
      </template>
    </t-tab-panel>
  </t-tabs>
</template>

<script>
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseCircleIcon,
  HomeIcon,
  RefreshIcon,
} from "tdesign-icons-vue";
export default {
  name: "Navbar",
  components: {
    RefreshIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    HomeIcon,
    CloseCircleIcon,
  },
  data() {
    return {
      theme: "normal",
      value: "1",
      tabRouterList: [
        // { path: "/user/role", title: "122131" },
        // { path: "123", title: "122131" },
        // { path: "123", title: "122131" },
        // { path: "123", title: "122131" },
        // { path: "123", title: "122131" },
        // { path: "123", title: "122131" },
        // { path: "123", title: "122131" },
        // { path: "123", title: "122131" },
        // { path: "123", title: "122131" },
        // { path: "123", title: "122131" },
        // { path: "123", title: "122131" },
        // { path: "123", title: "122131" },
        // { path: "123", title: "122131" },
        // { path: "123", title: "122131" },
      ],
    };
  },
  methods: {
    handleChangeCurrentTab() {},
    handleTabMenuClick() {},
    handleRemove() {},
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  width: 100%;
  overflow: hidden;
}
.item {
  display: flex;
}
</style>
