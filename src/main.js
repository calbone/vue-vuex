import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/ja';
import App from './App.vue';
import store from './store';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);
Vue.use(ElementUI, {locale});


Vue.config.productionTip = false;

const router = new VueRouter(routes);

new Vue({
  render: h => h(App),
  // components: { App },
  store,
  router,
}).$mount('#app');
