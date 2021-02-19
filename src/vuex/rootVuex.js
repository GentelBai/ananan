import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{ 
      chartObj:{chartBgColor:"#1D84EE"},
      userObj:{},
      breadcrumb:[]
    },
    getters:{
        getChartData(state){return state.chartObj}
    },
    mutations:{
      setUserObj(state,_data){
        state.userObj = _data;
      },
      setBreadcrumb(state,_data){
        state.breadcrumb = _data;
      }
    },
    getters:{
      getMenus(state){
        return state.userObj && state.userObj.menus;
      },
      getBreadcrumb(state){
        return state.breadcrumb;
      }
    }
})