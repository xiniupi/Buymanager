<template>
  <div class="menu-container">
    <my-bread sectitle="权限管理1" threetitle="角色列表1"></my-bread>
    <el-row>
      <el-col :span="8">
        <el-button type="default" plain >成功按钮</el-button>
      </el-col>
    </el-row>

    <el-table  border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column  label="角色描述" width="180"></el-table-column>
      <el-table-column  label="角色操作" width="180"></el-table-column>
  
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            plain
            icon="el-icon-edit"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            icon="el-icon-delete"
            plain
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleRole(scope.row)"
            icon="el-icon-check"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script>
export default {
  name: "roles",
 

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
