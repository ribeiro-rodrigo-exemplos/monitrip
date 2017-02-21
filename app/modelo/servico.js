/**
 * Created by rodrigo on 20/02/17.
 */
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    dataServico:String,
    idCliente:Number,
    createDate:Date
});

schema.index({createDate:1},{expireAfterSeconds:864000});

mongoose.model('Servico',schema,'ServicosMonitriip');