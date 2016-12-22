class LogDTO{
    constructor(){}

    static toDTO(collection,action,data){
        return {
            collection:collection,
            action:action,
            data:data
        }
    }
}

module.exports = () => LogDTO;