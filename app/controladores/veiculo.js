module.exports = function(){

    let controlador = {};

    controlador.obterVeiculo = (req,res) => {
          
          res
            .json({placa:req.query.placa})
            .status(200);
    }

    return controlador;
}

