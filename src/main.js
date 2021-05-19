import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueCookie from 'vue-cookie'
import axios from'axios'
import qs from 'qs'
import VueLazyload from "vue-lazyload";
import echarts from 'echarts'

Vue.config.productionTip = false;
Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:8090/',
  // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

Vue.use(VueCookie);
Vue.prototype.$echarts = echarts
Vue.use(VueLazyload, {
  loading: '/imgs/loading-svg/loading-bars.svg'
});

router.beforeEach((to, from, next)=> {
  let isLogin = localStorage.getItem("isLogin");
  isLogin = Boolean(Number(isLogin));

  if(to.meta.requireAuth) {
    if(isLogin){
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

