const config = {
        mysql:{
            host:'localhost',
            username:'root',
            password:'rodrigo007',
            database:'frota_zn4',
            port:3306
    },
        mongodb:{
            host:'localhost',
            port:'27017',
            database:'m2mfrota'
        }
}

module.exports = () => config