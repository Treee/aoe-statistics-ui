import Vue from 'vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';

Vue.config.productionTip = false

import App from "./App.vue";
import PlayerStatisticsTable from "./components/PlayerStatisticsTable";

Vue.use(vuetify);
Vue.use(VueRouter);

const routes = [
  { path: '/', component: PlayerStatisticsTable },
  { path: '/players', component: PlayerStatisticsTable },
  { path: '/teams', component: PlayerStatisticsTable },
  { path: '/tournaments', component: PlayerStatisticsTable }
];
const router = new VueRouter({ routes, mode: 'hash' });

new Vue({
  el: '#app',
  router,
  vuetify,
  render: h => h(App)
});
