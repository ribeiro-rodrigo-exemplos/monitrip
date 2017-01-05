/**
 * Created by rodrigo.santos on 05/01/2017.
 */
module.exports = () =>
    class LicencaController{
        constructor(licencaService){
            this._licencaService = licencaService;
        }

        obterLicencasDoCliente(req,res,next){

            this._licencaService
                    .obterLicencasDoCliente(req.idCliente)
                        .then(licencas => res.json(licencas))
                        .catch(erro => next(erro));
        }
    }