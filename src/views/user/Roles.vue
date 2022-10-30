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
        :pagination="pagination"
        :data="roleList"
        :columns="columns"
        :loading="loading"
        @page-change="pageChange"
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
    <RoleEditDialog
      ref="roleEditDialog"
      @updateTable="fetchData"
    ></RoleEditDialog>
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
        { colKey: "roleName", title: "角色名称" },
        { colKey: "roleLabel", title: "角色标识" },
        {
          colKey: "operation",
          title: "操作",
          cell: "operation",
          fixed: "right",
          align: "center",
        },
      ],
      roleList: [],
      loading: false,
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 10,
        total: 0,
      },
      visible: false,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      const params = {
        pageSize: this.pagination.defaultPageSize,
        pageNum: this.pagination.defaultCurrent,
      };
      roleApi.list(params).then((res) => {
        this.roleList = res.data.roleList;
        this.pagination.defaultCurrent = res.data.pageNum;
        this.pagination.defaultPageSize = res.data.pageSize;
        this.pagination.total = res.data.total;
      });
      this.loading = false;
    },
    pageChange(pageInfo) {
      this.pagination.defaultCurrent = pageInfo.current;
      this.pagination.defaultPageSize = pageInfo.pageSize;
      this.fetchData();
    },
    handelEdit(value) {
      this.$refs.roleEditDialog.formData._id = value._id;
      this.$refs.roleEditDialog.visible = true;
    },
    handelDelete(value) {
      let mydialog = this.$dialog({
        header: "提示",
        body: "确认删除？",
        style: "color: rgba(0, 0, 0, 0.6)",
        onConfirm: () => {
          roleApi.remove(value._id).then((res) => {
            this.$message.success(res.message);
            this.fetchData();
          });
          mydialog.hide();
        },
      });
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
