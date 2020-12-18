<template>
    <el-menu 
        :default-active="this.$route.path" 
        class="el-menu-demo"
        router
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
        :unique-opened="true"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <!--<el-menu-item index="1">菜单栏</el-menu-item>-->
        <!--<el-submenu index="1">
            <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">用户管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="1-1" @click="goto('/index/addUser')">
                    <template>
                        <i class="el-icon-tools"></i>
                        <span>用户列表</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="1-2" @click="goto('/index/listUser')">
                    <template>
                        <i class="el-icon-tools"></i>
                        <span>信息修改</span>
                    </template>
                </el-menu-item>
                <el-menu-item index="1-3" @click="goto('/index/userPermission')">
                    <template>
                        <i class="el-icon-tools"></i>
                        <span>权限设置</span>
                    </template>
                </el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-s-data"></i>
                <span slot="title">数据管理</span>
            </template>
            <el-menu-item index="2-1" @click="goto('/index/dataCreate')">
                <template>
                    <i class="el-icon-tools"></i>
                    <span>数据创建</span>
                </template>
            </el-menu-item>
            <el-menu-item index="2-2" @click="goto('/index/dataShow')">
                <template>
                    <i class="el-icon-tools"></i>
                    <span>数据预览</span>
                </template>
            </el-menu-item>
        </el-submenu>-->
        <template v-for="(item,index) in menuList">
            <el-submenu
                v-if="item.children && item.children.length"
                :index="index+''"
                :key="index+''"
            >
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.name}}</span>
                </template>
                <template v-for="(item2,index2) in item.children">
                    <el-submenu
                    v-if="item2.children && item2.children.length"
                    :index="index+'-'+index2+''"
                    :key="index2+''"
                    >
                    <template slot="title">
                        <i :class="item2.icon"></i>
                        <span>{{item2.name}}</span>
                    </template>
                        <el-menu-item
                        v-for="(item3,index3) in item2.children"
                        :index="item3.url"
                        :key="index3+''"
                        >
                            <i :class="item3.icon"></i>
                            <span>{{item3.name}}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
            </el-submenu>
        </template>

    </el-menu>
</template>
<script>
import menuList from "../../router/menuTest.js";
export default{
	data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        menuList:menuList
      }
    },
    created(){
       //console.log("created menuList :" +JSON.stringify(this.menuList) )
    },
    mounted(){
        //console.log("menuList :" +JSON.stringify(this.menuList) )
    },
    methods: {
      handleSelect(key, keyPath) {
          //console.log(key, keyPath);
      },
      handleOpen(){
          //console.log(key, keyPath);
      },
      handleClose(){
          //console.log(key, keyPath);
      },
      goto(path){
            //this.$router.replace(path);
           this.$router.push(path);
      }
    }
}
</script>
<style>
.el-submenu__title{
    padding:0 50px;
}
</style>