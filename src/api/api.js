export default class Api {
    hostname = 'https://itsatreee.com/aoe2/';
    // hostname = 'http://localhost:3000';
    constructor() { }

    async getPlayersData() {
        const options = {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        };
        return await fetch(`${this.hostname}/api/players`, options).then(response => {
            console.log('response', response);
            return response.json();
        }).then(data => {
            console.log('data', data);
            return data;
        });
    }

    async deletePlayer(playerId) {
        const options = {
            method: "DELETE"
        }
        return await fetch(`${this.hostname}/api/player/${playerId}`, options).then(response => {
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, team })
        }
        return await fetch(`${this.hostname}/api/player`, options).then(response => {
            console.log('response', response);
            return response.json()
        }).then(data => {
            console.log('data', data);
            return data;
        });
    }

    async getTournaments() {
        return await fetch(`${this.hostname}/api/tournaments`).then(response => {
            console.log('response', response);
            return response.json()
        }).then(data => {
            console.log('data', data);
            return data;
        });
    }
}