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

            state.teams = results.map(item => {
                return item.team;
            });
            return state.players;
        });
    },
    getTeams(state) {
        return state.teams;
    }
};

const mutators = {
    // mutators
};

const actions = {
    // actions
};

export default {
    namespaced: true,
    state,
    getters,
    mutators,
    actions,
};