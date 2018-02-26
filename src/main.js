// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAnalytics from 'vue-analytics'
import Tooltip from 'vue-directive-tooltip'

Vue.use(Tooltip)

Vue.use(VueAnalytics, {
  id: ['UA-111671127-1', 'XUA-70981149-1'],
  checkDuplicatedScript: true,
  autoTracking: {
    pageviewOnLoad: true,
    page: true
  },
  ready () {
    // here Google Analaytics is ready to track!
    // window.G.vm.$ga.page('/?tax2018')
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
