const permissions = {
  DASHBOARD: "dashboard",
  DASHBOARD_BASE: "dashboard:base",
  USER: "user",
  USER_LIST: "user:list",
  USER_LIST_ADD: "user:list:add",
  USER_ROLES: "user:roles",
  USER_ROLES_ADD: "user:roles:add",
};

export const permissionsTree = [
  {
    value: permissions.DASHBOARD,
    label: "控制台",
    children: [
      {
        value: permissions.DASHBOARD_BASE,
        label: "数据统计",
      },
    ],
  },
  {
    value: permissions.USER,
    label: "用户管理",
    children: [
      {
        value: permissions.USER_LIST,
        label: "用户列表",
        children: [
          {
            value: permissions.USER_LIST_ADD,
            label: "添加用户",
          },
        ],
      },
      {
        value: permissions.USER_ROLES,
        label: "角色列表",
        children: [
          {
            value: permissions.USER_ROLES_ADD,
            label: "添加角色",
          },
        ],
      },
    ],
  },
];

export default permissions;
