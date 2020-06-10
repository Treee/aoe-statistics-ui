import Vue from 'vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// import PlayerStatisticsTable from "./components/PlayerStatisticsTable";

// const routes = [
//   { path: '/players', component: PlayerStatisticsTable },
//   { path: '/teams', component: PlayerStatisticsTable },
//   { path: '/tournaments', component: PlayerStatisticsTable }
// ];
// const router = new VueRouter({ routes });

new Vue({
  vuetify,
  // router: router
}).$mount('#app')
