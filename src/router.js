import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import index from './components/index.vue'
import login from './components/login.vue'
import users from './components/users.vue'
import roles from './components/roles.vue'
import rights from './components/rights.vue'
import goods from './components/goods.vue'
import categories from './components/categories.vue'
import orders from './components/orders.vue'
import params from './components/params.vue'
import reports from './components/reports.vue'
let routes = [{
    path:"/login",
    component:login,
    meta:{noLogin:true}
},
{
    path:"/",
    component:index,
    children:[{
        path: 'users',
        component:users
    },{
        path: 'rights',
        component:rights
    },{
        path: 'roles',
        component:roles
    },{
        path: 'goods',
        component:goods
    },{
        path: 'categories',
        component:categories
    },{
        path: 'orders',
        component:orders
    },{
        path: 'params',
        component:params
    },{
        path: 'reports',
        component:reports
    }]
}
];
let router = new VueRouter({
    routes
});
router.beforeEach((to, from, next) => {
   if(to.meta.noLogin==true){
       next();
   }else{
       if(window.sessionStorage.getItem('token')){
           next()
       }else{
           Vue.prototype.$message.error('请重新登录2');
           next('/login');
       }
   }
  })
export default router;