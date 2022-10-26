<template>
  <div class="login">
    <div class="login-title">CYQ admin</div>
    <div class="login-form">
      <t-space style="width: 350px">
        <t-form
          :data="formData"
          :rules="rules"
          ref="form"
          @reset="onReset"
          @submit="onSubmit"
          :colon="true"
          :labelWidth="0"
        >
          <t-form-item name="username">
            <t-input
              clearable
              v-model="formData.username"
              placeholder="请输入账户名"
              size="large"
            >
              <desktop-icon slot="prefix-icon"></desktop-icon>
            </t-input>
          </t-form-item>
          <t-form-item name="password">
            <t-input
              type="password"
              clearable
              v-model="formData.password"
              placeholder="请输入密码"
              size="large"
            >
              <lock-on-icon slot="prefix-icon"></lock-on-icon>
            </t-input>
          </t-form-item>
          <t-form-item>
            <t-button theme="primary" type="submit" :loading="loading" block
              >登录</t-button
            >
          </t-form-item>
        </t-form>
      </t-space>
    </div>
  </div>
</template>

<script>
import { DesktopIcon, LockOnIcon } from "tdesign-icons-vue";

export default {
  name: "Login",
  components: {
    DesktopIcon,
    LockOnIcon,
  },
  data() {
    return {
      formData: {
        username: "admin",
        password: "admin",
      },
      loading: false,
      rules: {
        username: [
          { required: true, message: "请输入用户名", type: "warning" },
          { min: 4, message: "最少四个字符", type: "warning" },
        ],
        password: [
          { required: true, message: "请输入密码", type: "warning" },
          { min: 5, message: "最少五个字符", type: "warning" },
        ],
      },
    };
  },
  mounted() {
    this.$refs.form.validate();
  },

  methods: {
    // ...mapActions(['user']);
    onReset() {
      this.$message.success("重置成功");
    },
    onSubmit({ validateResult, firstError }) {
      this.loading = true;
      if (validateResult === true) {
        this.$store
          .dispatch("login", this.formData)
          .then(async () => {
            await this.$store.dispatch("user/fetchCurrentUserInfo");
            await this.$router.push({
              path: this.$route.query.redirect || "/",
            });
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.$message.warning(firstError);
        this.loading = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/images/login/bg.png");
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .login-title {
    padding-bottom: 50px;
    color: #fff;
    font-size: 26px;
  }
}
</style>
