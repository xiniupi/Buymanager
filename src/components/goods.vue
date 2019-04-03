<template>
  <div class="menu-container">
    <my-bread sectitle="商品管理1" threetitle="商品列表1"></my-bread>
    <el-row>
      <el-col :span="6" class="menu-input">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="success" plain>成功按钮</el-button>
      </el-col>
    </el-row>

    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="商品名称" width="180"></el-table-column>
      <el-table-column label="商品价格(元)" width="180"></el-table-column>
      <el-table-column label="商品重量"></el-table-column>
      <el-table-column label="创建时间" width="180"></el-table-column>

      <el-table-column label="操作">
        <!-- <template slot-scope="scope">
          <el-button size="mini" plain icon="el-icon-edit"></el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
        </template> -->
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[10, 15, 20, 25]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="200"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "goods",
  data() {
    return {
      goodsList:[]
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
