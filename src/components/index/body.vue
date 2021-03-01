<template>
    <el-container class="mainContainer">
      <el-aside width="220px">
         <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
       <el-menu-item index="2">
        <i class="el-icon-user"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
    </el-menu>
      </el-aside>
      <el-main class="rightContainer">
          <el-container class="rightHeader">
            <el-breadcrumb separator=">">
              <el-breadcrumb-item >首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-container>
           <el-container class="rightContent">
             <el-card>
                <el-row :gutter="20">
                   <el-col :span="7">
                      <el-input v-model="queryInfo.query" placeholder="请输入内容"  @clear="getUserList" clearable>
                      <el-button slot="append" icon="el-icon-search" @click="getUserlist"></el-button>
                    </el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                  </el-col>
                   
                </el-row>
                <el-table :data="userlist" stripe >
                  <el-table-column type="index">11 </el-table-column>
                  <el-table-column label= "英文名" prop = "English"></el-table-column>
                  <el-table-column label= "中文名" prop = "Chinese"></el-table-column>
                  <el-table-column label= "邮箱" prop = "Email"></el-table-column>
                  <el-table-column label= "部门" prop = "Department"></el-table-column>
                  <el-table-column label= "手机" prop = "Mobile"></el-table-column>
                  <el-table-column label= "操作"  width="200px">
                    <template>
                      <!-- 修改用户的按钮 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scoped.row.id)"></el-button>
                      <!-- 删除用户的按钮 -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scoped.row.id)"></el-button>
                      <!-- 上传用户的按钮 -->
                     <el-tooltip  effect="dark" content="上传" placement="top" :enterable="false">
                    <el-button type="primary">上传<i class="el-icon-upload el-icon--right"  size="mini"></i></el-button>
                    </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
                   <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[1, 2, 3, 4]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                  </el-pagination>
              </el-card>
              <!-- 添加用户的输入框 -->
              <el-dialog
                title="添加用户"
                :visible.sync="addDialogVisible"
                width="50%" @close ="addDialogClosed">
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="addDialogVisible= false">取 消</el-button>
                  <el-button type="primary" @click="addUser" >确 定</el-button>
                </span>
              </el-dialog>
            
               <!-- 修改用户的输入框 -->

              <el-dialog
                title="修改用户"
                :visible.sync="editDialogVisible"
                width="50%" @close="editDialogClosed">
                  <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px" >
                <el-form-item label="用户名" disabled>
                  <el-input v-model="editForm.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                  <el-input v-model="editForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="editDialogVisible= false">取 消</el-button>
                  <el-button type="primary" @click="EditUserInfo" >确 定</el-button>
                </span>
              </el-dialog>

          </el-container>
      </el-main>
    </el-container>
</template>
<script>
import leftMenu from "../assembly/leftMenu.vue"
export default{
    data() {
      //邮箱验证
      var checkEmail = (rule,value,cb) =>{
        const regEmail =/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          if(regEmail.test(value)){
            return cb()
          }
          cb (new Error("请输入正确的邮箱")) 
      }
      var checkMobile =(rule,value,cb) =>{
        const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]14[57])[0-9]{8}$/
        if(regMobile.test(value)){
          return cb()
        }
        cb(new Error("请输入正确的手机号"))
      }
      return {
        queryInfo:{
          query:'',
          pagenum:1,
          pagesize:2
        },
        userlist:[],
        total:0,
        addDialogVisible:false,
        addForm:{
          username:"",
          mobile:"",
          email:'',

        },
        addFormrules:{
        username:[{required:true,message:"请输入用户名",trigger:"blur"},
        {min:3,mix:10,message:'用户名的长度在3到10个字符之间',trigger:"blur"}
        ],
        mobile:[{required:true,message:"请输入手机号",trigger:"blur"},
        {min:6,mix:15,message:'手机号的长度在3到10个字符之间',trigger:"blur"},
        {validator:checkMobile,trigger:"blur"}
        ],
        email:[{required:true,message:"请输入邮箱",trigger:"blur"},
        {min:6,mix:12,message:'邮箱的长度在3到10个字符之间',trigger:"blur"},
        {validator:checkEmail,trigger:"blur"}
        ],
        },
        editDialogVisible:false,
        editForm:{
        username:"",
          mobile:"",
          email:'',

        },
         // 修改表单验证规则的对象 
        editFormRules:{
           mobile:[{required:true,message:"请输入手机号",trigger:"blur"},
            {min:6,mix:15,message:'手机号的长度在3到10个字符之间',trigger:"blur"},
            {validator:checkMobile,trigger:"blur"}
            ],
            email:[{required:true,message:"请输入邮箱",trigger:"blur"},
            {min:6,mix:12,message:'邮箱的长度在3到10个字符之间',trigger:"blur"},
            {validator:checkEmail,trigger:"blur"}
            ],

        }
      }
    },
     created(){
      this.getUserList()
    },
    methods:{ 
      logout(){
        window.sessionStorage.clear();
        this.$router.push("/login");
      },
     async getUserList(){
      const {data: res} = this.$http.post('users',{params:this.queryInfo})
      if(res.meta.status !== 200){
        return this.$message.error("获取用户列表失败!")
      }
      this.userlist = res.data.users
      this.total = res.total
      },
      
      handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize;
      this.getUserList();
      },
      handleCurrentChange(newPage){
        // console.log(newPage);
        this.queryInfo.newPage = newPage;
        this.getUserList();
      },
      addDialogClosed(){
        this.$refs.addFormRef.resetFields()
      },
      //验证添加用户的表单
      addUser(){
          this.$refs.addFormRef.validate(async valid =>{
            if(!valid)return 
           const {data: res} = this.$http.post("users",this.addForm)
          //  if(res.meta.status !==200){
          //    this.$message.error("添加用户失败");
          //  }
            console.log(valid);
          // this.$message.success("添加用户成功")
          // this.addDialogVisible = false;
          // this.getUserList();
          })
      },
     async showEditDialog(id){
        // console.log(id)
       const {data :res} = this.$$http.post('users/'+id);
       if(res.meta.status !==200){    
         return this.$message.error("查询用户信息失败 ")
       }
       this.editForm = res.data
        this.editDialogVisible = true;
      },
      // 监听用户修改对话框的重置
      editDialogClosed(){
        this.$refs.editFormRef.resetFields()
      },
      EditUserInfo(){
        this.$refs.editFormRef.validate(async valid =>{
          // console.log(valid);
          if(!valid) return
          const {data:res} =await this.$http.post("users/" + 
          this.editForm.id,
          {email:this.editForm.email},
          {mobile:this.editForm.mobile})
          if(res.meta.status !==200){
            this.$message.error("更新用户失败");
          }
          console.log(valid);
          this.editDialogVisible = false;
          this.getUserList();
           this.$message.success("更新用户成功");
        })
      },
      async removeUserById(id){
       const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err =>err)
          //如果用户确认删除，则返回值位字符串 confirm
          //如果用户取消删除，则返回值位字符串cancel
          if(confirmResult !=='confirm'){
              return this.$message.info("已取消删除")
          }
            const {data:res} =await this.$http.delete('users/' + id)
            if(res.meta.status !=200){
             return this.$message.error("删除用户失败");
            }
            this.$http.message.success("删除用户成功");
            this.getUserList();
      }
    },
    
    computed:{
        userInfo(){  
          return this.$store.state.userObj.userInfo;
        },
        breadcrumb(){
          return this.$store.getters.getBreadcrumb;
        }
		},
    // async getMenuList(){
    // const {data: res}= await this.$http.get("menus")
    // console.log(res);
    // if(res.meta.status !==200) return this.$message.error("获取失败");
    // this.menuist = res.data
    // }  
}
</script>
<style scoped>
 .mainContainer{

  background: rgb(237, 241, 240);
}
.el-aside{
  background:#545c64;
  min-height: 90vh;
}
.el-breadcrumb{
  font-size: 12px;
   margin-bottom: 15px;
}
.el-card{
  box-shadow: 0 1px 1px rgba(0, 0,0, 0.15)!important;
  min-height:90vh;
  width:100%;
}
.el-table{
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination{
  margin-top: 15px;
}
</style>