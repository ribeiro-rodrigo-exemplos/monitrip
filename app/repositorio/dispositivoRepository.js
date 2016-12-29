module.exports = () =>
 class DispositivoRepository{
     constructor(dispositivo){
         this._Dispositivo = dispositivo;
     }

     obterDispositivoHabilitadoPorImei(idCliente,imei){
         return new Promise((resolve,reject) => {
             this._Dispositivo.findOne({where:{imei:imei,excluido:0,idCliente:idCliente}})
                                .then(dispositivo => resolve(dispositivo ? dispositivo.dataValues:null))
                                .then(erro => reject(erro));
         });
     }

    obterDispositivoPorImei(imei){
         return new Promise((resolve,reject) => {
             this._Dispositivo.findOne({where:{imei:imei}})
                                .then(dispositivo => resolve(dispositivo ? dispositivo.dataValues:null))
                                .then(erro => reject(erro));
         });
     }

     atualizar(dispositivo){
        return new Promise((resolve,reject) => {
            this._Dispositivo
                    .update(dispositivo,{where:{imei:dispositivo.imei}})
                    .then(result => resolve(result[0] ? true:false))
                    .catch(erro => reject(erro));
         });
     }

     cadastrar(dispositivo){
        return new Promise((resolve,reject) => {
            this._Dispositivo
                    .create(dispositivo)
                        .then(result => resolve(result.dataValues))
                        .catch(erro => reject(erro));
         });
     }
 }
