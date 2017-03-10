/**
 * Created by rodrigo on 10/03/17.
 */
var config = require('../bootstrap/config-bootstrap')();

module.exports = () =>
    class InfoController{
        constructor(){}

        obterInformacoesDaAplicacao(req,res,next){
            res.json(config);
        }
    };


