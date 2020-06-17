<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="tournaments"
    :single-select="singleSelect"
    :single-expand="false"
    show-select
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <!-- <v-toolbar flat short> -->
      <v-row align="center">
        <v-chip class="ml-5">Tournaments</v-chip>
        <v-btn color="primary" class="ml-5" dark @click.stop="newMatchDialog = true">Add New Match</v-btn>
      </v-row>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">More info about {{ item.name }}</td>
    </template>
  </v-data-table>
</template>

<script>
import Api from "../api/api";

export default {
  name: "TeamStatisticsTable",
  components: {},

  data: () => ({
    tournaments: [],
    selected: [],
    headers: [{ text: "Name", sortable: true, value: "name" }],
    singleSelect: false,
    newMatchDialog: false
  }),
  computed: {},
  created() {
    const api = new Api();
    return api.getTournaments().then(
      results => {
        console.log("data", results);
        this.tournaments = results.map(item => ({
          id: `${item.name}`,
          ...item
        }));
      },
      error => {
        console.log("error", error);
      }
    );
  },
  methods: {}
};
</script>

<style lang="scss">
</style>