export default class Api {
    hostname = 'https://itsatreee.com/aoe2';
    // hostname = 'http://localhost:3000';

    playerRoute = 'api/players';
    tournamentRoute = 'api/tournaments';

    constructor() { }

    async getPlayersData() {
        return await fetch(`${this.hostname}/${this.playerRoute}/all`).then(response => {
            console.log('getPlayersData response', response);
            return response.json();
        }).then(data => {
            console.log('getPlayersData data', data);
            return data;
        });
    }

    async deletePlayer(playerId) {
        const options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playerId })
        }
        return await fetch(`${this.hostname}/${this.playerRoute}/${playerId}`, options).then(response => {
            console.log('deletePlayer response', response);
            return response.json()
        }, this.errorHandler).then(data => {
            console.log('deletePlayer data', data);
            return data;
        }, this.errorHandler);
    }

    async addNewPlayer(name, team) {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, team })
        }
        return await fetch(`${this.hostname}/${this.playerRoute}/new`, options).then(response => {
            console.log('addNewPlayer response', response);
            return response.json()
        }).then(newPlayer => {
            console.log('addNewPlayer newPlayer', newPlayer);
            return newPlayer;
        });
    }

    async getTournaments() {
        return await fetch(`${this.hostname}/${this.tournamentRoute}/all`).then(response => {
            console.log('getTournaments api response', response);
            return response.json()
        }).then(data => {
            console.log('getTournaments api data', data);
            return data;
        });
    }

    errorHandler(error) {
        console.log(`api error`, error);
    }
}