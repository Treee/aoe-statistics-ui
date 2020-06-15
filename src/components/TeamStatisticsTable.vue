<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="teams"
    :single-select="singleSelect"
    :single-expand="false"
    show-select
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <!-- <v-toolbar flat short> -->
      <v-row align="center">
        <v-chip class="ml-5">Team Statistics</v-chip>
      </v-row>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">More info about {{ item.team }}</td>
    </template>
  </v-data-table>
</template>
<script>
import Api from "../api/api";

export default {
  name: "TeamStatisticsTable",
  components: {},

  data: () => ({
    teams: [],
    selected: [],
    headers: [{ text: "Team", sortable: true, value: "team" }],
    singleSelect: false
  }),
  computed: {},
  created() {
    const api = new Api();
    return api.getPlayersData().then(results => {
      console.log("data", results);
      this.teams = results.map(item => ({
        id: `${item.team}`,
        ...item
      }));
    });
  },
  methods: {}
};
</script>

<style lang="scss">
</style>