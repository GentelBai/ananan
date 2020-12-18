import store from '../../vuex/rootVuex.js'
const global = {
    validateLogon:function(){  
        //根据store中是存在用户信息确定是否已经登录的判断
        //if(!store.state.userObj || !this.isEmptyObject(store.state.userObj.userInfo)) return false;
        return true;    
    },
    isEmptyObject:function(obj){
        if(!(obj instanceof Object)) return false;
        if(Object.keys(obj).length < 1) return false;
        return true;
    }
};

export default global;