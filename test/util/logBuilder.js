class LogBuilder{
    constructor(){}

    criarLogDeViagemFretada(){
        return {
                    "idLog":"08",
                    "cnpjEmpresaTransporte" : "41550112000101",
                    "placaVeiculo" : "OST9534",
                    "autorizacaoViagem" : "000006766732636363",
                    "tipoRegistroViagem" : "0",
                    "sentidoLinha" : "0",
                    "latitude" : "-2.53712",
                    "longitude" : "-44.2291801",
                    "pdop" : "3.5",
                    "dataHoraEvento" : "2016-06-22 15:29:52",
                    "imei" : "148467" 
               }
    }

    criarLogDeViagemRegular(){
        return {
                    "idLog":"07",
                    "cnpjEmpresaTransporte" : "41550112000101",
                    "placaVeiculo" : "OIP4186",
                    "identificacaoLinha" : "040",
                    "codigoTipoViagem" : "00",
                    "dataProgramadaViagem" : "20160622",
                    "horaProgramadaViagem" : "031900",
                    "tipoRegistroViagem" : "1",
                    "codigoSentidoLinha" : "1",
                    "latitude" : "-6.8868408",
                    "longitude" : "-38.5555237",
                    "pdop" : "3.5",
                    "dataHoraEvento" : "2016-06-22 03:19:37",
                    "imei" : "148467" 
                }
    }

    criarLogDeDetectorDeParada(){
        return {
                    "idLog":"06",
                    "cnpjEmpresaTransporte" : "41550112000101",
                    "placaVeiculo" : "OIP4186",
                    "codigoMotivoParada" : "00",
                    "latitude" : "-7.0027932",
                    "longitude" : "-36.7085896",
                    "pdop" : "3.5",
                    "dataHoraEvento" : "2016-06-22 19:01:57",
                    "imei" : "148467" 
               }
    }

    criarLogDeJornadaDosMotoristas(){
        return {
                    "idLog":"05",
                    "cnpjEmpresaTransporte":"41550112000101",
                    "placaVeiculo":"OIP4186",
                    "cpfMotorista":"24371568017",
                    "tipoRegistroEvento":0,
                    "latitude":"-7.1152767",
                    "longitude":"-34.8926143",
                    "pdop":4.356,
                    "dataHoraEvento":"2016-06-22 17:43:34",
                    "imei":"355371023567429"
               }
    }

    criarLogDeVelocidadeELocalizacao(){
        return {
                    "idLog":"4",
                    "cnpjEmpresaTransporte": "41550112000101",
                    "placaVeiculo": "OIP4186",
                    "velocidadeAtual": "16",
                    "distanciaPercorrida": "1",
                    "situacaoIgnicaoMotor": "1",
                    "situacaoPortaVeiculo": "1",
                    "latitude": "-6.8703884",
                    "longitude": "-36.9271334",
                    "pdop": 3.5,
                    "dataHoraEvento": "2016-06-22 14:00:00",
                    "imei": "148467" 
              }
    }
}

module.exports = new LogBuilder();