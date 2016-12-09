let dev = require('./env/desenvolvimento');
let hom = require('./env/homologacao');
let test = require('./env/teste');
let prod = require('./env/producao');

module.exports = function(){
    
    let env =  process.env['NODE_ENV'];

    if(!env)
        env = 'dev';

    console.log(`Utilizando ambiente ${env}.`);
    env = "hom";
    if(env == 'test')
        return test();
        else
            if(env == 'hom')
                return hom();
            else
                if(env == 'prod')
                    return prod();
                else
                    return dev();
    
}

