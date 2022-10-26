<template>
  <div>
    <t-card bordered :style="{ width: '100%' }">
      <t-button v-permission="'user:list'">v-permission指令</t-button>
    </t-card>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>

<style lang="scss" scoped></style>
