<template>
  <el-container class="index-container">
    <el-header class="my-header">
      <el-row style="height:60px">
        <el-col :span="4">
          <img src="../assets/logo.png" alt>
        </el-col>
        <el-col :span="18">
          <h2>后台管理系统</h2>
        </el-col>
        <el-col :span="2">
          <el-button type="success" @click="loginout">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my-container">
      <el-aside width="200px" class="left">
        <el-menu default-active="users" class="el-menu-vertical-demo" router >
          <el-submenu :index="item.id+''" v-for="item in menuList">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
              <el-menu-item :index="it.path" v-for="it in item.children">
                <span class="el-icon-menu"></span>{{it.authName}}
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="right"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      menuList:[]
    }
  },
  methods: {
    loginout(){
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  // beforeCreate() {
  //   if(window.sessionStorage.getItem('token')){
  //   }else{
  //     this.$message.error('请先登录')   
  //     this.$router.push('/login')
  //   }
  // },
  async created() {
      let res = await this.$axios.get('menus');
      //console.log(res);
      this.menuList = res.data.data;
  },
};
</script>

<style lang="scss">
.index-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .my-header {
    height: 60px;
    line-height: 60px;
    background: #b3c0d1;
    h2 {
      margin: 0;
      padding: 0;
      text-align: center;
    }
  }
  .my-container {
    flex: 1;
    .left {
    }
    .right {
        background: #e9eef3;
        padding-top:0;
    }
  }
}
</style>
