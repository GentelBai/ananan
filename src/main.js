import Vue from 'vue'
import App from './App'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './vuex/rootVuex'
import axios from 'axios'
// import { config } from 'shelljs'

Vue.config.productionTip = false
Vue.use(ElementUI)

// if (process.env.NODE_ENV !== 'production') require('./mock/index')

// axios.interceptors.request.use(   //设置header，添加token
//   config => {
//     if (sessionStorage.getItem('token')) {
//       config.headers.Authorization = sessionStorage.getItem('token');
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });
//const baseUrl = "http://localhost:9527/platform/";
// const baseUrl = "http://localhost:8004/";
// axios.interceptors.request.use(config =>{
//         let token = localStorage.getItem("x-auth-token");
//         if(token){
//             config.headers.token = token;
//         }

//         if(config.url.indexOf(baseUrl) === -1){
//             config.url = baseUrl + config.url;
//         }
//         return config;
//     }, err =>{
//         return Promise.reject(err);
//     }
// )
axios.defaults.baseURL ="http://localhost:8004/";
axios.interceptors.request.use(config =>{
    console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
})
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
