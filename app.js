const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const mysql = require('mysql');
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")))
app.get('/' , (req,res) => {
});

app.get('/users/register',(req , res , next) => {
    res.send('Register!');
});
//Database

var db = mysql.createPool({
    host: "remotemysql.com",
    user: 'zgbMbaksOU',
    password: 'SlhDTah15g',
    database: 'zgbMbaksOU',
    port: 3306
  })

app.get('/display/bus' , (req,res) => {
    db.getConnection(function(err) {
        if (err) throw err;
        db.query("SELECT * FROM bus", function (err, result, fields) {
          if (err) throw err;
          res.json(result)
        });
      })});

      app.get('/display/stu' , (req,res) => {
        db.getConnection(function(err) {
            if (err) throw err;
            db.query("SELECT * FROM students", function (err, result, fields) {
              if (err) throw err;
              res.json(result)
            });
          })});

app.get('/add' , (req , res)=>{
    req.body.seats = parseInt(req.body.seats)
    req.body.students = parseInt(req.body.students)
    db.getConnection(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO bus (route , seats , students) VALUES ('"+req.query.route+"',"+req.query.seats+","+req.query.students+")";
        db.query(sql, function (err, result) {
          if (err) throw err;
            res.send("Success")
        });
      });
})
app.get('/stu' , (req , res)=>{
    req.body.seats = parseInt(req.body.seats)
    req.body.students = parseInt(req.body.students)
    db.getConnection(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO students (route , first , last) VALUES ('"+req.query.route+"','"+req.query.seats+"','"+req.query.students+"')";
        db.query(sql, function (err, result) {
          if (err) throw err;
            res.send("Success")
        });
      });
})
app.get('/del' , (req , res)=>{
    req.body.seats = parseInt(req.body.seats)
    req.body.students = parseInt(req.body.students)
    db.getConnection(function(err) {
        if (err) throw err;
        var sql = "DELETE FROM `bus` WHERE `bus`.`id` = "+req.query.id+";";
        db.query(sql, function (err, result) {
          if (err) throw err;
            res.send("Success")
        });
      });
})
app.get('/upd' , (req , res)=>{
    req.body.seats = parseInt(req.body.seats)
    req.body.students = parseInt(req.body.students)
    db.getConnection(function(err) {
        if (err) throw err;
        var sql = "UPDATE `bus` SET `route` = '"+req.query.route+"' WHERE `bus`.`id` = "+req.query.id+";";
        db.query(sql, function (err, result) {
          if (err) throw err;
            res.send("Success")
        });
      });
})

app.listen(port);