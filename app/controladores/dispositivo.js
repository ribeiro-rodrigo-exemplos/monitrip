module.exports = function(){

    let controlador = {};

    controlador.obter = (req,res) => {
          
          res
            .json({placa:req.params.placa})
            .status(200);
    }

    return controlador;
}