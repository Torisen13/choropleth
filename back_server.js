
const express = require('express');
const mysql = require('mysql');
const GeoJSON = require('geojson');
const cors = require('cors');

const routes = require("./routes/routes.js");

var app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));


var server = app.listen(3000, () => {
 console.log('server is running on port', server.address().port);
});

app.use(express.static(__dirname));

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
});

con.connect((err) => {
  if(err)
  {
    console.log('Error connecting to Db');
    return;
  }
  console.log('SQL Connection established');
});


routes(app, con);

/*
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "demo_post.asp", true);
  xhttp.send();
  */
