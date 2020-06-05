export default class Api {
    constructor() { }

    async getPlayersData() {
        return await fetch("http://localhost:3000/api/players").then(response => {
            console.log('response', response);
            return response.json()
        }).then(data => {
            console.log('data', data);
            return data;
        });
    }
}