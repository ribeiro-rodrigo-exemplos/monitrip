/**
 * Created by rodrigo.santos on 05/01/2017.
 */
module.exports = () =>
    class LicencaController{
        constructor(licencaService){
            this._licencaService = licencaService;
        }

        obterLicencasDoCliente(req,res,next){
            this._obterLicencas(res,next,req.idCliente);
        }

        obterLicencasDoClientePorId(req,res,next){
            this._obterLicencas(res,next,req.params.id);
        }

        _obterLicencas(res,next,id){
            this._licencaService
                .obterLicencasDoCliente(id)
                .then(licencas => res.json(licencas))
                .catch(erro => next(erro));
        }
    }