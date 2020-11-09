'use strict';
var fs = require('fs');
class configuration {
    static loadConfig() {
        this.configuration = JSON.parse(fs.readFileSync('./config.json').toString());
        return this.configuration;
    }
    static getConfig() { return this.configuration; }
}
module.exports = configuration;
