const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require("cors");
const {Pool} = require('pg')
const app = express()

// import {createPosts} from './public/Javascript/index.js'

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(express.static('public'))

const pool = new Pool({ 
  user: 'postgres',
  host: 'localhost', 
  database: 'postgres',
  password: 'postgres',
  port: 5432, 
});
/*
//create
const insertQuery = `INSERT INTO users (user_name, user_email, user_password_hash, active, role) 
                      VALUES ($1, $2, $3, $4, $5) RETURNING *`
const values = ['admin', 'admin@gmail.com', 'admin', 'false', 'admin']

 pool.query(insertQuery,values,
           (error, results) => {
                 if (error) { throw error; }
                 console.log('User added with ID: ', results.insertId); 
 });
*/
/*
//read
 pool.query('SELECT * FROM users',
            (error, results) => {
                  if (error) { throw error; }
                  console.log('Retrieved users: ', results.rows); 
});
*/
/*
//update
pool.query(`UPDATE users
            SET user_email = $1
            WHERE user_name = $2`,
            ['newjohn@example.com', 'john_doe'],
            (error, results) => {
                  if (error) { throw error; }
                  console.log(`User modified with ID: `, results.insertId); 
});
*/
/*
//delete
 pool.query(`DELETE FROM users
             WHERE user_name = $1`,
              ['hello'],
             (error, results) => {
                   if (error) { throw error; }
                   console.log(`User deleted with ID: `, results.insertId); 
});
*/

 let userGlobal = "?";

// We are using our packages here
app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cors());

//You can use this to check if your server is working
app.get("/home", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/home.html');
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/signup.html');
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/login.html');
});

app.get("/post", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/post.html');
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/about.html');
});


app.get("/chat", (req, res) => {
    if (userGlobal == "?"){
        res.send("Utilizador não autenticado!");
        return;
    }
  res.send("Welcome to the chat server");
});
 
let users = [];
let posts = [];


app.post("/login", (req, res) => {
   const username = req.body.username;
   const password = req.body.password;
   let user = {};
   for (user of users) {
     if (username === user.username) {
       if (password === user.password) {
         userGlobal = user;
         res.end("Login bem sucedido!");
       } else {
         res.end("Password não corresponde!");
       }
       return;
     }
   }
   res.end("Utilizador não encontrado!");
});

app.post("/post", (req, res) => {
  const username = req.body.username;
  // const user_id = pool.query(`SELECT user_id FROM users WHERE user_name = $1`, [username]);
  const user_id = 10
  const title = req.body.title;
  const content = req.body.content

  pool.query(`INSERT INTO posts (user_id, post_title, post_content, post_likes) 
              VALUES ($1, $2, $3, $4) RETURNING *`,
              [user_id, title, content, 0],
              (error, results) => {
              if (error) { throw error;}
                  console.log('User added with ID: ', results.insertId); 
});
  res.sendFile(__dirname + '/public/Templates/index.html');
});

//Route that handles signup logic
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    // const user = { username: username, password: password, email: email};
    // users.push(user);
    pool.query(`INSERT INTO users (user_name, user_email, user_password_hash, active, role) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [username, email, password, 'true', 'normal'],
                (error, results) => {
                if (error) { throw error; }
                    console.log('User added with ID: ', results.insertId); 
});
    // console.log(users);
    res.sendFile(__dirname + '/public/Templates/index.html');
});

const PORTA = process.env.PORT || 8888

app.listen(PORTA, () => {
    console.log(`O servidor está a ouvir na porta http://localhost:${PORTA}/home`)
})

