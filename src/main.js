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
import myaxios from './myaxios.js';
Vue.use(myaxios);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
