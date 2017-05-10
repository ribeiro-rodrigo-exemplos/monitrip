const CONSTANTES = {
    tipoFuncionario: {
        MOTORISTA: 1,
        COBRADOR: 2,
        FISCAL: 3,
        GESTOR_DE_ATUALIZACAO: 4
    },
    
    excluido: {
        NAO: 0,
        SIM: 1
    },

    tipoDeLinha : {
        REGULARES: 1,
        FRETADOS: 2
    },

    tipoRetorno : {
        LINHA : 'linhas',
        VEICULO : 'veiculo'
    },

    funcionalidade: {
        MONITRIP: 26
    },

    descLogs : {
        '00':  'Log de Venda de Passagens',
        '1':  'Log de Cartões Emitidos & Recargas Efetuadas',
        '2':  'Log de Registro de Ocorrências Rodoviário',
        '3':  'Log de Registro de Ocorrências Semiurbano',
        '4':  'Log de Velocidade Tempo e Localização',
        '5':  'Log de Jornada de Trabalho do Motorista',
        '6':  'Log do Detector de Parada',
        '7':  'Log de Início/Fim de Viagem Regular',
        '8':  'Log de Início/Fim de Viagem Fretamento',
        '9':  'Log do Leitor de Bilhete de Embarque',
        '10': 'Log do Leitor de Cartão RFID'
    }
};

module.exports = () => CONSTANTES;    







 