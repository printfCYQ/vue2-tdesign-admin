<template>
  <div>
    <t-dialog
      width="70%"
      :closeOnEscKeydown="false"
      :closeOnOverlayClick="false"
      :header="formData.id ? '编辑' : '新建'"
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
            size="large"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="角色标识" name="roleLabel">
          <t-input
            clearable
            v-model="formData.roleLabel"
            placeholder="请输入角色标识"
            size="large"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="角色权限" name="rolePermission">
          <t-tree
            :data="permissionsTree"
            hover
            expand-all
            value-mode="all"
            :checkable="true"
            v-model="formData.rolePermission"
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
        id: "",
        roleLabel: "",
        roleName: "",
        rolePermission: [],
      },
      confirmBtn: {
        content: "确认",
        theme: "primary",
        loading: false,
      },
      rules: {
        roleLabel: [{ required: true, message: "请输入", type: "warning" }],
        roleName: [{ required: true, message: "请输入", type: "warning" }],
        rolePermission: [
          { required: true, message: "请选择", type: "warning" },
        ],
      },
      permissionsTree: permissionsTree,
    };
  },
  methods: {
    close() {
      this.formData = {
        id: "",
        roleLabel: "",
        roleName: "",
        rolePermission: [],
      };
      this.confirmBtn = {
        content: "确认",
        theme: "primary",
        loading: false,
      };
      this.visible = false;
    },
    confirm() {
      console.log(this.formData);
      this.confirmBtn.loading = true;
      this.$refs.form.validate().then((res) => {
        if (res === true) {
          this.confirmBtn.content = "保存中...";
          const funName = this.formData.id ? "update" : "create";
          roleApi[funName](this.formData).then((res) => {
            console.log(res);
            this.confirmBtn.loading = false;
            this.close();
          });
        } else {
          this.confirmBtn.loading = false;
        }
      });
      this.confirmBtn.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
