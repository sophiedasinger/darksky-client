'use strict';

var request = require('request');

class DarkSky {
    /**
     * See https://darksky.net/dev/docs/forecast for documentation
     * @constructor
     * @param {string} apiKey
     * @param {string} language
     * @param {string} units
     */
    constructor(apiKey, language, units) {
        this.apiKey = apiKey;
        this.language = language || 'en';
        this.units = units || 'us';
    }

    /**
     * @param {number} latitude
     * @param {number} longitude
     */
     getForecast(latitude, longitude) {
        const url = `https://api.darksky.net/forecast/${this.apiKey}/${latitude},${longitude}
                     ?language=${this.language}&units=${this.units}`;
        return new Promise((resolve, reject) => {
            request.get(url, (err, res, body) => {
                if (err) {
                    return reject(new Error(`Error from DarkSky: ${err}`));
                }
                if (res && res.statusCode !== 200) {
                    return reject(new Error(`Unexpected status code from DarkSky: ${res.statusCode}`));
                }
                let forecast = null;
                try {
                    forecast = JSON.parse(body);
                } catch (ex) {
                    return reject(new Error(`Unable to parse JSON from DarkSky`));
                }
                resolve(forecast);
            })
        })
    }
}

module.exports = DarkSky;