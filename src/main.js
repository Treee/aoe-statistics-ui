import Vue from 'vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import store from "./store/store";

Vue.config.productionTip = false

import App from "./App.vue";
import PlayerStatisticsTable from "./components/PlayerStatisticsTable";
import TeamStatisticsTable from "./components/TeamStatisticsTable";
import TournamentsTable from "./components/TournamentsTable";

Vue.use(VueRouter);
Vue.use(vuetify);

const routes = [
  { path: '/', component: PlayerStatisticsTable },
  { path: '/players', component: PlayerStatisticsTable },
  { path: '/teams', component: TeamStatisticsTable },
  { path: '/tournaments', component: TournamentsTable }
];
const router = new VueRouter({ routes, mode: 'hash' });

new Vue({
  el: '#app',
  router,
  store: store,
  vuetify,
  render: h => h(App),
});
