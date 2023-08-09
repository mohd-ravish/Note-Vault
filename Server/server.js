const mysql = require("mysql2");
const cors = require("cors");
const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
// const bcrypt = require('bcrypt');

const app = express();

app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ravish@jmi",
    database: "notevault"
});

// Tables
db.query("create table if not exists users(id int not null primary key AUTO_INCREMENT, username varchar(20) NOT NULL UNIQUE, password varchar(20) NOT NULL);");
db.query("create table if not exists notes(id int not null primary key AUTO_INCREMENT, title varchar(250) NOT NULL, content varchar(500), username varchar(20) NOT NULL, FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE);");

// db.query("create table if not exists users(id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL);");
// db.query("create table if not exists notes(id INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(255) NOT NULL, content TEXT, user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);");

// MySql Connection
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MYSQL CONNECTED")
    }
})

// Signup User
app.post("/signup", async (req, res) => {
    const { username, password, confirmPassword } = req.body;
    // Check if the user already exists in the database
    db.query("SELECT * FROM users WHERE username = ?", [username], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        else if (data.length > 0) {
            return res.json("Failed");
        } else {
            // if (password == confirmPassword) {
            // Hash the password and store the user in the database
            // const hashedPassword = await bcrypt.hash(password, saltRounds);
            db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
            return res.json("Success");
            // } else {
            //     return res.json("PasswordFailed");
            // }
        }
    });
});

// Login User
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    // Fetch the user from the database
    db.query("SELECT * FROM users WHERE username = ?", [username], (err, data) => {
        if (data.length > 0) {
            // Compare the provided password with the hashed password in the database
            if (password == data[0].password) {
                // Generate a JWT token with the user's unique identifier and return it
                const username = data[0].username;
                const token = jwt.sign({ username }, "jwt-secret-key", { expiresIn: "1d" });
                res.cookie("token", token);
                // const token = jwt.sign({ userId: data[0].id }, secretKey);
                return res.json("Success");
            } else {
                return res.json("WrongPassword");
            }
        } else {
            return res.json("InvalidUsername");
        }
    });
});

// Verify User
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ error: "You are not autherized" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ error: "Token is not valid" });
            } else {
                req.username = decoded.username;
                next();
            }
        })
    }
}

app.get("/", verifyUser, (req, res) => {
    return res.json({ status: "success", username: req.username });
})

// Logout
app.get("/logout", (req, res) => {
    res.clearCookie("token");
    return res.json({ status: "success" });
})

// Get Notes
app.get("/note/get", verifyUser, (req, res) => {
    // const token = req.cookies.token;
    db.query("SELECT * FROM notes WHERE username = ?", [req.username], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    });
});

// Insert Note
app.post("/note/insert", verifyUser, async (req, res) => {
    const { title, content } = req.body;
    db.query("INSERT INTO notes (title, content, username) VALUES (?, ?, ?)", [title, content, req.username], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    });
});

// Delete Note
app.delete("/note/delete/:id", verifyUser, (req, res) => {
    const id = req.params.id
    db.query("DELETE * FROM notes WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    });
});

// Server
app.listen(4500, () => {
    console.log("SERVER IS RUNNING ON PORT 4500")
});



// app.post("/signup", (req, res) => {
//     const name = req.body.name
//     const email = req.body.email
//     const password = req.body.password
//     const sqlInsert = "INSERT INTO users(name, email, password) VALUES(?, ?, ?)";
//     db.query(sqlInsert, [name, email, password], (err, result) => {
//         console.log(err)
//     });
// });


// app.post("/login", (req, res) => {
//     const email = req.body.email
//     const password = req.body.password
//     const sqlInsert = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";
//     db.query(sqlInsert, [email, password], (err, data) => {
//         if (err) {
//             return res.json("Error");
//         }
//         else if (data.length > 0) {
//             const c_id = data[0].c_id;
//             const token = jwt.sign({ c_id }, "jwt-secret-key", { expiresIn: "1d" });
//             res.cookie("token", token);
//             return res.json("Success");
//         } else {
//             return res.json("Failed");
//         }
//     });
// });


// const authenticateUser = (req, res, next) => {
//     const token = req.header('x-auth-token');
//     if (!token) {
//         return res.status(401).json({ error: 'Access denied. Token not provided.' });
//     }
//     try {
//         const decoded = jwt.verify(token, secretKey);
//         req.user = decoded; // Save the decoded user information in the request object
//         next();
//     } catch (error) {
//         res.status(401).json({ error: 'Invalid token.' });
//     }
// };


// app.post("/note/insert", verifyUser, (req, res) => {
//     const c_id = req.c_id;
//     const title = req.body.title
//     const content = req.body.content
//     const sqlInsert = "INSERT INTO notes (title, content) VALUES(?, ?)";
//     db.query(sqlInsert, [title, content], (err, result) => {
//         console.log(err)
//     });
// });