<template>
  <v-app>
    <v-app-bar app>
      <v-tabs fixed-tabs>
        <v-tab to="/players">Players</v-tab>
        <v-tab to="/teams">Teams</v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <MyFooter />
  </v-app>
</template>

<script>
import MyFooter from "./components/MyFooter";
export default {
  name: "App",
  components: {
    MyFooter
  }
};
</script>

<style lang="scss">
html {
  overflow-y: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
