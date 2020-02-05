import Vue from 'vue'
import VueRouter from 'vue-router'
import BritishSystemSeries from '@/views/british-system-series.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/products/de-pa-electric/british-system-series',
    component: BritishSystemSeries
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
