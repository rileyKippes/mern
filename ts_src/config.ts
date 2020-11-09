'use strict'

interface Configuration{
    consoleLog: string,
    fileLog: string,
    port: number,
    debug: boolean,
    login: boolean,
    mongo: {
        url: string,
        db: string
    }
}

var fs = require('fs');

class configuration{

    //readonly
    private static configuration: Configuration;

    public static loadConfig() {
        this.configuration = JSON.parse(fs.readFileSync('./config.json').toString());
        return this.configuration;
    }

    public static getConfig(){ return this.configuration; }
}

module.exports = configuration;