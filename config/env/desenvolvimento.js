const config = {
        mysql:{
            host:'172.16.193.32',
            username:'frota',
            password:'frota',
            port:3306,
            databases:{
                frota:'frota_zn4',
                sso:'sso'
            }
    },
        mongodb:{
            url:'mongodb://172.16.193.9:27017/m2mfrota'
        },
        sso:{
            url:'http://10.0.1.165:3000'
        },
        amqp:{
            url:'amqp://admin:admin@172.16.193.13',
            queue:'SERVICOONLINE'
        }
}

module.exports = () => config