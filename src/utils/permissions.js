import router from "@/router";
import store from "@/store";
const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  const hasToken = store.state.token;

  if (hasToken) {
    to.path === "/login" && next({ path: "/" });
  } else {
    whiteList.includes(to.path) ? next() : next(`login?redirect=${to.path}`);
  }
  next();
});
