<template>
  <el-header>
    <div>
      <img src="../../assets/logo1.png" alt="logo">
     
      <!-- <span>信息后台管理</span> -->
   </div>
    <el-breadcrumb separator="/">
    <el-button type="warning" round  >退出</el-button>
     
    </el-breadcrumb>
  </el-header>
</template>
<script>
export default{
	data() {
      return {
        menulist:[]
      }
    },
    methods:{
       
    }
}
</script>
<style scoped>
 .el-header{
   display: flex;
   justify-content: space-between;
  align-items: center;
  color: black;
  font-size: 20px;
 }
  div {
  display: flex;
  align-items: center;
  }

  span{
    margin-left: 15px;;
   
 }
</style>