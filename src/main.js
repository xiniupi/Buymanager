import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import "./assets/base.scss";
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import bread from './components/bread.vue'
Vue.component('my-bread',bread);
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
Vue.prototype.$axios = axios;
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
 // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token');
   console.log(config);
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  if([200,201,204].indexOf(response.data.meta.status)!=-1){
  Vue.prototype.$message.success(response.data.meta.msg)
}else{
  Vue.prototype.$message.warning(response.data.meta.msg)
}
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
