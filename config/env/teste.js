const config = {
        mysql:{
            host:'localhost',
            username:'root',
            password:'',
            database:'frota_zn4',
            port:3306
    },
        mongodb:{
            url:'mongodb://localhost:27017/m2mfrota'
        }
}

module.exports = () => config