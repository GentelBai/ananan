import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{ 
      chartObj:{chartBgColor:"#1D84EE"},
      userObj:{}
    },
    getters:{
        getChartData(state){return state.chartObj}
    },
    mutations:{
      setUserObj(state,_data){
        state.userObj = _data;
      }
    }
})