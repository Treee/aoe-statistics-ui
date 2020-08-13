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
        <v-dialog v-model="newMatchDialog" max-width="420">
          <v-card>
            <v-card-title class="headline">Add New Match</v-card-title>
            <v-card-text>
              <v-overflow-btn
                class="my-2"
                :items="tournaments"
                label="Tournaments"
                editable
                item-value="text"
                v-model="tournamentName"
                required
              ></v-overflow-btn>
              <v-btn
                class="skinny-height"
                color="primary"
                dark
                @click.stop="newTournamentDialog = true"
              >Can't Find A Tournament? Add It!</v-btn>
              <v-dialog v-model="newTournamentDialog" max-width="290">
                <v-card>
                  <v-card-title class="headline">Add New Tournament</v-card-title>
                  <v-card-text>
                    <v-text-field
                      v-model="tournamentName"
                      label="Tournament Name"
                      hint="Battle of Africa"
                      required
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="newTournamentDialog = false">Cancel</v-btn>
                    <v-btn color="green darken-1" text @click="addNewTournament">Agree</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="newMatchDialog = false">Cancel</v-btn>
              <v-btn color="green darken-1" text @click="addNewMatch">Agree</v-btn>
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
export default {
  name: "TeamStatisticsTable",
  components: {},

  data: () => ({
    tournaments: [],
    selected: [],
    headers: [{ text: "Name", sortable: true, value: "name" }],
    singleSelect: false,
    newMatchDialog: false,
    tournamentName: "",
    newTournamentDialog: false,
  }),
  computed: {
    mappedTournaments() {
      return this.tournaments;
    },
  },
  created() {
    this.$store.getters["players/getTournaments"].then((result) => {
      this.tournaments = result;
    });
  },
  methods: {
    addNewTournament() {
      console.log("clicked", this.tournamentName);
      if (!this.tournaments.includes(this.tournamentName)) {
        this.tournaments.push(this.tournamentName);
      }
      this.newTournamentDialog = false;
    },
    addNewMatch() {},
  },
};
</script>

<style lang="scss">
</style>