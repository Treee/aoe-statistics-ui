import Api from "../../api/api";
const api = new Api();
const state = {
    // state structure
    tournaments: [],
    matches: []
};

const getters = {
    async getTournaments(state) {
        return await api.getTournaments().then((results) => {
            console.log("getTournaments", results);
            state.tournaments = results;
            return state.tournaments
        });
    },

    async getAllMatches(state) {
        return await api.getAllMatches().then((results) => {
            state.matches = results;
            return state.matches;
        });
    }
};

const mutations = {
    addNewMatch(state, newMatch) {
        state.tournaments.push(newMatch);
    }
};

const actions = {
    // actions
    async addNewMatch({ commit, state }, matchInfo) {
        return await api.addNewMatch(matchInfo.tournament, matchInfo.phase, matchInfo.stage, matchInfo.group, matchInfo.match, matchInfo.game, matchInfo.civPlayed, matchInfo.mapPlayed, matchInfo.winner, matchInfo.playerPosition)
            .then((newMatch) => {
                console.log('newMatch', newMatch);
                commit('addNewMatch', newMatch)
                return state.tournaments;
            });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};