import router from "@/router";
import store from "@/store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
const whiteList = ["/login", "/403", "/404"];

router.beforeEach((to, from, next) => {
  NProgress.start();

  // token 鉴权
  const hasToken = store.state.token;
  if (hasToken && to.path === "/login") {
    next({ path: "/" });
  }
  if (!hasToken) {
    whiteList.includes(to.path) ? next() : next(`login?redirect=${to.path}`);
  }

  // 403 鉴权
  const hasPermissions = store.getters.permissionRoutesNameList.includes(
    to.name
  );
  if (!hasPermissions && !whiteList.includes(to.path)) {
    next({ path: "/403" });
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
