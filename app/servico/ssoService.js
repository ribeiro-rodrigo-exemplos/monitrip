class SSOService{
    constructor(){}

    autenticar(credenciais){
        return new Promise((resolve,reject) => {
            resolve({token:'aaauyttarararaeaea'});
        });
    }
}

let service;

module.exports = () => {
    if(!service)
        service = new SSOService();
    
    return service;
}