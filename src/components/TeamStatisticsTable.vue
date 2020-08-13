<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="computedTeams"
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
      <td :colspan="headers.length">More info about {{ item.name }}</td>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: "TeamStatisticsTable",
  components: {},

  data: () => ({
    teams: [],
    selected: [],
    headers: [{ text: "Team", sortable: true, value: "name" }],
    singleSelect: false,
  }),
  computed: {
    computedTeams() {
      const uniqueTeamNames = [];
      const uniqueTeams = [];
      this.teams.forEach((item) => {
        if (!uniqueTeamNames.includes(item)) {
          uniqueTeamNames.push(item);
          uniqueTeams.push({
            name: item,
            ...item,
          });
        }
      });
      return uniqueTeams;
    },
  },
  created() {
    this.$store.getters["players/getPlayers"].then(() => {
      this.teams = this.$store.getters["players/getTeams"];
    });
  },
  methods: {},
};
</script>

<style lang="scss">
</style>