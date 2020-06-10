<template>
  <v-app>
    <v-tabs fixed-tabs>
      <v-tab to="/players">Players</v-tab>
      <v-tab to="/teams">Teams</v-tab>
      <v-tab to="/tournaments">Tournaments</v-tab>
    </v-tabs>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>
