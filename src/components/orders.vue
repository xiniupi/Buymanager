<template>
  <div class="menu-container">
    <my-bread sectitle="订单管理1" threetitle="订单列表1"></my-bread>
    <el-table :data="ordersList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="70"></el-table-column>
      <el-table-column label="是否付款" width="70">
        <template slot-scope="scope">
          <el-tag type="danger" plain v-if="scope.row.order_pay==0">未付款</el-tag>
          <el-tag type="success" plain v-else>已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="180"></el-table-column>
      <el-table-column label="下单时间" width="180">
        <template slot-scope="scope">{{scope.row.create_time | formTime('YYYY-MM-DD hh:mm:ss')}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain icon="el-icon-edit" type="primary" @click="dialogFormVisible = true"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[10, 15, 20, 25]"
      :page-size="sendData.pagesize"
      :current-page="sendData.pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>
    <!-- 弹出框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="省市区/县" label-width="100px">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions2"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import options from "../city_data2017_element.js";
export default {
  name: "orders",
  data() {
    return {
      ordersList: [],
      sendData: {
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      dialogFormVisible: false,
      selectedOptions2: [],
      options
    };
  },
  methods: {
    async get() {
      let res = await this.$axios.get("orders", {
        params: this.sendData
      });
     // console.log(res);
      this.ordersList = res.data.data.goods;
      this.total = res.data.data.total;
    },
    sizeChange(val) {
      this.sendData.pagesize = val;
      this.get();
    },
    currentChange(val) {
      this.sendData.pagenum = val;
      this.get();
    },
    handleChange(){

    }
  },
  created() {
    this.get();
  }
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
