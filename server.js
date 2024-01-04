const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require("cors");
const {Pool} = require('pg')
const app = express()

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

//create
const insertQuery = `INSERT INTO users (user_name, user_email, user_password_hash, active, role) 
                      VALUES ($1, $2, $3, $4, $5) RETURNING *`
const values = ['john_doe', 'john@example.com', '123', 'true', 'normal']

 pool.query(insertQuery,values,
           (error, results) => {
                 if (error) { throw error; }
                 console.log('User added with ID: ', results.insertId); 
 });

//read
 pool.query('SELECT * FROM users',
            (error, results) => {
                  if (error) { throw error; }
                  console.log('Retrieved users: ', results.rows); 
});

//update
pool.query(`UPDATE users
            SET user_email = $1
            WHERE user_name = $2`,
            ['newjohn@example.com', 'john_doe'],
            (error, results) => {
                  if (error) { throw error; }
                  console.log(`User modified with ID: `, results.insertId); 
});

//delete
 pool.query(`DELETE FROM users
             WHERE user_name = $1`,
              ['john_doe'],
             (error, results) => {
                   if (error) { throw error; }
                   console.log(`User deleted with ID: `, results.insertId); 
});

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
  res.sendFile(__dirname + '/public/Templates/index.html');
});

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/signup.html');
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/login.html');
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/home.html');
});

app.get("/poster", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/poster.html');
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
        res.sendFile(__dirname + '/public/Templates/home.html');

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
  const title = req.body.title;
  const content = req.body.content
  const post = { username: username, title: title, content: content};
  posts.push(post);
  console.log(posts);

  res.sendFile(__dirname + '/public/Templates/home.html');

  res.sendFile(__dirname + '/public/Templates/index.html');

});

//Route that handles signup logic
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const user = { username: username, password: password, email: email};
    users.push(user);
    console.log(users);

    res.sendFile(__dirname + '/public/Templates/index.html');
  });



const PORTA = process.env.PORT || 8888

app.listen(PORTA, () => {
    console.log(`O servidor está a ouvir na porta http://localhost:${PORTA}/home`)
})

