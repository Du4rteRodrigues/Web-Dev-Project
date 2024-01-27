const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require("cors");
const {pool} = require('./database')
const fs = require('fs');  // Include the fs module
const bcrypt = require('bcrypt')
const app = express()
const path = require('path');

const PORT = process.env.PORT || 8888

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/home', async (req, res) => {

  pool.query('SELECT * FROM users', (error, results) => {
    if (error) { throw error; }
    //console.log('Retrieved users: ', results.rowCount);
    console.log('Retrieved users: ', results.rows);

    //fs.writeFile('data.json', JSON.stringify({ rowsCount: results.rowCount }), (writeError) => {
      fs.writeFile('user-data.json', JSON.stringify({ users: results.rows, userCount: results.rowCount}), (writeError) => {
        if (writeError) {
            console.error('Error writing to data.json:', writeError);
            res.status(500).send('Internal Server Error');
        }
    });
});

  pool.query('SELECT * FROM posts WHERE verified = true', (error, results) => {
      if (error) { throw error; }
      //console.log('Retrieved users: ', results.rowCount);
      console.log('Retrieved posts: ', results.rows);

      //fs.writeFile('data.json', JSON.stringify({ rowsCount: results.rowCount }), (writeError) => {
        fs.writeFile('post-data.json', JSON.stringify({ posts: results.rows, postCount: results.rowCount}), (writeError) => {
          if (writeError) {
              console.error('Error writing to data.json:', writeError);
              res.status(500).send('Internal Server Error');
          }
      });
  });
  
  res.sendFile(__dirname + '/public/Templates/home.html');
});


app.get('/user-data-json', (req, res) => {
  const filePath = path.join(__dirname, 'user-data.json');
  
  fs.readFile(filePath, 'utf8', (readError, data) => {
     if (readError) {
        console.error('Error reading data.json:', readError);
        res.status(500).send('Internal Server Error');
     } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
     }
  });
});

app.get('/post-data-json', (req, res) => {
  const filePath = path.join(__dirname, 'post-data.json');
  
  fs.readFile(filePath, 'utf8', (readError, data) => {
     if (readError) {
        console.error('Error reading data.json:', readError);
        res.status(500).send('Internal Server Error');
     } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
     }
  });
});

function deleteAllDataInJson(filePath) {
  // Read the current content of the JSON file
  fs.readFile(filePath, 'utf8', (readError, data) => {
    if (readError) {
      console.error('Error reading file:', readError);
    } else {
      try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Modify the JSON data as needed
        // In this case, setting an empty object
        const newData = {};

        // Write the modified data back to the file
        fs.writeFile(filePath, JSON.stringify(newData), 'utf8', (writeError) => {
          if (writeError) {
            console.error('Error writing to file:', writeError);
          } else {
            console.log('Data in the file has been deleted.');
          }
        });
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
      }
    }
  });
}

//create
/*
const insertQuery = `INSERT INTO users (user_name, user_email, user_password_hash, active, role) 
                      VALUES ($1, $2, $3, $4, $5) RETURNING *`
const values = ['admin', 'admin@gmail.com', 'admin', 'false', 'admin']

 pool.query(insertQuery,values,
           (error, results) => {
                 if (error) { throw error; }
                 console.log('User added with ID: ', results.insertId); 
 });
/*
const insertQuery = `INSERT INTO posts (user_id, post_title, post_content, post_likes, verified) 
                      VALUES ($1, $2, $3, $4, $5) RETURNING *`
const values = ['40', 'to-validate', 'this content should be validated', 10, 'true']

 pool.query(insertQuery,values,
           (error, results) => {
                 if (error) { throw error; }
                 console.log('Post logged: ', results.insertId); 
 });
*/

//read
/*
 pool.query('SELECT * FROM users',
            (error, results) => {
                  if (error) { throw error; }
                  console.log('Retrieved users: ', results.rows); 
});
*/

//update
/*
pool.query(`UPDATE users
            SET user_email = $1
            WHERE user_name = $2`,
            ['newjohn@example.com', 'john_doe'],
            (error, results) => {
                  if (error) { throw error; }
                  console.log(`User modified with ID: `, results.insertId); 
});

*/
//delete
/*
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


app.get("/signup", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/signup.html');
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/login.html');
});

app.get("/poster", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/poster.html');
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/about.html');
});

app.get("/moderation", (req, res) => {
  //deleteAllDataInJson('post-data.json')

  pool.query('SELECT * FROM posts WHERE verified = false', (error, results) => {
      if (error) { throw error; }
      //console.log('Retrieved users: ', results.rowCount);
      console.log('Retrieved posts: ', results.rows);

      //fs.writeFile('data.json', JSON.stringify({ rowsCount: results.rowCount }), (writeError) => {
        fs.writeFile('post-data.json', JSON.stringify({ posts: results.rows, postCount: results.rowCount}), (writeError) => {
          if (writeError) {
              console.error('Error writing to data.json:', writeError);
              res.status(500).send('Internal Server Error');
          } else {
              // Send a success message to the client
              //res.sendFile(__dirname + '/public/Templates/home.html');
              
          }
      });
  });
  res.sendFile(__dirname + '/public/Templates/moderation.html');
});

app.post("/moderation", (req, res) => {
  const postToVerify = req.body.postId;
  const type = req.body.action
  if(type == "verify"){
  pool.query(`UPDATE posts
              SET verified = true
              WHERE post_id = $1`,
  [postToVerify],
  (error, results) => {
        if (error) { throw error; }
        console.log(`Post modified with ID: `, results.insertId); 
  });
  }else{
    pool.query(`DELETE FROM posts
    WHERE post_id = $1`,
     [postToVerify],
    (error, results) => {
          if (error) { throw error; }
          console.log(`User deleted with ID: `, results.insertId); });
  }
});

app.get("/chat", (req, res) => {
    if (userGlobal == "?"){
        res.send("Utilizador não autenticado!");
        return;
    }
  res.send("Welcome to the chat server");
});
 
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
 
  pool.query('SELECT * FROM users WHERE user_name = $1'
              ,[username], async (error, results) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.rows.length === 0) {
      console.log("User not found");
      return;
    }

    const user = results.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.user_password_hash);

    if (passwordMatch) {
      userGlobal = user;
      res.sendFile(__dirname + '/public/Templates/home.html');
    } else {
      console.log("Password does not match");
      return;
    }
  });
});
  

app.post("/post", (req, res) => {
  const username = req.body.username;
  const user_id = pool.query(`SELECT user_id FROM users WHERE user_name = $1`, [username]);
  const title = req.body.title;
  const content = req.body.content

  pool.query(`INSERT INTO posts (user_id, post_title, post_content, post_likes) 
              VALUES ($1, $2, $3, $4) RETURNING *`,
              [user_id, title, content, 0],
              (error, results) => {
              if (error) { throw error;}
                  console.log('Post saved'); 
});

  res.sendFile(__dirname + '/public/Templates/home.html');

});

//Route that handles signup logic
app.post("/signup", async (req, res) => {
  try{
    const salt = await bcrypt.genSalt(10);
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword)


    pool.query(`INSERT INTO users (user_name, user_email, user_password_hash, active, role) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                [username, email, hashedPassword, 'true', 'normal'],
                (error, results) => {
                if (error) { throw error; }
                    console.log('User added with ID: ', results.insertId); });

    res.sendFile(__dirname + '/public/Templates/home.html');
  } catch{
    res.status(500).send()
  }

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/home`)
})

