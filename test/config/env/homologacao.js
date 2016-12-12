const config = {
        mysql:{
            host:'172.16.193.32',
            username:'frota',
            password:'frota',
            database:'frota_zn4',
            port:3306
    },
        mongodb:{
            host:'172.16.193.9',
            port:'27017',
            database:'m2mfrota'
        }
}


module.exports = () => config