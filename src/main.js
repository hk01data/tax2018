// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import VueAnalytics from 'vue-analytics'
import Tooltip from 'vue-directive-tooltip'
import VModal from 'vue-js-modal'

// Vue.use(VueAnalytics, {
//   id: ['UA-112679299-1', 'UA-70981149-1'],
//   checkDuplicatedScript: true,
//   autoTracking: {
//     pageviewOnLoad: false,
//     page: true
//   },
//   ready () {
//     // here Google Analaytics is ready to track!
//     // window.G.vm.$ga.page('/?tax2019_V2')
//   }
// })

Vue.use(Tooltip, {
  placement: 'bottom.end'
})
Vue.use(VModal)

// Vue Custom Component
// https://codepen.io/masonfox/pen/ZyyPEj
// https://codepen.io/fuxy22/pen/OWKdzY
// https://juejin.im/entry/5843abb1a22b9d007a97854c
Vue.component('quantity', {
  template: `
    <div class="quantity-toggle">
      <button class="quan_butn" v-on:click="decrement()">－</button>
      <input class="quan_input" type="number" :value="value" @input="trigger">
      <button class="quan_butn" v-on:click="increment()">＋</button>
    </div>
  `,
  props: {
    min: {
      default: String
    },
    max: {
      default: String
    },
    value: {
      default: Number
    },
    emitOnMount: {
      default: true
    }
  },
  data () {
    return {
      myMin: this.min,
      myMax: this.max,
      myValue: this.value
    }
  },
  watch: {
    min (val) {
      this.myMin = parseInt(val, 10)
    },
    max (val) {
      this.myMax = parseInt(val, 10)
      if (this.myValue > parseInt(this.max, 10)) {
        this.myValue = parseInt(this.max, 10)
      }
    },
    value (val) {
      this.myValue = parseInt(val, 10)
    },
    myMin (val) {
    },
    myMax (val) {
    },
    myValue (val) {
      var tmp = val
      if (isNaN(val)) {
        tmp = parseInt(this.myMin, 10)
      } else {
        if (val > parseInt(this.myMax, 10)) {
          tmp = parseInt(this.myMax, 10)
        }
        if (val < parseInt(this.myMin, 10)) {
          tmp = parseInt(this.myMin, 10)
        }
      }
      this.$emit('input', tmp)
    }
  },
  methods: {
    trigger (e) {
      this.$emit('input', parseInt(e.target.value, 10))
      this.$emit('dragEnd')
    },
    increment () {
      if (this.myValue + 1 > this.myMax) {
      } else {
        this.myValue++
      }
    },
    decrement () {
      if (this.myValue - 1 < this.myMin) {
      } else {
        this.myValue--
      }
    }
  },
  mounted () {
    this.$emit('input', this.value)
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
