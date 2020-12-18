import Vue from 'vue'
import Router from 'vue-router'  
import loginHeader from '@/components/login/header.vue'
import loginBody from '@/components/login/body.vue'
import loginFooter from '@/components/login/footer.vue'
import indexHeader from '@/components/index/header.vue'
import indexBody from '@/components/index/body.vue'
import indexFooter from '@/components/index/footer.vue'
import addUser from '@/components/index/rightMain/addUser.vue'
import listUser from '@/components/index/rightMain/listUser.vue'
import userPermission from '@/components/index/rightMain/userPermission.vue'
import dataCreate from '@/components/index/dataManage/dataCreate.vue'
import err403 from '@/components/errPage/err403.vue'  

import global from '@/componentsJS/moduleJS/global.js'
Vue.use(Router)

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location){
    return originalPush.call(this,location).catch(err=>err)
} 
const router = new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      components: {
        mainHeader:loginHeader,
        mainBody:loginBody,
        mainFooter:loginFooter
      }
    },
    {
      path: '/403',
      component:{
        mainHeader:loginHeader,
        mainBody:err403,
        mainFooter:loginFooter
      }
    },
    {
      path:'/index',
      name: 'index',
      components: {
        mainHeader:indexHeader,
        mainBody:indexBody,
        mainFooter:indexFooter
      },
      children: [
        { path:'user/list',name:'listUser',components:{rightMain:listUser}},
        { path:'user/details',name:'detailsUser',components:{rightMain:listUser}},
        { path:'user/add',name:'addUser',components:{rightMain:addUser}},
        { path:'user/edit',name:'editUser',components:{rightMain:listUser}},
        { path:'userPermission',name:'userPermission',components:{rightMain:userPermission}},
        { path:'dataCreate',name:'dataCreate',components:{rightMain:dataCreate}},
        { path:'dataShow',name:'dataShow',components:{rightMain:err403}}
      ]
    }
  ]
})

router.beforeEach((to , from ,next) => {
    if(to.name !== 'login' && !global.validateLogon()){
      if(from.name !== 'login')
        next({name: 'login'})
        return;
    } 
    next();
})
export default router;
