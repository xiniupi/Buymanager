<template>
  <div class="menu-container">
    <my-bread sectitle="权限管理1" threetitle="用户列表1"></my-bread>
    <el-row>
      <el-col :span="8">
        <el-button type="default" plain >成功按钮</el-button>
      </el-col>
    </el-row>

    <el-table  border style="width: 100%" :data="rightList">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.level==0">一级</span>
           <span v-else-if="scope.row.level==1">二级</span>
            <span v-else>三级</span>
        </template>
      </el-table-column>
  
      
    </el-table>
    
  </div>
</template>

<script>
export default {
  name: "rights",
  data() {
    return {
      rightList:[]
    }
  },
  async created() {
    let res = await this.$axios.get('rights/list');
    console.log(res);
    this.rightList = res.data.data
  },

}
</script>

<style lang="scss">
.menu-container {
  .menu-input {
    margin-right: 10px;
  }
  .menu-bread {
    height: 45px;
    line-height: 45px;
    padding-left: 10px;
  }
}
</style>
