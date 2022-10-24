<template>
  <div>User</div>
</template>

<script>
import tokenApi from "@/api/token";
export default {
  name: "Dashboard",
  created() {
    tokenApi.create({ username: "123", password: "123123" }).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style lang="scss" scoped></style>
