const state = {
    // state structure
    maps: []
};

const getters = {

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

};

const actions = {

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};