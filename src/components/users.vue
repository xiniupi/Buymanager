<template>
  <div class="menu-container">
    <my-bread sectitle="用户管理1" threetitle="用户列表1"></my-bread>
    <el-row>
      <el-col :span="6" class="menu-input">
        <el-input
          placeholder="请输入内容"
          class="input-with-select"
          v-model="sendData.query"
          @keyup.enter.native="search"
        >
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="success" plain @click="addFormVisible = true">成功按钮</el-button>
      </el-col>
    </el-row>

    <el-table :data="userList" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="stateChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
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
    <el-pagination
      :page-sizes="[10, 15, 20, 25]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
        @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分类管理" :visible.sync="roleFormVisible">
      <el-form ref="editForm">
        <el-form-item label="用户名" label-width="80px" prop="username">{{editUser.username}}</el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-select v-model="editUser.role_name" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRole('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      total: 0,
      userList: [],
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      addFormVisible: false,
      editFormVisible: false,
      roleFormVisible: false,
      editUser: {},
      roleList: [],
      addForm: {
        username: "admin",
        password: "123456",
        email: "adsfad@qq.com",
        mobile: "12345678"
      },
      editForm: {
        username: "admin",

        email: "adsfad@qq.com",
        mobile: "12345678"
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
       handleEdit(index,row){
        this.$axios.get(`users/${row.id}`).then(res=>{
            this.editForm = res.data.data;
            if(res.data.meta.status === 200){
                this.editFormVisible = true;
            }
        })
    },
    async search() {
      let res = await this.$axios.get("users", {
        params: this.sendData
      });
      this.total = res.data.data.total;
      this.userList = res.data.data.users;
    },
    stateChange(row) {
      this.$axios.put(`users/${row.id}/state/${row.mg_state}`);
    },
    submitAdd(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$axios.post("users", this.addForm);
          if (res.data.meta.status === 201) {
            this.search();
          }
          this.addFormVisible = false;
        } else {
          this.$message.error("请填入正确的信息!");
          return false;
        }
      });
    },
    submitEdit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$axios.put(`users/${this.editForm.id}`, {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          });
          if (res.data.meta.status === 200) {
            this.search();
          }
          this.editFormVisible = false;
        } else {
          this.$message.error("请填入正确的信息!");
          return false;
        }
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$axios.delete(`users/${row.id}`);
          if (res.data.meta.status === 200) {
            this.search();
          }
        })
        .catch(() => {
          this.$message.success("已经取消");
        });
    },
    async handleRole(row) {
      this.roleFormVisible = true;
      this.editUser = row;
      let res = await this.$axios.get("roles");
      //console.log(res);
      this.roleList = res.data.data;
    },
    async submitRole(formName) {
      let res = await this.$axios.put(`users/${this.editUser.id}/role`,{
        rid:this.editUser.role_name
      })
      if(res.data.meta.status ===200){
        this.search();
         this.roleFormVisible = false;
      }
     
    },
        handleSizeChange(val) {
        this.sendData.pagesize = val;
      },
      handleCurrentChange(val) {
        this.sendData.pagenum = val;
      }
  },
  created() {
    this.search();
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
