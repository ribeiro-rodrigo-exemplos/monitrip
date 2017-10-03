const mongoose = require('mongoose');

const schema = mongoose.Schema({
    dataHoraEvento:String,
    bilhete:Object
},{
    versionKey:false
});

mongoose.model('Checkin',schema,'CheckinBilhetes');