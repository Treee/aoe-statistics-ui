<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="mappedPlayers"
    :single-expand="false"
    item-key="id"
    show-select
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <!-- <v-toolbar flat short> -->
      <v-row align="center">
        <v-chip class="ml-5">Player Statistics</v-chip>
        <v-btn color="primary" class="ml-5" dark @click.stop="newPlayerDialog = true">Add Player</v-btn>
        <v-dialog v-model="newPlayerDialog" max-width="290">
          <v-card>
            <v-card-title class="headline">Add New Player</v-card-title>
            <v-card-text>
              <v-text-field v-model="newPlayerName" label="Player Name" hint="Player1" required></v-text-field>
              <v-overflow-btn
                class="my-2"
                :items="teams"
                label="Teams"
                editable
                item-value="text"
                v-model="playerTeam"
                required
              ></v-overflow-btn>
              <v-btn
                class="skinny-height"
                color="primary"
                dark
                @click.stop="newTeamDialog = true"
              >Can't Find A Team? Add It!</v-btn>
              <v-dialog v-model="newTeamDialog" max-width="290">
                <v-card>
                  <v-card-title class="headline">Add New Team</v-card-title>
                  <v-card-text>
                    <v-text-field v-model="newTeamName" label="Team Name" hint="Team Name" required></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="newTeamDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" text @click="addNewTeam">Agree</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="newPlayerDialog = false">Cancel</v-btn>
              <v-btn color="green darken-1" text @click="addPlayer()">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
  name: "PlayerStatisticsTable",
  components: {},

  data: () => ({
    newPlayerDialog: false,
    newTeamDialog: false,
    teams: [],
    newPlayerName: "",
    playerTeam: "",
    newTeamName: "",
    selected: [],
    headers: [
      { text: "Name", sortable: true, value: "name" },
      { text: "Team", sortable: true, value: "team" }
    ],
    players: []
  }),
  computed: {
    mappedPlayers() {
      return this.players.map(item => ({
        id: `${item.name}-${item.team}`,
        ...item
      }));
    }
  },
  created() {
    this.$store.getters["players/getPlayers"].then(result => {
      this.players = result;
    });
    this.teams = this.$store.getters["players/getTeams"];
  },
  methods: {
    async addPlayer() {
      const playerExists = this.players.find(player => {
        return (
          player.name === this.newPlayerName && player.team === this.playerTeam
        );
      });
      if (!playerExists) {
        const api = new Api();
        await api.addNewPlayer(this.newPlayerName, this.playerTeam).then(() => {
          this.players.push({
            name: this.newPlayerName,
            team: this.playerTeam
          });
          console.log("response");
        });
      }
      this.newPlayerDialog = false;
    },
    addNewTeam() {
      console.log("clicked", this.newTeamName);
      if (!this.teams.includes(this.newTeamName)) {
        this.teams.push(this.newTeamName);
      }
      this.newTeamDialog = false;
    }
  }
};
</script>

<style lang="scss">
.skinny-height {
  height: 1rem !important;
}
</style>