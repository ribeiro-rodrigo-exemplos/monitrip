class GenericRepository{
    
    constructor(connection){
        this._connection = connection;
    }

    prepareResult(query,params){
        return new Promise((resolve,reject) => 
            this._connection.query(query,params,(erro,result) => this.prepare(erro,result,resolve,reject))
        );
    }

    prepare(err,result,resolve,reject){
        if(err)
            reject(err);
        else
            resolve(result ? result:null);
    }
}

module.exports = () => GenericRepository