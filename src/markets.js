"use strict";

class Markets {
    constructor() {
        this.marketsURI = 'https://api.cryptonator.com/api/full/';

    }
    async getCoin(coin){

        // query parameter for the base coin search
        const query = `${coin}-usd`;
        const response = await fetch(this.marketsURI + query);
        const data = await response.json();
        
        return data; 
    }

}

export { Markets as default };