import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Layout from "@/components/Layout/Layout.vue";
import PageLayout from "@/components/Layout/PageLayout.vue";
import Login from "@/views/login/Index.vue";

export const menuRoutes = [
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      title: "控制台",
      icon: "dashboard",
    },
    component: () => import("@/views/dashboard/Index.vue"),
  },
  {
    path: "/user",
    name: "user",
    meta: {
      title: "用户管理",
      icon: "user",
    },
    component: PageLayout,
    children: [
      {
        path: "/user-list",
        name: "userList",
        meta: {
          title: "用户列表",
          icon: "usergroup",
        },
        component: () => import("@/views/user/Index.vue"),
      },
    ],
  },
];

const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "dashboard",
    children: [...menuRoutes],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const createRouter = () => {
  return new VueRouter({
    routes,
  });
};

export const resetRouter = () => {
  const newRouter = createRouter();
  router.macher = newRouter.macher;
};

const router = createRouter();

export default router;
