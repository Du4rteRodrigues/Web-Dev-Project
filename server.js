const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require("cors");
const {pool} = require('./database')
const fs = require('fs');  
const bcrypt = require('bcryptjs');
const app = express()
const path = require('path');

const PORT = process.env.PORT || 8888

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}));
app.use(cors());

app.get('/home', async (req, res) => {

  pool.query('SELECT * FROM users', (error, results) => {
    if (error) { throw error; }
    console.log('Retrieved users: ', results.rows);

      fs.writeFile('user-data.json', JSON.stringify({ users: results.rows, userCount: results.rowCount}), (writeError) => {
        if (writeError) {
            console.error('Error writing to data.json:', writeError);
            res.status(500).send('Internal Server Error');
        }
    });
});

    pool.query('SELECT posts.* FROM posts JOIN users ON posts.user_id = users.user_id WHERE posts.verified = true AND users.active = true',(error, results) => {
      if (error) { throw error; }
      console.log('Retrieved posts: ', results.rows);

        fs.writeFile('post-data.json', JSON.stringify({ posts: results.rows, postCount: results.rowCount}), (writeError) => {
          if (writeError) {
              console.error('Error writing to data.json:', writeError);
              res.status(500).send('Internal Server Error');
          }
      });
  });
  
  res.sendFile(__dirname + '/public/Templates/home.html');
});

app.post("/home", (req, res) => {
  const postId = req.body.postId;
  const likes = req.body.likes;
  pool.query(`UPDATE posts
              SET post_likes = $1
              WHERE post_id = $2`,
  [likes, postId],
  (error, results) => {
        if (error) { throw error; }
        console.log(`Post modified with ID: `, postId); 
  });

  pool.query('SELECT * FROM posts WHERE verified = true', (error, results) => {
    if (error) { throw error; }
    console.log('Retrieved posts: ', results.rows);

      fs.writeFile('post-data.json', JSON.stringify({ posts: results.rows, postCount: results.rowCount}), (writeError) => {
        if (writeError) {
            console.error('Error writing to data.json:', writeError);
            res.status(500).send('Internal Server Error');
        }
    });
});
});

app.get('/comments', async (req, res) => {

  pool.query('SELECT * FROM users', (error, results) => {
    if (error) { throw error; }
    console.log('Retrieved users: ', results.rows);

      fs.writeFile('user-data.json', JSON.stringify({ users: results.rows, userCount: results.rowCount}), (writeError) => {
        if (writeError) {
            console.error('Error writing to data.json:', writeError);
            res.status(500).send('Internal Server Error');
        }
    });
})

  res.sendFile(__dirname + '/public/Templates/comments.html');
});

app.post('/comments', async (req, res) => {

  const postId = req.body.postId;

  pool.query('SELECT * FROM users', (error, results) => {
    if (error) { throw error; }
    console.log('Retrieved users: ', results.rows);

      fs.writeFile('user-data.json', JSON.stringify({ users: results.rows, userCount: results.rowCount}), (writeError) => {
        if (writeError) {
            console.error('Error writing to data.json:', writeError);
            res.status(500).send('Internal Server Error');
        }
    });
});

    pool.query(`SELECT * FROM posts 
                WHERE post_id = $1`,
    [postId],
    (error, results) => {
      if (error) { throw error; }
      console.log('Retrieved posts: ', results.rows);

        fs.writeFile('post-data.json', JSON.stringify({ posts: results.rows, postCount: results.rowCount}), (writeError) => {
          if (writeError) {
              console.error('Error writing to data.json:', writeError);
              res.status(500).send('Internal Server Error');
          }
      });
  });

      pool.query(`SELECT * FROM comments
                WHERE post_id = $1`,
    [postId],
    (error, results) => {
      if (error) { throw error; }
      console.log('Retrieved comments: ', results.rows);

        fs.writeFile('comment-data.json', JSON.stringify({ comments: results.rows, comCount: results.rowCount}), (writeError) => {
          if (writeError) {
              console.error('Error writing to data.json:', writeError);
              res.status(500).send('Internal Server Error');
          }
      });
  });
  res.redirect('/comments');
});

app.post('/handle-comment', async (req, res) => {
  const comId = req.body.comId
  const type = req.body.action
  const content = req.body.content

  if (type == "edit") {
    pool.query(
      `UPDATE comments
       SET comment_content = $1
       WHERE comment_id = $2`,
      [content,comId],
      (error, results) => {
        if (error) {
          console.error('Error updating post:', error);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(`Post modified with ID: `, comId);
          res.sendFile(__dirname + '/public/Templates/profile.html');
        }
      });
    
  } else {
    pool.query(`DELETE FROM comments
    WHERE comment_id = $1`,
     [comId],
    (error, results) => {
          if (error) { throw error; }
          console.log(`Post deleted with ID: `, results.insertId); });
  }
});

app.post('/save-comment', async (req, res) => {
  const postId = req.body.postId;
  const userId = req.body.userId;
  const contValue = req.body.comContent;

  pool.query(`INSERT INTO comments (post_id, user_id, comment_content) 
              VALUES ($1, $2, $3) RETURNING *`,
              [postId, userId, contValue],
              (error, results) => {
              if (error) { throw error;}
              fs.writeFile('comment-data.json', JSON.stringify({ comments: results.rows, comCount: results.rowCount}), (writeError) => {
                if (writeError) {
                    console.error('Error writing to data.json:', writeError);
                    res.status(500).send('Internal Server Error');
                }
            });
                  console.log('comment saved'); 
});
});

app.get('/profile', async (req, res) => {  
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) { throw error; }
    console.log('Retrieved users: ', results.rows);

      fs.writeFile('user-data.json', JSON.stringify({ users: results.rows, userCount: results.rowCount}), (writeError) => {
        if (writeError) {
            console.error('Error writing to data.json:', writeError);
            res.status(500).send('Internal Server Error');
        }
    });
});


  pool.query('SELECT * FROM posts WHERE verified = true',
               (error, results) => {
      if (error) { throw error; }
      console.log('Retrieved posts: ', results.rows);

        fs.writeFile('post-data.json', JSON.stringify({ posts: results.rows, postCount: results.rowCount}), (writeError) => {
          if (writeError) {
              console.error('Error writing to data.json:', writeError);
              res.status(500).send('Internal Server Error');
          }
      });
  });
  
  res.sendFile(__dirname + '/public/Templates/profile.html');
});

app.post("/profile-post", (req, res) => {
  const postId = req.body.postId;
  const type = req.body.action;
  const title = req.body.title;
  const content = req.body.content;
  console.log("postId: "+postId)
  console.log("type: " + type);

  if (type == "edit") {
    pool.query(
      `UPDATE posts
       SET post_title = $1,
           post_content = $2
       WHERE post_id = $3`,
      [title, content, postId],
      (error, results) => {
        if (error) {
          console.error('Error updating post:', error);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(`Post modified with ID: `, postId);
          res.sendFile(__dirname + '/public/Templates/profile.html');
        }
      });
    
  } else {
    pool.query(
      `DELETE FROM posts
       WHERE post_id = $1`,
      [postId],
      (error, results) => {
        if (error) {
          console.error('Error deleting post:', error);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(`Post deleted with ID: `, postId);
          res.status(200).send('Post deleted successfully');
        }
      }
    );
  }
  
});

app.post("/profile-user", async (req, res) => {
  const salt = await bcrypt.genSalt(10);

  const userId = req.body.userId;
  const type = req.body.action;
  const name = req.body.name;
  const mail = req.body.mail;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, salt)

  if (type == "edit") {
    pool.query(
      `UPDATE users
       SET user_name = $1,
           user_email = $2,
           user_password_hash = $3
       WHERE user_id = $4`,
      [name, mail, hashedPassword, userId],
      (error, results) => {
        if (error) {
          console.error('Error updating post:', error);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(`Post modified with ID: `, userId);
          res.sendFile(__dirname + '/public/Templates/profile.html');
        }
      });
    
  } else {
    pool.query(`DELETE FROM posts
    WHERE user_id = $1`,
     [userId],
    (error, results) => {
          if (error) { throw error; }
          console.log(`Post deleted with ID: `, results.insertId); });
  
    pool.query(`DELETE FROM users
    WHERE user_id = $1`,
     [userId],
    (error, results) => {
          if (error) { throw error; }
          console.log(`Post deleted with ID: `, results.insertId); });
  }
  
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

app.get('/comment-data-json', (req, res) => {
  const filePath = path.join(__dirname, 'comment-data.json');
  
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

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/signup.html');
});

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

app.get("/login", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/login.html');
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

app.get("/post", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/post.html');
});

app.post("/post", async(req, res) => {

  const username = req.body.username;
  const userResult = await pool.query(`SELECT user_id FROM users WHERE user_name = $1`, [username]);
  const user_id = userResult.rows[0].user_id;
  const title = req.body.title;
  const content = req.body.content

  pool.query(`INSERT INTO posts (user_id, post_title, post_content, post_likes, verified) 
              VALUES ($1, $2, $3, $4, $5) RETURNING *`,
              [user_id, title, content, 0, 'false'],
              (error, results) => {
              if (error) { throw error;}
                  console.log('Post saved'); 
});

  res.sendFile(__dirname + '/public/Templates/home.html');
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + '/public/Templates/about.html');
});

app.get("/moderation", (req, res) => {

  pool.query('SELECT * FROM posts', (error, results) => {
      if (error) { throw error; }
      console.log('Retrieved posts: ', results.rows);
        fs.writeFile('post-data.json', JSON.stringify({ posts: results.rows, postCount: results.rowCount}), (writeError) => {
          if (writeError) {
              console.error('Error writing to data.json:', writeError);
              res.status(500).send('Internal Server Error');
          } else {
          }
      });
  });
  res.sendFile(__dirname + '/public/Templates/moderation.html');
});

app.post("/moderation-posts", (req, res) => {
  const postToVerify = req.body.postId;
  const type = req.body.action
  const status = req.body.status
  if(type == "verify"){
    if(!status){
        pool.query(`UPDATE posts
                    SET verified = true
                    WHERE post_id = $1`,
        [postToVerify],
        (error, results) => {
              if (error) { throw error; }
              console.log(`Post added with ID: `, results.insertId); 
        });
    }else{  
        pool.query(`UPDATE posts
                    SET verified = false
                    WHERE post_id = $1`,
        [postToVerify],
        (error, results) => {
              if (error) { throw error; }
              console.log(`Post removed with ID: `, results.insertId); 
    });}

  }else{
    pool.query(`DELETE FROM posts
    WHERE post_id = $1`,
     [postToVerify],
    (error, results) => {
          if (error) { throw error; }
          console.log(`Post deleted with ID: `, results.insertId); });
  }
});

app.post("/moderation-users", (req, res) => {
  const user_id = req.body.userId;
  const type = req.body.action
  const status = req.body.status
  if(type == "verify"){
    if(!status){
        pool.query(`UPDATE users
                    SET active = true
                    WHERE user_id = $1`,
        [user_id],
        (error, results) => {
              if (error) { throw error; }
              console.log(`User unbanned with ID: `, results.insertId); 
        });
    }else{  
        pool.query(`UPDATE users
                    SET active = false
                    WHERE user_id = $1`,
        [user_id],
        (error, results) => {
              if (error) { throw error; }
              console.log(`User banned with ID: `, results.insertId); 
    });}

  }else{
    pool.query(`DELETE FROM posts
    WHERE user_id = $1`,
     [user_id],
    (error, results) => {
          if (error) { throw error; }
          console.log(`Post deleted with ID: `, results.insertId); });
  
    pool.query(`DELETE FROM users
    WHERE user_id = $1`,
     [user_id],
    (error, results) => {
          if (error) { throw error; }
          console.log(`Post deleted with ID: `, results.insertId); });
  }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/home`)
})