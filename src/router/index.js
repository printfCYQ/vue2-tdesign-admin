import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Layout from "@/components/Layout/Layout.vue";
import PageLayout from "@/components/Layout/PageLayout.vue";
import permissions from "@/config/permissions.config.js";
import Login from "@/views/login/Index.vue";
const menuRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      title: "控制台",
      icon: "dashboard",
      permission: permissions.DASHBOARD,
    },
    component: PageLayout,
    children: [
      {
        path: "base",
        name: "DashboardBase",
        meta: {
          title: "数据统计",
          icon: "usergroup",
          permission: permissions.USER_LIST,
        },
        component: () => import("@/views/dashboard/Index.vue"),
      },
    ],
  },
  {
    path: "/user",
    name: "User",
    meta: {
      title: "用户管理",
      icon: "user",
      permission: permissions.USER,
    },
    component: PageLayout,
    children: [
      {
        path: "list",
        name: "UserList",
        meta: {
          title: "用户列表",
          icon: "usergroup",
          permission: permissions.USER_LIST,
        },
        component: () => import("@/views/user/Index.vue"),
      },
    ],
  },
];

export const menuRootName = "menuRoot";
export const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard/base",
    name: menuRootName,
    children: [...menuRoutes],
  },
  {
    path: "/login",
    name: "Login",
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
