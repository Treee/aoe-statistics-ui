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
              <v-form ref="newMatchForm" v-model="isNewMatchValid">
                <v-overflow-btn
                  :items="tournamentDropDownOptions"
                  label="Tournament Name (required)"
                  editable
                  item-value="text"
                  v-model="tournamentName"
                  :rules="tournamentDropDownRules"
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

                <v-overflow-btn
                  :items="phaseDropDownOptions"
                  label="Phase (required)"
                  editable
                  item-value="text"
                  v-model="phaseName"
                  :rules="phaseDropDownOptionsRules"
                  required
                ></v-overflow-btn>
                <v-btn
                  class="skinny-height"
                  color="primary"
                  dark
                  @click.stop="newPhaseDialog = true"
                >Can't Find A Phase? Add It!</v-btn>
                <v-dialog v-model="newPhaseDialog" max-width="290">
                  <v-card>
                    <v-card-title class="headline">Add New Phase</v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-model="phaseName"
                        label="Phase Name"
                        hint="Phase SemiFinals"
                        required
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="newPhaseDialog = false">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="addNewPhase">Agree</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-overflow-btn
                  :items="groupDropDownOptions"
                  label="Group"
                  editable
                  item-value="text"
                  v-model="groupName"
                  required
                ></v-overflow-btn>
                <v-btn
                  class="skinny-height"
                  color="primary"
                  dark
                  @click.stop="newGroupDialog = true"
                >Can't Find A Group? Add It!</v-btn>
                <v-dialog v-model="newGroupDialog" max-width="290">
                  <v-card>
                    <v-card-title class="headline">Add New Group</v-card-title>
                    <v-card-text>
                      <v-text-field v-model="groupName" label="Group Name" hint="Group A" required></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="newGroupDialog = false">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="addNewGroup">Agree</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-overflow-btn
                  :items="matchDropDownOptions"
                  label="Match (required)"
                  editable
                  item-value="text"
                  v-model="matchNumber"
                  :rules="matchDropDownOptionsRules"
                  required
                ></v-overflow-btn>
                <v-btn
                  class="skinny-height"
                  color="primary"
                  dark
                  @click.stop="newGameMatchDialog = true"
                >Can't Find A Match? Add It!</v-btn>
                <v-dialog v-model="newGameMatchDialog" max-width="290">
                  <v-card>
                    <v-card-title class="headline">Add New Match</v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-model="matchNumber"
                        label="Match Number"
                        hint="Match 1"
                        type="number"
                        required
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="newGameMatchDialog = false">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="addNewGameMatch">Agree</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-overflow-btn
                  :items="gameDropDownOptions"
                  label="Game (required)"
                  editable
                  item-value="text"
                  v-model="gameNumber"
                  :rules="gameDropDownOptionsRules"
                  required
                ></v-overflow-btn>
                <v-btn
                  class="skinny-height"
                  color="primary"
                  dark
                  @click.stop="newGameDialog = true"
                >Can't Find A Game? Add It!</v-btn>
                <v-dialog v-model="newGameDialog" max-width="290">
                  <v-card>
                    <v-card-title class="headline">Add New Match</v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-model="gameNumber"
                        label="Game Number"
                        hint="Match 1"
                        type="number"
                        required
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="newGameDialog = false">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="addNewGame">Agree</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-overflow-btn
                  :items="civilizations"
                  label="Civ Played"
                  editable
                  item-value="text"
                  v-model="civilizationPlayed"
                  required
                ></v-overflow-btn>

                <v-overflow-btn
                  :items="maps"
                  label="Map Played"
                  editable
                  item-value="text"
                  v-model="mapPlayed"
                  required
                ></v-overflow-btn>

                <v-btn
                  class="skinny-height"
                  color="primary"
                  dark
                  @click.stop="newMapDialog = true"
                >Can't Find A Map? Add It!</v-btn>
                <v-dialog v-model="newMapDialog" max-width="290">
                  <v-card>
                    <v-card-title class="headline">Add New Map</v-card-title>
                    <v-card-text>
                      <v-text-field v-model="mapPlayed" label="Map Played" hint="Arabia" required></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="newMapDialog = false">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="addNewMap">Agree</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-overflow-btn
                  :items="winnerDropDown"
                  label="Winner"
                  editable
                  item-value="text"
                  v-model="winner"
                  required
                ></v-overflow-btn>

                <div>
                  <div>
                    <v-chip
                      class="player-1"
                      :class="playerPosition === 'p1' ? 'active-player' : ''"
                      :ripple="false"
                      @click="selectPlayerPosition('p1')"
                    >P1 Flank</v-chip>
                    <v-chip
                      class="player-3"
                      :class="playerPosition === 'p3' ? 'active-player' : ''"
                      :ripple="false"
                      @click="selectPlayerPosition('p3')"
                    >P3 Pocket</v-chip>
                    <v-chip
                      class="player-5"
                      :class="playerPosition === 'p5' ? 'active-player' : ''"
                      :ripple="false"
                      @click="selectPlayerPosition('p5')"
                    >P5 Pocket</v-chip>
                    <v-chip
                      class="player-7"
                      :class="playerPosition === 'p7' ? 'active-player' : ''"
                      :ripple="false"
                      @click="selectPlayerPosition('p7')"
                    >P7 Flank</v-chip>
                  </div>
                  <div class="mt-1">
                    <v-chip
                      class="player-2"
                      :class="playerPosition === 'p2' ? 'active-player' : ''"
                      :ripple="false"
                      @click="selectPlayerPosition('p2')"
                    >P2 Flank</v-chip>
                    <v-chip
                      class="player-4"
                      :class="playerPosition === 'p4' ? 'active-player' : ''"
                      :ripple="false"
                      @click="selectPlayerPosition('p4')"
                    >P4 Pocket</v-chip>
                    <v-chip
                      class="player-6"
                      :class="playerPosition === 'p6' ? 'active-player' : ''"
                      :ripple="false"
                      @click="selectPlayerPosition('p6')"
                    >P6 Pocket</v-chip>
                    <v-chip
                      class="player-8"
                      :class="playerPosition === 'p8' ? 'active-player' : ''"
                      :ripple="false"
                      @click="selectPlayerPosition('p8')"
                    >P8 Flank</v-chip>
                  </div>
                </div>
              </v-form>
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
    newMatchDialog: false,
    isNewMatchValid: false,

    civilizations: [],
    civilizationPlayed: "",

    maps: [],
    mapPlayed: "",
    newMapDialog: false,

    winnerDropDown: [],
    winner: "",

    playerPosition: "",

    tournamentDropDown: [],
    tournamentName: "",
    newTournamentDialog: false,
    tournamentDropDownRules: [(v) => !!v || "Tournament is required."],

    phaseDropDownOptions: [],
    phaseName: "",
    newPhaseDialog: false,
    phaseDropDownOptionsRules: [(v) => !!v || "Phase is required."],

    groupDropDownOptions: [],
    groupName: "",
    newGroupDialog: false,

    matchDropDownOptions: [],
    matchNumber: 0,
    newGameMatchDialog: false,
    matchDropDownOptionsRules: [(v) => !!v || "Match is required."],

    gameDropDownOptions: [],
    gameNumber: 0,
    newGameDialog: false,
    gameDropDownOptionsRules: [(v) => !!v || "Game is required."],

    selected: [],
    headers: [{ text: "Name", sortable: true, value: "name" }],
    singleSelect: false,
  }),
  computed: {
    mappedTournaments() {
      return this.tournaments.map((item) => ({
        name: item,
      }));
    },
    tournamentDropDownOptions() {
      return this.tournamentDropDown;
    },
    isActive(playerPosition) {
      return this.playerPosition === playerPosition;
    },
  },
  created() {
    this.$store.getters["tournaments/getTournaments"].then((result) => {
      console.log("tournaments result", result);
      this.tournaments = result;
    });
    this.$store.getters["players/getPlayers"].then((result) => {
      this.winnerDropDown = result.map((item) => {
        return item.name;
      });
    });
    this.civilizations = this.$store.getters["commonData/getCivilizationNames"];
    this.maps = this.$store.getters["commonData/getMaps"];
    this.playerPositions = this.$store.getters["commonData/getPlayerPositions"];
    this.tournamentDropDown = this.tournaments.slice();
  },
  methods: {
    addNewMatch() {
      const data = {
        tournament: this.tournamentName,
        phase: this.phaseName,
        group: this.groupName,
        match: this.matchNumber,
        game: this.gameNumber,
        mapPlayed: this.mapPlayed,
        civPlayed: this.civilizationPlayed,
        winner: this.winner,
        position: this.playerPosition,
      };
      this.$refs.newMatchForm.validate();
      if (this.isNewMatchValid) {
        console.log("addNewMatch click4", data);
        this.newMatchDialog = false;
      }
    },
    addNewTournament() {
      console.log("addNewTournament clicked", this.tournamentName);
      if (!this.tournaments.includes(this.tournamentName)) {
        this.tournamentDropDown.push(this.tournamentName);
      }
      this.newTournamentDialog = false;
    },
    addNewPhase() {
      console.log("addNewPhase clicked", this.phaseName);
      if (!this.phaseDropDownOptions.includes(this.phaseName)) {
        this.phaseDropDownOptions.push(this.phaseName);
      }
      this.newPhaseDialog = false;
    },
    addNewGroup() {
      console.log("addNewGroup clicked", this.groupName);
      if (!this.groupDropDownOptions.includes(this.groupName)) {
        this.groupDropDownOptions.push(this.groupName);
      }
      this.newGroupDialog = false;
    },
    addNewGameMatch() {
      console.log("addNewGameMatch clicked", this.matchNumber);
      if (!this.matchDropDownOptions.includes(this.matchNumber)) {
        this.matchDropDownOptions.push(this.matchNumber);
      }
      this.newGameMatchDialog = false;
    },
    addNewGame() {
      console.log("addNewGame clicked", this.gameNumber);
      if (!this.gameDropDownOptions.includes(this.gameNumber)) {
        this.gameDropDownOptions.push(this.gameNumber);
      }
      this.newGameDialog = false;
    },
    addNewMap() {
      console.log("addNewMap clicked", this.mapPlayed);
      if (!this.maps.includes(this.mapPlayed)) {
        this.maps.push(this.mapPlayed);
      }
      this.newMapDialog = false;
    },
    selectPlayerPosition(position) {
      if (this.playerPosition === position) {
        this.playerPosition = "";
      } else {
        this.playerPosition = position;
      }
      console.log(position);
    },
  },
};
</script>

<style lang="scss">
.active-player {
  background-color: darkgray !important;
}

.player-1 {
  font-weight: bold;
  color: blue !important;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}
.player-2 {
  font-weight: bold;
  color: red !important;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}
.player-3 {
  font-weight: bold;
  color: green !important;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}
.player-4 {
  font-weight: bold;
  color: yellow !important;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.player-5 {
  font-weight: bold;
  color: cyan !important;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
.player-6 {
  font-weight: bold;
  color: purple !important;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}
.player-7 {
  font-weight: bold;
  color: gray !important;
  text-shadow: -1px 0 white, 0 1px white, 1px 0 white, 0 -1px white;
}
.player-8 {
  font-weight: bold;
  color: orange !important;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}
</style>