export default class Api {
    async getPlayersData() {
        const data = await fetch("");
        return data.json();
    }
}