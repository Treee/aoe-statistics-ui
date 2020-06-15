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
    <v-footer app center>
      <div class="my-footer">
        <div>
          Created by
          <a href="https://www.twitch.tv/itsatreee">ItsATreee</a>
          (2020) -
          <a href="https://github.com/Treee/aoe-statistics-ui">GitHub</a>
        </div>
        <div>
          Age of Empires II © Microsoft Corporation.
          <b>AoE Statistics for Age of Empires II</b> was created under Microsoft's
          "
          <a
            href="https://www.xbox.com/en-us/developers/rules"
          >Game Content Usage Rules</a>"
          using assets from Age of Empires II, and it is not endorsed by or affiliated with Microsoft.
        </div>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App"
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

.my-footer {
  text-align: center;
  width: 100%;
}
</style>
