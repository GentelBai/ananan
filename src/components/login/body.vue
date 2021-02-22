<template>
    <el-main class="el-main-panel">
       <div class="demo-image">
        <img src="../../assets/logo.png" alt="logo">
      </div>
      <el-row>
          <el-col :span="12" :offset="6">
                  <el-form :model="loginData" :rules="rule" ref="loginForm" class="loginPanel" label-width="80px">
                      <el-form-item label="用户名" prop="loginname">
                        <el-input v-model="loginData.loginname" placeholder="用户名" clearable  prefix-icon="iconfont el-icon-user-solid"></el-input>
                      </el-form-item>
                      <el-form-item  prop="password">
                      <label slot="label">密&nbsp;&nbsp;&nbsp;码</label>
                        <el-input v-model="loginData.password" placeholder="密码" clearable prefix-icon="iconfont el-icon-unlock" show-password></el-input>
                      </el-form-item>
                      <el-form-item class="one">
                       <el-button type="success" class="Userlogin"  @click="userLogin">登 录</el-button>
                      </el-form-item>
                  </el-form>
          </el-col>
      </el-row>
    </el-main>
</template>
<script>
export default{
	data() {
      return {
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        loginData:{
          loginname: '',
          password: ''
        },
        rule:{
          loginname:[
            {required:true,message:"请输入用户名",trigger:'blur'},
            {min:3,max:20,message:"2至10个字符",trigger:'blur'}
          ],
          password:[
            {required:true,message:"请输密码",trigger:'blur'},
            {min:3,max:20,message:"6至10个字符",trigger:'blur'}
          ]
        }
      }
    },
    methods :{
      userLogin(){
        this.$refs.loginForm.validate(async valid=>{
         if(!valid) return;
        const {data: res}= await this.$http.post("login",this.loginData);
        // console.log(result);
        // if(res.meta.staus !==200)return this.$message.error("登录失败！");
        // this.$message.success("登录成功!");
        window.sessionStorage.getItem("token",res.data.token);
        this.$router.push("/index");
        });
      }
    }
   
}
</script>
<style>
  .el-col {
    border-radius: 81px;
    width: 600px;
     border: 1px solid #e9e9e9;
  }
  /* .bg-purple-dark {
    background: #99a9bf;
  } */
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .loginPanel{
      /* background:#ebedf7; */
      margin-top:100px;
      padding-top:30px;
      height:250px;
      padding:50px;
  }
  .demo-input-suffix{
    margin-bottom: 30px;
}
  /* .demo-input-suffix .el-input {
    width: 350px;
} */
span.noVisible{
    visibility:hidden;
}
.one{
  text-align: center;
}
.Userlogin{
  
  width: 420px;
  border-radius: 20px;
}
</style>