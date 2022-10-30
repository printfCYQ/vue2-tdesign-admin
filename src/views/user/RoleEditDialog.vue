<template>
  <div>
    <t-dialog
      width="70%"
      :closeOnEscKeydown="false"
      :closeOnOverlayClick="false"
      :header="formData._id ? '编辑' : '新建'"
      :visible.sync="visible"
      :confirmBtn="confirmBtn"
      @close="close"
      @confirm="confirm"
    >
      <t-form :data="formData" :rules="rules" ref="form" :colon="true">
        <t-form-item label="角色名称" name="roleName">
          <t-input
            clearable
            v-model="formData.roleName"
            placeholder="请输入角色名称"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="角色标识" name="roleLabel">
          <t-input
            clearable
            v-model="formData.roleLabel"
            placeholder="请输入角色标识"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="角色权限" name="permissionList">
          <t-tree
            ref="tree"
            :data="permissionsTree"
            hover
            expand-all
            :checkable="true"
            v-model="formData.permissionList"
          />
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>

<script>
import roleApi from "@/api/role.js";
import { permissionsTree } from "@/config/permissions.config.js";

export default {
  name: "RoleEditDialog",
  data() {
    return {
      visible: false,
      formData: {
        _id: "",
        roleLabel: "",
        roleName: "",
        permissionList: [],
      },
      confirmBtn: {
        content: "确认",
        theme: "primary",
        loading: false,
      },
      rules: {
        roleLabel: [{ required: true, message: "请输入", type: "warning" }],
        roleName: [{ required: true, message: "请输入", type: "warning" }],
        permissionList: [
          { required: true, message: "请选择", type: "warning" },
        ],
      },
      permissionsTree: permissionsTree,
    };
  },
  watch: {
    "formData._id": {
      handler(newValue) {
        newValue && this.findById();
      },
      immediate: true,
    },
  },
  methods: {
    findById() {
      roleApi.findById({ roleId: this.formData._id }).then((res) => {
        this.formData.roleLabel = res.data.role.roleLabel;
        this.formData.roleName = res.data.role.roleName;
        this.formData.permissionList = res.data.role.permissionList;
      });
    },
    close() {
      this.formData = {
        _id: "",
        roleLabel: "",
        roleName: "",
        permissionList: [],
      };
      this.confirmBtn = {
        content: "确认",
        theme: "primary",
        loading: false,
      };
      this.$refs.form.reset();
      this.visible = false;
    },
    confirm() {
      console.log(this.formData);
      this.confirmBtn.loading = true;
      this.$refs.form.validate().then((res) => {
        if (res === true) {
          let permissionList = [];
          this.formData.permissionList.map((item) => {
            let nodeArr = this.$refs.tree.getParents(item);
            nodeArr.map((i) => {
              permissionList.push(i.value);
            });
          });
          permissionList = [
            ...this.formData.permissionList,
            ...Array.from(new Set(permissionList)),
          ];
          this.confirmBtn.content = "保存中...";
          const funName = this.formData._id ? "update" : "create";
          !this.formData._id && delete this.formData._id;
          roleApi[funName]({
            ...this.formData,
            permissionList,
          })
            .then((res) => {
              this.$message.success(res.message);
              this.confirmBtn.loading = false;
              this.close();
              this.$emit("updateTable");
            })
            .catch(() => {
              this.confirmBtn.loading = false;
              this.confirmBtn.content = "确认";
            });
        } else {
          this.confirmBtn.loading = false;
          this.confirmBtn.content = "确认";
        }
      });
      this.confirmBtn.loading = false;
      this.confirmBtn.content = "确认";
    },
  },
};
</script>

<style lang="scss" scoped></style>
