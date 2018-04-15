var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_moji',
  password        : '4085',
  database        : 'cs340_moji'
});
module.exports.pool = pool;
