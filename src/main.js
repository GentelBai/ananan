import Vue from 'vue'
import App from './App'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './vuex/rootVuex'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(ElementUI)
const baseUrl = "http://localhost:8004/";

axios.interceptors.request.use(config =>{
        let token = localStorage.getItem("x-auth-token");
        if(token){
            config.headers.token = token;
        }

        if(config.url.indexOf(baseUrl) === -1){
            config.url = baseUrl + config.url;
        }
        return config;
    }, err =>{
        return Promise.reject(err);
    }
)
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
