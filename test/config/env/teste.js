const config = {
        mysql:{
            host:'localhost',
            username:'root',
            password:'rodrigo007',
            database:'frota_zn4_teste',
            port:3306
    },
        mongodb:{
            host:'localhost',
            port:'27017',
            database:'test'
        }
}

module.exports = () => config