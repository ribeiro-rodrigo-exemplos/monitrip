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
                    .update({imei:dispositivo.imei,descricao:dispositivo.descricao},{where:{id:dispositivo.id}})
                    .then(result => resolve(result[0] ? true:false))
                    .catch(erro => {
                        erro = this._obterErro(erro);
                        reject(erro);
                    });
         });
     }

     cadastrar(dispositivo){
        return new Promise((resolve,reject) => {
            this._Dispositivo
                    .create(dispositivo)
                        .then(result => resolve(result.dataValues))
                        .catch(erro => {
                            erro = this._obterErro(erro);
                            reject(erro);
                        });
         });
     }

     obterQuantidadeDeDispositivosAtivosDoCliente(idCliente){
         return this._Dispositivo
                        .count({where:{idCliente:idCliente,excluido:0}})
                        .catch(erro => {
                            throw this._obterErro(erro);
                        });

     }

     listarDispositivosDoCliente(idCliente){
         return this._Dispositivo
                        .findAll({where:{idCliente:idCliente}})
                        .then(result => result.length ? result : null);
     }

     filtrarDispositivosDoCliente(idCliente,excluido,imei,descricao){

         let filtro = {idCliente:idCliente};

         if(excluido)
             filtro.excluido = excluido == 'true' ? 0 : 1;

         if(imei)
             filtro.imei = imei;

         if(descricao)
             filtro.descricao = descricao;

         return this._Dispositivo
                        .findAll({where:filtro})
                        .then(result => result.length ? result : null);
     }

     obter(idCliente,idDispositivo){
         return this._Dispositivo
                        .findOne({where:{idCliente:idCliente,id:idDispositivo}})
                        .then(result => result ? result.dataValues : null)
     }

     excluir(idCliente,idDispositivo,excluido){
         return this._Dispositivo
                        .update({excluido:excluido},{where:{idCliente:idCliente,id:idDispositivo}})
                        .then(result => result[0]);
     }

     _obterErro(erro){
        if(erro.name == 'SequelizeUniqueConstraintError'){
            erro = new Error('O Imei informado já está em uso');
            erro.status = 422;
        }

        return erro;
     }

 }
