'use strict';
var fs = require('fs');
class configuration {
    //returns true if successful
    static loadConfig() {
        try {
            this.configuration = JSON.parse(fs.readFileSync('./config.json').toString());
            return true;
        }
        catch (_a) {
            return false;
        }
    }
    static getConfig() { return this.configuration; }
}
module.exports = configuration;
