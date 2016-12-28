const config = {
        mysql:{
            host:'localhost',
            username:'root',
            password:'',
            port:3306,
            databases:{
                frota:'frota_zn4',
                sso:'sso'
            }
    },
        mongodb:{
            url:'mongodb://localhost:27017/m2mfrota'
        },
        sso:{
            url:'http://10.0.1.165:3000'
        },
        amqp:{
            url:'amqp://localhost',
            queue:'SERVICOONLINE'
        }
}

module.exports = () => config