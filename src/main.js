import Vue from 'vue'
import 'vant/lib/index.css';
import './assets/css/main.css'; //全局样式

import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store.js'
import Vant from 'vant';
import VueClipboard from 'vue-clipboard2' //复制粘贴复制插件
import { JSEncrypt } from 'jsencrypt'   //加密

import '@babel/polyfill';
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()

Vue.config.productionTip = false;
Vue.use(Vant);
Vue.use(VueClipboard)

Vue.prototype.routerBack = function () {
    router.back();
}
// axios.defaults.baseURL = 'http://api.haibiter.com';
axios.defaults.baseURL = 'https://api.zhongchuang58.com/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const token = localStorage.getItem('accessToken') || '';
axios.defaults.headers.token = token;
Vue.prototype.$http = axios;

// 判断是否存在token，如果存在的话，则每个http header都加上token
// let ajaxLoading = null;
// axios.interceptors.request.use(
//     config => {
//         if (localStorage.getItem('accessToken')) {
//             config.headers.token = localStorage.getItem('accessToken');
//         }
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     });

// 路由全局守卫
router.beforeEach((to, from, next) => {
    const isLogin = localStorage.getItem("accessToken") ? true : false;
    // 如果有token，或在其他不需要token的页面
    if(isLogin){
        next()
    }
    if (to.path === '/Login' || isLogin || to.path === '/Register' || to.path === '/Forget'  ) {
        next()
    } else {
        next("/Login")
    }
})


// 全局header公共组件
import AppBar from './components/AppBar'
Vue.component('app-bar', AppBar)
let vueInstance = new Vue({
    render: h => h(App),
    router,
    store,
    // i18n,
}).$mount('#app')


// 配置plus 环境
document.addEventListener('plusready', function () {
  // plus.navigator.setStatusBarBackground('#FFFFFF');
  plus.navigator.setStatusBarStyle('light');
  // 监听返回按键
  let now = false;
  let time = null;
  plus.key.addEventListener('backbutton', function () {
    let canQuit = {'/Home':true,'/Login':true, '/Apply':true,'/Personal':true}
    let pathUrl = vueInstance.$route.path;
    if(canQuit[pathUrl]) {
        time = null;
        if(now) {
          now = false;
          plus.runtime.quit();
        }else {
          now = true;
          plus.nativeUI.toast("再按一次退出应用", {duration: 'short' });
          time = setTimeout(() => {
            now = false;
          }, 1000);
        }
    }else {
      router.back();
    }
  })
})