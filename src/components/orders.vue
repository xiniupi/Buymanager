<template>
  <div class="menu-container">
    <my-bread sectitle="订单管理1" threetitle="订单列表1"></my-bread>
    <el-table :data="ordersList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="email" label="订单价格" width="70"></el-table-column>
      <el-table-column prop="mobile" label="是否付款" width="70">
        <template slot-scope="scope">
          <span type="danger" plain>未付款</span>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="是否发货" width="180"></el-table-column>
      <el-table-column prop="email" label="下单时间" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain icon="el-icon-edit"></el-button>
        </template>
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
  name: "users",
 data() {
   return {
     ordersList:[]
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
