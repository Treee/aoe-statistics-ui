import Api from "../../api/api";
const api = new Api();
const state = {
    // state structure
    players: [],
    teams: [],
    tournaments: []
};

const getters = {
    async getPlayers(state) {
        return api.getPlayersData().then(results => {
            console.log("data", results);
            state.players = results.map(item => ({
                id: `${item.name}-${item.team}`,
                ...item
            }));
            return state.players;
        });
    },
    async getTournaments(state) {
        return api.getTournaments().then((results) => {
            console.log("data", results);
            state.tournaments = results;
        });
    },
    getTeams(state) {
        return state.players.map(item => {
            return item.team;
        });
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