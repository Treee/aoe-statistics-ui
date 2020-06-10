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

    async addNewPlayer(name, team) {
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, team: team })
        }
        return await fetch("http://localhost:3000/api/player", options).then(response => {
            console.log('response', response);
            return response.json()
        }).then(data => {
            console.log('data', data);
            return data;
        });
    }
}