<template>
    <el-container class="mainContainer">
      <el-aside width="220px">
         <leftMenu></leftMenu>
      </el-aside>
      <el-main class="rightContainer">
          <el-container class="rightHeader">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/user">活动管理</a></el-breadcrumb-item>
              <el-breadcrumb-item>删除</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
               <el-button type="warning" round>添加用户</el-button>
              <el-button type="warning" round>修改按钮</el-button>
              <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-container>
          <el-container class="rightContent">
              <router-view name="rightMain"/>
          </el-container>
      </el-main>
    </el-container>
</template>
<script>
import leftMenu from "../assembly/leftMenu.vue"
export default{
    name:'userInfo',
	  data() {
      return {
        fileList:[]
      }
    },
    methods:{
    },
    components:{
      leftMenu:leftMenu
    },
    computed:{
        userInfo(){  
          return this.$store.state.userObj.userInfo;
        },
        breadcrumb(){
          return this.$store.getters.getBreadcrumb;
        }
		}
}
</script>
<style>
.mainContainer{
  background: rgb(237, 241, 240);
}
.rightContainer{
  
  padding:0;
}
.rightHeader{
  height:30px;
  padding:10px 20px;
}
.rightContent{
  background: rgba(248, 250, 249,0.98);
  min-height: 80vh;
  width:98%;
  margin-left:1%;
}
.el-aside{
  background:#545c64;
  min-height: 90vh;
}
</style>