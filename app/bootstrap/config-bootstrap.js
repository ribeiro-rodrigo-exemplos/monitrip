
const yaml = require('js-yaml');
const fs = require('fs');
let log = require('../util/log');

const envs = {
    dev:'./config/env/dev.yml',
    hml:'./config/env/hml.yml',
    test:'./config/env/test.yml'
}

let envName = process.env['NODE_ENV'];
let file = null;

try{

    if(envs[envName])
        file = envs[envName];
    else{
        envName = 'dev';
        file = envs[envName];   
    }
    
    var config = yaml.safeLoad(fs.readFileSync(file));

    log.debug(`Utilizando ambiente ${envName}.`);
    log.info(`Utilizando ambiente ${envName}.`);

}catch(e){
    console.error(e);
}

module.exports = () => config;


