<template>
  <div class="content-view">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "PageLayout",
};
</script>
<style lang="scss" scoped>
.content-view {
  padding: 20px;
}
</style>
