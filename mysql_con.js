const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database : "node_todo_api"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

exports.CON = con;