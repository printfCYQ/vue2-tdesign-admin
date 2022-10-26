import store from "@/store";
import Vue from "vue";

const checkPermission = (el, binding) => {
  const { value } = binding;
  const userPermissions = store.getters.userPermissions;

  if (typeof value === "string" && value) {
    const hasPermission = userPermissions.includes(value);
    if (!hasPermission && el.parentNode) {
      el.parentNode.removeChild(el);
    }
  } else {
    throw new Error("v-permission指令只接收字符串");
  }
};

Vue.directive("permission", {
  inserted(el, binding) {
    checkPermission(el, binding);
  },
  update(el, binding) {
    checkPermission(el, binding);
  },
});
