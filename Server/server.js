const mysql = require("mysql2");
const cors = require("cors");
const express = require("express")
const bodyParser = require("body-parser")

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ravish@jmi",
    database: "notevault"
});

db.query("create table if not exists notes(c_id int not null primary key auto_increment, title varchar(250), content varchar(5000));");
db.query("create table if not exists users(c_id int not null primary key auto_increment, name varchar(20), email varchar(50), password varchar(20));");

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MYSQL CONNECTED")
    }
})

app.post("/signup", (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const sqlInsert = "INSERT INTO users(name, email, password) VALUES(?, ?, ?)";
    db.query(sqlInsert, [name, email, password], (err, result) => {
        console.log(err)
    });
});

app.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const sqlInsert = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";
    db.query(sqlInsert, [email, password], (err, data) => {
        if(err){
            return res.json("Error");
        }
        else if(data.length > 0){
            return res.json("Success");
        } else{
            return res.json("Failed");
        }
    });
});

app.post("/note/insert", (req, res) => {

    const title = req.body.title
    const content = req.body.content

    const sqlInsert = "INSERT INTO notes (title, content) VALUES(?, ?)";
    db.query(sqlInsert, [title, content], (err, result) => {
        console.log(err)
    });
});

app.get("/note/get", (req, res) => {

    const sqlSelect = "SELECT * FROM notes";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    });
});

app.delete("/note/delete/:c_id", (req, res) => {
    const c_id = req.params.c_id
    const sqlDelete = "DELETE FROM notes WHERE c_id = ?";
    db.query(sqlDelete, c_id, (err, result) => {
        console.log(err)
    });
});

app.listen(4500, () => {
    console.log("SERVER IS RUNNING ON PORT 4500")
});