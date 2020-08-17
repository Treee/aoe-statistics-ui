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
                  :items="stageDropDownOptions"
                  label="Stage"
                  editable
                  item-value="text"
                  v-model="stageName"
                  required
                ></v-overflow-btn>
                <v-btn
                  class="skinny-height"
                  color="primary"
                  dark
                  @click.stop="newStageDialog = true"
                >Can't Find A Stage? Add It!</v-btn>
                <v-dialog v-model="newStageDialog" max-width="290">
                  <v-card>
                    <v-card-title class="headline">Add New Stage</v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-model="stageName"
                        label="Stage Name"
                        hint="Main Stage"
                        required
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="newStageDialog = false">Cancel</v-btn>
                      <v-btn color="green darken-1" text @click="addNewStage">Agree</v-btn>
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

                <v-text-field v-model="matchNumber" label="Match Number" type="number" required></v-text-field>

                <v-text-field v-model="gameNumber" label="Game Number" type="number" required></v-text-field>

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
      <td :colspan="headers.length">
        <v-data-table
          :headers="innerHeaders"
          :items="getMatchesForTournament(item._id)"
          :single-select="singleSelect"
          :hide-default-footer="true"
        ></v-data-table>
      </td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "TeamStatisticsTable",
  components: {},

  data: () => ({
    tournaments: [],
    matches: [],
    newMatchDialog: false,
    isNewMatchValid: false,
    selected: [],
    innerSelected: [],
    headers: [{ text: "Name", sortable: true, value: "_id" }],
    innerHeaders: [
      { text: "Phase", sortable: true, value: "phase" },
      { text: "Stage", sortable: true, value: "stage" },
      { text: "Group", sortable: true, value: "group" },
      { text: "Match", sortable: true, value: "match" },
      { text: "Game", sortable: true, value: "game" },
      { text: "Civs", sortable: true, value: "civPlayed" },
      { text: "Map", sortable: true, value: "mapPlayed" },
      { text: "Winner", sortable: true, value: "winner" },
      { text: "Position", sortable: true, value: "position" },
    ],
    singleSelect: false,

    civilizations: [],
    civilizationPlayed: "",

    maps: [],
    mapPlayed: "",
    newMapDialog: false,

    winnerDropDown: [],
    winner: "",

    playerPosition: "",

    tournamentDropDownOptions: [],
    tournamentName: "",
    newTournamentDialog: false,
    tournamentDropDownRules: [(v) => !!v || "Tournament is required."],

    phaseDropDownOptions: [],
    phaseName: "",
    newPhaseDialog: false,
    phaseDropDownOptionsRules: [(v) => !!v || "Phase is required."],

    stageDropDownOptions: [],
    stageName: "",
    newStageDialog: false,

    groupDropDownOptions: [],
    groupName: "",
    newGroupDialog: false,

    matchNumber: 0,
    gameNumber: 0,
  }),
  computed: {
    mappedTournaments() {
      return this.tournaments.map((item) => ({
        name: item,
      }));
    },
    isActive(playerPosition) {
      return this.playerPosition === playerPosition;
    },
  },
  created() {
    this.$store.getters["tournaments/getTournaments"].then((result) => {
      this.tournaments = result;
      this.tournamentDropDownOptions = this.tournaments.slice().map((obj) => {
        return obj._id;
      });
    });
    this.$store.getters["tournaments/getAllMatches"].then((result) => {
      console.log("getAllMatches result", result);
      this.matches = result;
      this.phaseDropDownOptions = this.matches.slice().map((obj) => {
        return obj.phase;
      });
      this.stageDropDownOptions = this.matches.slice().map((obj) => {
        return obj.stage;
      });
      this.groupDropDownOptions = this.matches.slice().map((obj) => {
        return obj.group;
      });
    });
    this.$store.getters["players/getPlayers"].then((result) => {
      this.winnerDropDown = result.map((item) => {
        return item.name;
      });
    });
    this.civilizations = this.$store.getters["commonData/getCivilizationNames"];
    this.maps = this.$store.getters["commonData/getMaps"];
    this.playerPositions = this.$store.getters["commonData/getPlayerPositions"];
  },
  methods: {
    addNewMatch() {
      this.$refs.newMatchForm.validate();
      if (this.isNewMatchValid) {
        this.$store
          .dispatch("tournaments/addNewMatch", {
            tournament: this.tournamentName,
            phase: this.phaseName,
            stage: this.stageName,
            group: this.groupName,
            match: this.matchNumber,
            game: this.gameNumber,
            mapPlayed: this.mapPlayed,
            civPlayed: this.civilizationPlayed,
            winner: this.winner,
            position: this.playerPosition,
          })
          .then((results) => {
            this.tournaments = results;
          });
        this.newMatchDialog = false;
      }
    },
    addNewTournament() {
      console.log("addNewTournament clicked", this.tournamentName);
      if (!this.tournaments.includes(this.tournamentName)) {
        this.tournamentDropDownOptions.push(this.tournamentName);
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
    addNewStage() {
      console.log("addNewStage clicked", this.stageName);
      if (!this.stageDropDownOptions.includes(this.stageName)) {
        this.stageDropDownOptions.push(this.stageName);
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
    getMatchesForTournament(tournamentName) {
      return this.matches.filter((match) => {
        return match.tournamentName === tournamentName;
      });
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