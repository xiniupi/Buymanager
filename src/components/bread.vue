<template>
      <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="background:#d3dce6"
      class="menu-bread"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >{{sectitle}}</el-breadcrumb-item>
      <el-breadcrumb-item >{{threetitle}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    props:['sectitle','threetitle']
}
</script>

<style>
 .menu-bread {
    height: 45px;
    line-height: 45px;
    padding-left: 10px;
  }
</style>
