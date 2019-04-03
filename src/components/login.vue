<template>
  <div class="login">
    <div class="box">
      <el-form
        label-position="top"
        label-width="80px"
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="my-btn" @click="submit('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$axios.post('login',this.loginForm);
        // console.log(res)
          if(res.data.meta.status ===400){
            this.$message.error(res.data.meta.msg);
          }else if(res.data.meta.status ===200){
            this.$message.success(res.data.meta.msg);
            window.sessionStorage.setItem('token',res.data.data.token);
            this.$router.push('/')
          }
        } else {
          this.$message.error("数据格式错误,请重新填写");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #324152;
  .box {
    width: 550px;
    height: 420px;
    padding: 35px;
    border-radius: 10px;
    box-sizing: border-box;
    background: #fff;
    .my-btn {
      width: 100%;
    }
  }
}
</style>
