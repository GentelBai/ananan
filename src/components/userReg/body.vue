<template>
    <el-main class="el-main-panel">
       <div class="demo-image">
        <img src="../../assets/logo.png" alt="logo">
      </div>
      <el-row>
          <el-col :span="12" :offset="6">
                  <el-form :model="userRegData" :rules="rule" ref="userRegForm" class="userRegPanel" label-width="80px">
                      <el-form-item label="用户名" prop="userRegname">
                        <el-input v-model="userRegData.userRegname" placeholder="用户名" clearable  prefix-icon="iconfont el-icon-user-solid"></el-input>
                      </el-form-item>
                      <el-form-item  label="密 码" prop="password" >
                        <el-input v-model="userRegData.password" placeholder="密码" clearable prefix-icon="iconfont el-icon-unlock"></el-input>
                      </el-form-item>
                      <el-form-item class="one">
                        <el-button type="primary" @click="userReg" >注 册</el-button>
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
        userRegData:{
          userRegname: '',
          password: ''
        },
        rule:{
          userRegname:[
            {required:true,message:"请输入用户名",trigger:'blur'},
            {min:1,max:20,message:"2至10个字符",trigger:'blur'}
          ],
          password:[
            {required:true,message:"请输密码",trigger:'blur'},
            {min:1,max:20,message:"6至10个字符",trigger:'blur'}
          ]
        }
      }
    },
    methods:{
       userReg:function(){
          this.$refs.userRegForm.validate(async valid =>{
            if(!valid) return;
            const {data: res} = await this.$http.post("userReg,this.userReg");
            if(res.meta.staus !=200)return this.$message.error("注册失败");
            this.$message.success("注册成功");
            window.sessionStorage.getItem("token",res.data.token);
            this.$router.push("/login");
            })
          
       }
    } 
}
</script>
<style>
  .el-col {
    border-radius: 81px;
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
  .demo-input-suffix .el-input {
    width: 350px;
}
span.noVisible{
    visibility:hidden;
}
.one{
  text-align: center;
}
</style>