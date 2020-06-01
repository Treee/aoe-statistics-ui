<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="mappedPlayers"
    :single-select="singleSelect"
    item-key="id"
    show-select
    class="elevation-1"
  >
    <template v-slot:top>
      <v-switch v-model="singleSelect" label="Single Select" class="pa-3"></v-switch>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "PlayerStatisticsTable",

  components: {},

  data: () => ({
    selected: [],
    headers: [
      { text: "Name", sortable: true, value: "name" },
      { text: "Team", sortable: true, value: "team" }
    ],
    players: [
      { name: "P1", team: "Team1" },
      { name: "P1", team: "Some Other Team" },
      { name: "P2", team: "Team1" },
      { name: "P3", team: "Team2" },
      { name: "P4", team: "Team2" },
      { name: "P5", team: "Team3" }
    ],
    singleSelect: false
  }),
  computed: {
    mappedPlayers() {
      return this.players.map(item => ({
        id: `${item.name}-${item.team}`,
        ...item
      }));
    }
  }
};
</script>
