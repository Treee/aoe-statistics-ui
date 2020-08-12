export default class Api {
    constructor() { }

    async getPlayersData() {
        return await fetch("https://itsatreee.com/aoe2/api/players").then(response => {
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
            },
            body: JSON.stringify({ name: name, team: team })
        }
        return await fetch("http://itsatreee.com/aoe2/api/player", options).then(response => {
            console.log('response', response);
            return response.json()
        }).then(data => {
            console.log('data', data);
            return data;
        });
    }

    async getTournaments() {
        return await fetch("http://itsatreee.com/aoe2/api/tournaments").then(response => {
            console.log('response', response);
            return response.json()
        }).then(data => {
            console.log('data', data);
            return data;
        });
    }
}