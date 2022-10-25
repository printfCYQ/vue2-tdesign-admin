import router from "@/router";
import store from "@/store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  NProgress.start();
  const hasToken = store.state.token;
  if (hasToken) {
    to.path === "/login" && next({ path: "/" });
  } else {
    whiteList.includes(to.path) ? next() : next(`login?redirect=${to.path}`);
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
