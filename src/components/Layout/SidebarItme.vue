<template>
  <div>
    <t-menu-item
      v-if="item && !item.children"
      :value="item.name"
      :to="{
        name: item.name,
      }"
    >
      <template #icon>
        <t-icon :name="item.meta.icon" />
      </template>
      {{ item.meta.title }}
    </t-menu-item>
    <t-submenu
      v-if="item && item.children"
      :value="item.name"
      :title="item.meta.title"
    >
      <template #icon>
        <t-icon :name="item.meta.icon" />
      </template>
      <sidebar-item
        v-for="i in item.children"
        :key="i.name"
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
};
</script>
