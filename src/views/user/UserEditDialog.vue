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
        <t-form-item label="用户名" name="userName">
          <t-input
            clearable
            v-model="formData.userName"
            placeholder="请输入用户名"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="邮箱" name="email">
          <t-input clearable v-model="formData.email" placeholder="请输入邮箱">
          </t-input>
        </t-form-item>
        <t-form-item label="密码" name="password">
          <t-input
            clearable
            v-model="formData.password"
            placeholder="请输入密码"
          >
          </t-input>
        </t-form-item>
        <t-form-item label="头像" name="avatar">
          <t-upload
            :action="uploadAction"
            v-model="formData.avatar"
            theme="image"
            tips="请选择单张图片文件上传"
            accept="image/*"
            autoUpload
            @success="uploadSuccess"
            @fail="uploadFail"
          >
          </t-upload>
        </t-form-item>
        <t-form-item label="角色" name="role">
          <t-select v-model="formData.role" placeholder="请选择角色" multiple>
            <t-option
              v-for="item in roleList"
              :value="item._id"
              :label="item.roleName"
              :key="item._id"
            ></t-option>
          </t-select>
        </t-form-item>
      </t-form>
    </t-dialog>
  </div>
</template>

<script>
import fileApi from "@/api/file.js";
import roleApi from "@/api/role.js";
import userApi from "@/api/user.js";

export default {
  name: "UserEditDialog",
  data() {
    return {
      uploadAction: fileApi.fileUrl,
      visible: false,
      file: [],
      formData: {
        _id: "",
        userName: "",
        email: "",
        password: "",
        avatar: [],
        role: [],
      },
      roleList: [],
      confirmBtn: {
        content: "确认",
        theme: "primary",
        loading: false,
      },
      rules: {
        userName: [{ required: true, message: "请输入", type: "warning" }],
        email: [{ required: true, message: "请输入", type: "warning" }],
        password: [{ required: true, message: "请输入", type: "warning" }],
        avatar: [{ required: true, message: "请选择", type: "warning" }],
        role: [{ required: true, message: "请选择", type: "warning" }],
      },
    };
  },
  computed: {
    formatImgResponse() {
      return this.formData.avatar;
    },
  },
  watch: {
    "formData._id": {
      handler(newValue) {
        if (newValue) {
          this.findById();
        }
      },
      immediate: true,
    },
    visible: {
      handler(newValue) {
        if (newValue) {
          this.fetchData();
        }
      },
      immediate: true,
    },
  },
  methods: {
    fetchData() {
      const params = {
        isAll: true,
      };
      roleApi.list(params).then((res) => {
        this.roleList = res.data.roleList;
      });
    },
    uploadSuccess(e) {
      this.formData.avatar = [
        {
          url: "http://localhost:7001" + e.response.res.fileUrl,
        },
      ];
    },
    uploadFail() {
      this.$message.wanring("上传失败");
    },
    findById() {
      userApi.findById({ userId: this.formData._id }).then((res) => {
        this.formData.email = res.data.user.email;
        this.formData.userName = res.data.user.userName;
        this.formData.avatar = [{ url: res.data.user.avatar }];
        this.formData.role = res.data.user.role;
      });
    },
    close() {
      this.formData = {
        _id: "",
        userName: "",
        email: "",
        password: "",
        avatar: [],
        role: [],
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
          this.confirmBtn.content = "保存中...";
          const funName = this.formData._id ? "update" : "create";
          this.formData.avatar = this.formData.avatar[0].url;
          !this.formData._id && delete this.formData._id;
          userApi[funName](this.formData)
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
