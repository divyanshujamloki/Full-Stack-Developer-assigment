const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

db.connect((err) => {
  if (err) {
    console.log("error:", err);
  } else {
    console.log("connected successfully");
  }
});

module.exports = db; 
