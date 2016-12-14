const config = {
        mysql:{
            host:'172.16.193.32',
            username:'frota',
            password:'frota',
            database:'frota_zn4',
            port:3306
    },
        mongodb:{
            url:'mongodb://172.16.193.9:27017/m2mfrota'
        },
        sso:{
            url:'http://172.16.196.38:3000'
        }
}

module.exports = () => config