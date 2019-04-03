<template>
  <div class="menu-container">
    <my-bread sectitle="商品管理1" threetitle="商品分类1"></my-bread>
    <el-row>
   
      <el-col :span="8">
        <el-button type="success" plain >添加分类</el-button>
      </el-col>
    </el-row>

    <el-table :data="categoryList" border style="width: 100%">
      <el-table-column label="大家电" width="180"></el-table-column>
      <el-table-column label="级别" width="180"></el-table-column>
      <el-table-column label="是否有效"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
           
            plain
            icon="el-icon-edit"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
         
            icon="el-icon-delete"
            plain
          ></el-button>
      
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[10, 15, 20, 25]"
      :page-size=10
      layout="total, sizes, prev, pager, next, jumper"
      :total=200
     
    ></el-pagination>
 
  </div>
</template>

<script>
export default {
  name: "categories",
  data() {
    return {
      categoryList:[]
    }
  },


};
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
