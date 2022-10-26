<template>
  <div>
    <t-card bordered :style="{ width: '100%' }">
      <div>
        <t-button
          v-permission="'user:roles:add'"
          theme="primary"
          @click="handelAdd"
        >
          <add-icon slot="icon" />
          新建角色
        </t-button>
      </div>
      <t-table
        row-key="index"
        :pagination="{ total: 30 }"
        :data="roleList"
        :columns="columns"
      >
        <template #operation="{ row }">
          <div class="operation">
            <t-button
              class="operation-item"
              size="small"
              theme="primary"
              @click="handelEdit(row)"
            >
              <edit-icon slot="icon" />
              编辑
            </t-button>
            <t-button
              class="operation-item"
              size="small"
              theme="danger"
              @click="handelDelete(row)"
            >
              <delete-icon slot="icon" />
              删除
            </t-button>
          </div>
        </template>
      </t-table>
    </t-card>
    <RoleEditDialog ref="roleEditDialog"></RoleEditDialog>
  </div>
</template>

<script>
import roleApi from "@/api/role.js";
import { AddIcon, DeleteIcon, EditIcon } from "tdesign-icons-vue";
import RoleEditDialog from "./RoleEditDialog.vue";
export default {
  name: "UserRoles",
  components: { AddIcon, DeleteIcon, EditIcon, RoleEditDialog },
  data() {
    return {
      columns: [
        { colKey: "name", title: "角色名称" },
        { colKey: "label", title: "角色标识" },
        {
          colKey: "operation",
          title: "操作",
          cell: "operation",
          fixed: "right",
          align: "center",
        },
      ],
      roleList: [
        { name: "ROLE_USER", label: "游客" },
        { name: "ROLE_ADMIN", label: "管理员" },
      ],
      visible: false,
    };
  },
  created() {
    roleApi.list().then((res) => {
      console.log(res);
      this.roleList = res.data;
    });
  },
  methods: {
    handelEdit(value) {
      console.log(value);
      this.$refs.roleEditDialog.visible = true;
      this.$refs.roleEditDialog.formData = value;
    },
    handelDelete(value) {
      console.log(value);
    },
    handelAdd() {
      this.$refs.roleEditDialog.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.operation {
  display: flex;
  justify-content: center;
  &-item {
    margin-left: 10px;
  }
}
</style>
