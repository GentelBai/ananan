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
import menuList from "../../router/menuTest"
export default{
	data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
        //menuList:menuList
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
          var _this = this;
          var breadcrumb = [];
          if(keyPath && keyPath.length == 3){
              var str = keyPath[2];
              var crumbArr = str.substring(str.lastIndexOf("#")+1).split("-");
              crumbArr.map(function(val ,index,arr){
                  if(index == 0) breadcrumb.push(_this.menuList[index].name);
                  if(index == 1) 
                  breadcrumb.push(_this.menuList[arr[0]]['children'][arr[2]].name);
                  if(index == 2)
                  breadcrumb.push(_this.menuList[arr[0]]['children'][arr[1]]['children'][arr[2]].name);
              })
          }
          _this.$store.commit("setBreadcrumb",breadcrumb);
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
    },
    computed:{
        menuList(){
            return this.$store.getters.getMenus;
        }
    }
}
</script>
<style>
.el-submenu__title{
    padding:0 50px;
}
</style>