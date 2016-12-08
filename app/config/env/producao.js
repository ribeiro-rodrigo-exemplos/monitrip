module.exports = function(){
    return {
        mysql:{
            url:'172.16.193.32',
            user:'frota',
            password:'frota',
            database:'frota_zn4',
            port:3306
        },
        mongo:{
            url:'mongodb://172.16.193.9:27017/m2mfrota'
        }
    }
}