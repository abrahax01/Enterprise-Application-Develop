const mysql = require("mysql2")
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const cors = require('cors')

// Start bastion host
// key = process.env.EC2KEY
// command = ssh -i process.env.EC2KEY process.env.EC2USER@process.env.EC2IP -L process.env.PORT:process.env.RDS:process.env.PORT2 -N

// const { exec } = require("child_process")

{/* exec('dir', (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`)
        return
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
    }
    console.log(`stdout: ${stdout}`)
}) */}


// server on port
const PORT = process.env.SERVERPORT
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" })
  })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ['GET', 'POST'],
    credentials: true,
  })
)

// DB connection 
var con = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

// Db table + insertion
con.connect(function(err) {
  if (err) throw err
  console.log("Connected!")
  var db = "CREATE DATABASE IF NOT EXISTS userLogin"
  con.query(db, function (err, result) {
    if (err) throw err
    console.log("db created")
  })
})

// register 
app.post('/register', (req, res) => {
  // const username = req.body.username
  // destructuring
  const password = req.body.password
  const email = req.body.email

  con.execute("INSERT INTO login (email, password) VALUES (?, ?)", 
  [email, password], 
  (err, result) => {
    if (err) {res.send({err})}
    else {res.send(result)}
  })
})

app.post('/login', (req,res) => {
  // const username = req.body.username
  const password = req.body.password
  const email = req.body.email

  con.execute("SELECT * FROM login WHERE email = ? AND password = ?", 
  [email, password], 
  (err,result) => {
    if (err) {res.send({err})}
    else {res.send(result)}
    // validate
  })
})

  //  var table = "CREATE TABLE IF NOT EXISTS login (id int NOT NULL AUTO_INCREMENT, username VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY (id))"
  //  con.query(table, function (err, result) {
  //   if (err) throw err
  //   console.log("table created")
  // })

  // var insert = "INSERT INTO login (id, username, password, email) VALUES (1, 'Abe', '1234', 'abe@email.com')"
  // con.query(insert, function (err, result) {
  //   if (err) throw err
  //   console.log("1 record inserted")
  // })
// })
