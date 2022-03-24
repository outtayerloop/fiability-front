import Vue from 'vue'
import router from '@/router'
import vuetify from '@/vuetify'
import App from './App.vue'
import VueI18n from 'vue-i18n';
import messages from './resources'
import store from './store/store';



Vue.config.productionTip = false
Vue.use(VueI18n);
Vue.use(require('vue-cookies'));

const i18n = new VueI18n({
  locale: 'fr', // set locale
  //fallbackLocale: 'en', // set fallback locale
  messages,
  //silentTranslationWarn: true
})

new Vue({
  router,
  vuetify,
  i18n,
  store,
  render: h => h(App),
}).$mount('#app')

//i18n.locale = 'fr'
