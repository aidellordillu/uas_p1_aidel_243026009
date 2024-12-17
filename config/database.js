let mysql = require('mysql')

let koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api_aidel_p1'
})

koneksi.connect(function(error) {
    if (!!error) {
        console.log(error)
    } else {
        console.log('Connection Success')
    }
})

module.exports = koneksi;