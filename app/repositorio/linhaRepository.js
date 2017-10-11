const safira = require('safira');

class LinhaRepository {
    constructor(logger, linha) {
        this._linha = linha;
        this._logger = logger;
    }

    filtrarLinhas(clienteId, numero, dataAtualizacao) {
        let criteria = {};

        if (clienteId && !numero && !dataAtualizacao)
            criteria.clienteId = clienteId;

        if (dataAtualizacao)
            criteria.atualizacao = {"$gte": new Date(dataAtualizacao)};

        if (numero)
            criteria.numero = numero;

        criteria["tags.NAME"] = {"$in": ["FRETADA", "REGULAR", "ALIMENTADORA"]};

        this._logger.info(`LinhaRepository - filtrarLinhas - idCliente: ${clienteId} - numero: ${numero} - dataAtualizacao: ${dataAtualizacao}`);

        return this.prepareResult(criteria, {
            numero: 1,
            descr: 1,
            "trajetos.nome": 1,
            "trajetos.sentido": 1,
            "tags.NAME": 1,
            "_id": 0
        })
    }

    prepareResult(criteria, fields) {
        this._logger.info(`LinhaRepository - prepareResult - criteria: ${criteria} - fields: ${fields}`);
        return this._linha.find(criteria, fields).lean().exec();
    }
}

safira.define(LinhaRepository);

