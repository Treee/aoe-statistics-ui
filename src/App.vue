<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Home Page Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <a
          alt="Home Page Link"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="/"
          width="100"
        >
          <span class="mr-2">Home</span>
        </a>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/Treee/aoe-statistics-ui" target="_blank" text>
        <span class="mr-2">Github Source</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <PlayerStatisticsTable />
    </v-content>
  </v-app>
</template>

<script>
import PlayerStatisticsTable from "./components/PlayerStatisticsTable";

export default {
  name: "App",

  components: {
    PlayerStatisticsTable
  },

  data: () => ({
    //
  })
};
</script>
