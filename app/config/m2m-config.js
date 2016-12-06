let dev = require('./env/desenvolvimento');
let hom = require('./env/homologacao');
let test = require('./env/teste');

module.exports = function(){
    
    let env =  process.env['NODE_ENV'];

    if(!env)
        env = 'dev';

    console.log(`Utilizando ambiente ${env}.`);

    if(env == 'test')
        return test();
        else
            if(env == 'hom')
                return hom();
            else
                return dev();
    
}

