import Api from "../../api/api";
const api = new Api();
const state = {
    // state structure
    players: [],
    teams: [],
    tournaments: [],
    maps: []
};

const getters = {
    async getPlayers(state) {
        return await api.getPlayersData().then(results => {
            console.log("getPlayersData", results);
            state.players = results.map(item => ({
                id: `${item.name}-${item.team}`,
                ...item
            }));
            return state.players;
        });
    },
    async getTournaments(state) {
        return await api.getTournaments().then((results) => {
            console.log("getTournaments", results);
            state.tournaments = results;
            return state.tournaments
        });
    },
    getTeams(state) {
        return state.players.map(item => {
            return item.team;
        });
    },
    getCivilizationNames() {
        return ["Aztecs", "Berbers", "Britons", "Bulgarians", "Burmese", "Byzantines", "Celts", "Chinese", "Cumans", "Ethiopians", "Franks",
            "Goths", "Huns", "Incas", "Indians", "Italians", "Japanese", "Khmer", "Koreans", "Lithuanians", "Magyars", "Malay", "Malians",
            "Mayans", "Mongols", "Persians", "Portuguese", "Saracens", "Slavs", "Spanish", "Tatars", "Teutons", "Turks", "Vietnamese", "Vikings"]
    },
    getMaps(state) {
        return state.maps;
    },
    getPlayerPositions() {
        return ["Player 1 - Flank", "Player 2 - Flank", "Player 3 - Pocket", "Player 4 - Pocket", "Player 5 - Pocket", "Player 6 - Pocket", "Player 7 - Flank", "Player 8 - Flank"];
    }
};

const mutations = {
    // mutators
    deletePlayer(state, playerId) {
        state.players = state.players.filter((player) => {
            return player._id !== playerId.toString();
        });
    },
    addPlayer(state, playerInfo) {
        state.players.push({
            name: playerInfo.name,
            team: playerInfo.team,
            _id: playerInfo._id,
            id: `${playerInfo.name}-${playerInfo.team}`
        });
    }
};

const actions = {
    // actions
    async deletePlayer({ commit, state }, playerId) {
        await api.deletePlayer(playerId).then(() => {
            commit('deletePlayer', playerId);
        });
        return state.players;
    },
    async addPlayer({ commit, state }, playerInfo) {
        const playerExists = state.players.find((player) => {
            return (
                player.name === playerInfo.name && player.team === playerInfo.team
            );
        });
        if (!playerExists) {
            await api.addNewPlayer(playerInfo.name, playerInfo.team).then((newPlayer) => {
                commit('addPlayer', newPlayer);
            });
        }
        return state.players;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};