let dev = require('./env/desenvolvimento');
let hom = require('./env/homologacao');
let test = require('./env/teste');
let prod = require('./env/producao');

const envs = {
    dev:dev,
    hom:hom,
    test:test,
    prod:prod
}

let envName = process.env['NODE_ENV'];

if(envs[envName])
    env = envs[envName];
else{
        envName = 'dev';
        env = envs[envName];
    }
        
console.log(`Utilizando ambiente ${envName}.`);

module.exports = env

