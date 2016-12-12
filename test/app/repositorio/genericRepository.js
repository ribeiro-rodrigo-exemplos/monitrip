class GenericRepository{
    
    constructor(ModelClass){
        this.ModelClass = ModelClass;
    }

    prepareResult(criteria){
        return new Promise((resolve,reject) => 
            this.ModelClass.find({where:criteria},(err,result) => 
                this._prepare(err,(result && result.length==0 ? null:result),resolve,reject))
        );
    }

    prepareUniqueResult(criteria){
        return new Promise((resolve,reject) => 
            this.ModelClass.findOne({where:criteria},(err,result) => this._prepare(err,result,resolve,reject))
        );
    }

    _prepare(err,result,resolve,reject){
        if(err)
            reject(err);
        else
            resolve(result ? result:null);
    }
}

module.exports = () => GenericRepository