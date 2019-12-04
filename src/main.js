import Vue from 'vue'
import App from './App.vue';
import router from './router';
import qs from 'qs';
Vue.prototype.$qs = qs;
import axios from 'axios';
Vue.prototype.$axios = axios;
Vue.prototype.$url = 'http://www.peihuayuren.com:8080/YQApp/yqws/';   //线上

// Vue.prototype.$url = 'http://47.105.67.124:7080/YQApp/yqws/';   //测试环境
// Vue.prototype.$url = 'http://192.168.1.188:8090/YQApp/yqws/';      //本地开发
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import './assets/icons/iconfont.css'
import 'lib-flexible'
import 'swiper/dist/css/swiper.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
Vue.directive('enterNumber2', {
  inserted: function (el) {
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
      let re = /\d/;
      if(charcode == 46){
        if(el.value.includes('.')){
          e.preventDefault();
        }
        return;
      }else if(!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey){
        if(e.preventDefault){
          e.preventDefault();
        }else{
            e.returnValue = false;
        }
      }
    });
  }
});
Vue.directive('number',{
      inserted(el,binding,vnode){
        el.oninput= function(e){
            let value = e.target.value;
            if(isNaN(value)){
                vnode.context.num = e.target.value = '';
                return;
            }
        }
      }
   })
Vue.use(Mint);
Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
