<template>
  <result type="403" title="403 Forbidden" tip="抱歉，您无权限访问此页面">
    <t-button @click="() => $router.push('/')">返回首页</t-button>
  </result>
</template>

<script>
import result from "@/components/Result/Index.vue";
export default {
  name: "Result403",
  components: { result },
};
</script>
