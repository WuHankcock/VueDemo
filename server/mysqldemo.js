const mysql = require('mysql');
const Promise = require('es6-promise').Promise;
let result = {
    'pagination':{
        'total':0,
        'per_page':5,
        'last_page':1,
        'from':1,
        'to':5
    },
    'data':[]
};

let mysqlhelper = function () {

    this.eval = function (sql) {

        let promise = new Promise((resolve, reject) => {
            const connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '1234',
                database: 'world'
            });

            connection.connect();

            connection.query(sql, function (error, results) {
                if (error) {
                    reject(error);
                }else{
                    result.pagination.total=results.length;
                    result.data = results;
                    resolve(result);
                }

            });
        });
        return promise;

    }

}

module.exports = new mysqlhelper();