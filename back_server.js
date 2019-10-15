
const express = require('express');
const mysql = require('mysql');
const GeoJSON = require('geojson');
const cors = require('cors');

const routes = require("./routes/routes.js");

var app = express();

app.use(express.json());
app.use(cors());                          //this will need playing with
app.use(express.urlencoded({extended: false}));

//tells the server what port to bind to
var server = app.listen(3000, () => {
 console.log('server is running on port', server.address().port);
});

app.use(express.static(__dirname));

//initializes the sql connection there may be a more secure way of dong this
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
});

//connect to sql server
//right now I have a global handle on the sql server Connection
//may want to change that to a per transaction baises
con.connect((err) => {
  if(err)
  {
    console.log('Error connecting to Db');
    return;
  }
  console.log('SQL Connection established');
});

//use the provided routes in the routes dir to handle different calls
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
