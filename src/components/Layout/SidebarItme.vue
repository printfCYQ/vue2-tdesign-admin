<template>
  <div>
    <t-menu-item
      v-if="item && !item.children"
      :value="item.path"
      :to="item.path"
      @click="clickEmnuItem($event, item)"
    >
      <template #icon>
        <t-icon :name="item.meta.icon" />
      </template>
      {{ item.meta.title }}
    </t-menu-item>
    <t-submenu
      v-if="item && item.children"
      :value="item.path"
      :title="item.meta.title"
    >
      <template #icon>
        <t-icon :name="item.meta.icon" />
      </template>
      <sidebar-item
        v-for="i in item.children"
        :key="i.path"
        :item="i"
      ></sidebar-item>
    </t-submenu>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      value: null,
    },
  },
  methods: {
    clickEmnuItem(e, item) {
      this.$store.dispatch("navbar/addNavbar", item);
      this.$store.dispatch("navbar/setActiveTabPath", item.path);
    },
  },
};
</script>
