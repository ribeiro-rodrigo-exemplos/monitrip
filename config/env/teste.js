const config = {
        mysql:{
            host:'localhost',
            username:'root',
            password:'rodrigo007',
            database:'frota_zn4_teste',
            port:3306
    },
        mongodb:{
            url:'mongodb://localhost:27017/m2mfrota'
        }
}

module.exports = () => config