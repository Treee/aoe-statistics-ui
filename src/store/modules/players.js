import Api from "../../api/api";
let api = new Api();
const state = {
    // state structure
    players: [],
    teams: []
};

const getters = {
    async getPlayers(state) {
        console.log('store stuff');
        return api.getPlayersData().then(results => {
            console.log("data", results);
            state.players = results.map(item => ({
                id: `${item.name}-${item.team}`,
                ...item
            }));
            return state.players;
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
        console.log(state.players);
        state.players = state.players.filter((player) => {
            console.log(`Pid: ${playerId} - Oid: ${player._id} - Eq?: ${player._id !== playerId}`);
            return player._id !== playerId.toString();
        });
        console.log(state.players);
    }
};

const actions = {
    // actions
    async deletePlayer({ commit, state }, playerId) {
        console.log('store stuff. playerid', playerId);
        await api.deletePlayer(playerId).then(() => {
            commit('deletePlayer', playerId);
        });
        return state.players;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};