import Api from "../../api/api";
const api = new Api();
const state = {
    // state structure
    tournaments: []
};

const getters = {
    async getTournaments(state) {
        return await api.getTournaments().then((results) => {
            console.log("getTournaments", results);
            state.tournaments = results;
            return state.tournaments
        });
    }
};

const mutations = {

};

const actions = {
    // actions

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};