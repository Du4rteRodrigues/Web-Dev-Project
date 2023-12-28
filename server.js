const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(express.static('public'))

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
app.get("/", (req, res) => {
  res.send("Welcome to your server");
});

app.get("/chat", (req, res) => {
    if (userGlobal == "?"){
        res.send("Utilizador não autenticado!");
        return;
    }
  res.send("Welcome to the chat server");
});

let users = [];


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

//Route that handles signup logic
app.post("/signup", (req, res) => {
    const fullname = req.body.fullname;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const user = { fullname: fullname, username: username, password: password, email: email};
    users.push(user);
    console.log(users);
    res.end("Registo recebido");
  });

const PORTA = process.env.PORT || 8888

app.listen(PORTA, () => {
    console.log(`O servidor está a ouvir na porta http://localhost:${PORTA}`)
})

