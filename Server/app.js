const mysql = require("mysql2");
const cors = require("cors");
const express = require("express")
const bodyParser = require("body-parser")

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ravish@jmi",
    database: "notevault"
});

connection.query("create table if not exists Notes(c_id int not null primary key auto_increment,title varchar(250),content varchar(500));");

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MYSQL CONNECTED")
    }
})

app.post("/", (req, res) => {

    const title = req.body.title
    const content = req.body.content

    const sqlInsert = "INSERT INTO notes (title, content) VALUES(?, ?)";
    connection.query(sqlInsert, [title, content], (err, result) => {
        console.log(result)
    });
});

app.get("/", (req, res) => {

    const sqlSelect = "SELECT * FROM notes";
    connection.query(sqlSelect, (err, result) => {
        res.send(result)
    });
});

app.delete("/:title", (req, res) => {
    const title = req.params.title
    const sqlDelete = "DELETE FROM notes WHERE title = ?";
    connection.query(sqlDelete, title, (err, result) => {
        console.log(err)
    });
});

app.listen(4500, () => {
    console.log("Server is running on port 4500")
});