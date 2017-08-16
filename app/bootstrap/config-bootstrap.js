const yaml = require('js-yaml');
const fs = require('fs');
let logger = require('../util/log');

const envs = {
    development: './config/env/development.yml',
    production: './config/env/production.yml',
    test: './config/env/test.yml'
};

let envName = process.env['NODE_ENV'];
let file = null;

try {

    if (envs[envName])
        file = envs[envName];
    else {
        envName = 'development';
        file = envs[envName];
    }

    var config = yaml.safeLoad(fs.readFileSync(file));

   console.log(`Utilizando ambiente ${envName}.`);

} catch (e) {
    console.log(e);
}

module.exports = () => config;


