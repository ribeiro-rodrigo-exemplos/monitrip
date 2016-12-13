module.exports = function(app){

    let controlador = {};

    controlador.cadastrar = (req,res) => {
        
        req.assert('imei', 'imei obrigatório').notEmpty();

        var errors = req.validationErrors();

        if(errors){
            res.status(422).json(errors);
            return;
        }
        
        let connection = new app.database.mysqlConnectionFactory();
        let dispositivoDAO = new app.database.dispositivoDAO(connection);

        var licenca = 1;
        var cliente = 209;
        
        var objetoDispositivo = {
            imei: req.body.imei,
            descricao: req.body.descricao,
            excluido: req.body.excluido
        };

        Promise.all([
            dispositivoDAO.consultarImei(cliente, objetoDispositivo.imei, licenca),
            dispositivoDAO.verificaLicenca(cliente, licenca)
        ]).then(imei => {
            dispositivoDAO.cadastrar(objetoDispositivo, licenca, cliente)
                .then(dispositivo => {
                    
                });
            
            res.send(imei);
            
        }).catch(erro =>{
        
            res.status(422) 
                .send(erro.message);
            
        });
    }
  
    return controlador;
}