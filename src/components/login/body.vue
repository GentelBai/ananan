<template>
    <el-main class="el-main-panel">
      <el-row>
          <el-col :span="12" :offset="6">
                  <el-form :model="loginData" :rules="rule" ref="loginForm" class="loginPanel" label-width="80px">
                      <el-form-item label="用户名" prop="loginname">
                        <el-input v-model="loginData.loginname" placeholder="用户名" clearable prefix-icon="iconfont el-icon-user-solid"></el-input>
                      </el-form-item>
                      <el-form-item label="密码" prop="password">
                        <el-input v-model="loginData.password" placeholder="密码" clearable prefix-icon="iconfont el-icon-unlock"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onLogin">登<span class="noVisible">占占</span>录</el-button>
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
            {min:3,max:10,message:"2至10个字符",trigger:'blur'}
          ],
          password:[
            {required:true,message:"请输密码",trigger:'blur'},
            {min:6,max:10,message:"6至10个字符",trigger:'blur'}
          ]
        }
      }
    },
    methods:{
       onLogin:function(){
          var _this = this;
          this.$refs.loginForm.validate(async valid =>{
            if(!valid) return;
            var formData = new FormData();
            this.$http({
                url: 'login/login',
                method:"post",
                data:{
                    "userInfo":this.loginData
                }
            }).then(res =>{
                    if(res.data && res.data.rtBody && res.data.rtBody.PCE_RETCODE== "0000000"){
                      console.log(JSON.stringify(res.data.rtBody));
                      localStorage.setItem("x-auth-token",res.data.rtBody.token);
                       var userInfo = res.data.rtBody.userInfo;
                       var userObj = {};
                       userObj.menus = userInfo.menus;
                       userInfo.menus="";
                       userObj.roles = userInfo.roles;
                       userInfo.roles="";
                       userObj.userInfo = userInfo;
                        _this.$store.commit("setUserObj",userObj);
                        userInfo = null;
                        _this.$router.push({name:"index",query:{alert:"11"}})
                    }else{
                      //http通信成功 验证不通过 处理实现
                      console.log(JSON.stringify(res));
                    }
                }).catch(res=>{
                   //http通信问题 处理实现
                  console.log("login catch")
                   _this.$router.push({name:"index",query:{alert:"11"}})
                })
          })
       }
    }
}
</script>
<style>
.el-main-panel{
    height:510px;
    background-image: url("../../assets/diqiu.jpg");
    background-size:100% 100%;
}
  .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
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
      background:#ebedf7;
      margin-top:100px;
      padding-top:30px;
      height:250px;
      padding:50px;
  }
  .demo-input-suffix{
    margin-bottom: 30px;
}
  .demo-input-suffix .el-input {
    width: 350px;
}
span.noVisible{
    visibility:hidden;
}
</style>