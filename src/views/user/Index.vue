<template>
  <div>
    <t-card bordered :style="{ width: '100%' }">
      <div>
        <t-button
          v-permission="'user:list:add'"
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
        :data="userList"
        :columns="columns"
        :loading="loading"
        @page-change="pageChange"
      >
        <template #avatar="{ col, row }">
          <t-image
            :src="row[col.colKey]"
            fit="cover"
            :style="{ width: '60px', height: '60px' }"
          />
        </template>
        <template #role="{ col, row }">
          <t-tag
            theme="primary"
            v-for="item in row[col.colKey]"
            :key="item._id"
          >
            {{ item.roleName }}</t-tag
          >
        </template>
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
    <UserEditDialog
      ref="userEditDialog"
      @updateTable="fetchData"
    ></UserEditDialog>
  </div>
</template>

<script>
import userApi from "@/api/user.js";
import { AddIcon, DeleteIcon, EditIcon } from "tdesign-icons-vue";
import UserEditDialog from "./UserEditDialog.vue";
export default {
  name: "UserUsers",
  components: { AddIcon, DeleteIcon, EditIcon, UserEditDialog },
  data() {
    return {
      columns: [
        { colKey: "userName", title: "用户名" },
        { colKey: "email", title: "邮箱" },
        { colKey: "avatar", title: "头像", cell: "avatar" },
        { colKey: "role", title: "角色", cell: "role" },
        {
          colKey: "operation",
          title: "操作",
          cell: "operation",
          fixed: "right",
          align: "center",
        },
      ],
      userList: [],
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
      userApi.list(params).then((res) => {
        this.userList = res.data.userList;
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
      this.$refs.userEditDialog.formData._id = value._id;
      this.$refs.userEditDialog.visible = true;
    },
    handelDelete(value) {
      let mydialog = this.$dialog({
        header: "提示",
        body: "确认删除？",
        style: "color: rgba(0, 0, 0, 0.6)",
        onConfirm: () => {
          userApi.remove(value._id).then((res) => {
            this.$message.success(res.message);
            this.fetchData();
          });
          mydialog.hide();
        },
      });
    },
    handelAdd() {
      this.$refs.userEditDialog.visible = true;
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
