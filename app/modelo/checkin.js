const safira = require('safira');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    dataHoraEvento:String,
    idViagem: String,
    bilhete:Object
},{
    versionKey:false
});

let checkin = mongoose.model('Checkin',schema,'CheckinBilhetes');

safira.defineObject(checkin, 'checkin');

