import Vue from 'vue'
import Router from 'vue-router'  
import userRegBody from '@/components/userReg/body.vue'
import userRegHeader from '@/components/userReg/header.vue'
import userRegFooter from '@/components/userReg/footer.vue'
import loginHeader from '@/components/login/header.vue'
import loginBody from '@/components/login/body.vue'
import loginFooter from '@/components/login/footer.vue'
import indexHeader from '@/components/index/header.vue'
import indexBody from '@/components/index/body.vue'
import indexFooter from '@/components/index/footer.vue'
// import addUser from '@/components/index/rightMain/addUser.vue'
import listUser from '@/components/index/rightMain/listUser.vue'
import userPermission from '@/components/index/rightMain/userPermission.vue'
import dataCreate from '@/components/index/dataManage/dataCreate.vue'
import err403 from '@/components/errPage/err403.vue'  
import global from '@/componentsJS/moduleJS/global.js'
import Rights from '@/components/power/Rights.vue'
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
      path: '/userReg',
      name: 'userReg',
      components: {
        mainHeader:userRegHeader,
        mainBody:userRegBody,
        mainFooter:userRegFooter
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
        { path:'user/list',name:'listUser',components:listUser},
        { path:'user/details',name:'detailsUser',components:listUser},
        // { path:'user/add',name:'addUser',components:{rightMain:addUser}},
        { path:'user/edit',name:'editUser',components:listUser},
        { path:'userPermission',name:'userPermission',components:userPermission},
        { path:'dataCreate',name:'dataCreate',components:dataCreate},
        { path:'dataShow',name:'dataShow',components:err403},
        { path:'rights',name:'rights',components:Rights},
      ]
    }
  ]
})

// router.beforeEach((to , from ,next) => {
//     if(to.name !== 'login' && !global.validateLogon()){
//       if(from.name !== 'login')
//         next({name: 'login'})
//         return;
//     } 
//     next();
// })
// router.beforeEach((to, from, next) => {
//   //路由中设置的needLogin字段就在to当中 
//   if(sessionStorage.getItem('token')){
//     //console.log(to.path) //每次跳转的路径
//     if(to.path === '/'){
//       //登录状态下 访问login.vue页面 会跳到index.vue
//       next({path: '/index'});
//     }
//     else{
//       next();
//     }
//   }
//   else{
//     // 如果没有session ,访问任何页面。都会进入到 登录页
//     if (to.path === '/') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
//       next();
//     } else { // 否则 跳转到登录页面
//       next({ path: '/' });
//     }
//   }

//   if (to.meta.title) {
//     document.title = to.meta.title  //设置页面的title
//   }

//   if(to.fullPath == "/"){
//     if(sessionStorage.getItem('data')){
//       next({
//         path:from.fullPath
//       });
//     }else {
//       next();
//     }
//   }
// })
export default router;
