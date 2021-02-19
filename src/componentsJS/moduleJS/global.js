import store from '../../vuex/rootVuex.js'
const global = {
    validateLogon:function(){  
        //根据store中是存在用户信息确定是否已经登录的判断
        if(!store.state.userObj || !this.isEmptyObject(store.state.userObj.userInfo)) return false;
        return true;    
    },
    isEmptyObject:function(obj){
        if(!(obj instanceof Object)) return false;
        if(Object.keys(obj).length < 1) return false;
        return true;
    },
    filterRouter:function(router){
        /*var  _this = this;
        if(!router) return [];
        function _iter(before){
            const after = Object.assign({},before);
            if(after.url = "/index"){
                after.components = {
                    mainHeader:require('@/components/index/header.vue').default,
                    mainBody:require('@/components/index/body.vue').default,
                    mainFooter:require('@/components/index/footer.vue').default
                }
            }
            if(after.component)
                after.component = require('@/components' + after.component +'.vue').default;
            if(after.children && after.children.length){
                after.children = _this.filterRouter(after.children)
            }
            return after
        }
        return router.map(_iter);*/
    }
};

export default global;