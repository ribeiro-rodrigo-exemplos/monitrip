
const yaml = require('js-yaml');
const fs = require('fs');

const envs = {
    dev:'./config/dev.yml',
    hml:'./config/hml.yml',
    test:'./config/test.yml'
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

    console.log(`Utilizando ambiente ${envName}.`);

}catch(e){
    console.error(e);
}

module.exports = () => config;


