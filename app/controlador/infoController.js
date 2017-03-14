/**
 * Created by rodrigo on 10/03/17.
 */
var config = require('../bootstrap/config-bootstrap')();
let logger = require('../util/log');

module.exports = () =>
    class InfoController{
        constructor(){}

        obterInformacoesDaAplicacao(req,res,next){
            logger.info(`InfoController - obterInformacoesDaAplicacao`);

            res.json(config);
        }
    };


