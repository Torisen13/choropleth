const mysql = require('mysql');
const wk = require('wellknown');
const GeoJSON = require('geojson');
const tools = require('../resources/tools');

var appRouter = function (app, con) {

//handles get requests to "domain/pop_county"
 app.get("/pop_county", function (req, res) {
   var data = ({
     Population: 1100889,
     State: 'Georgia',
     County: 'Blythe',
     geometry: "Look at me I am a shape"
   });
   console.log("Got GET Request");
   res.status(200).send(data);
 });

//handles post request to "domain/pop_county"
//this makes the SQL query and calls it then returns the table
 app.post("/pop_county", function (req, res) {

   //start building out my reply
   //Building SQL request query
   query_string = pop_build_query(req.body);

   con.query(query_string, (err,rows) => {
     if(err)
     {
       res.status(500).send(err);
       throw err;
     }
     let test = GeoJSON.parse(rows, {Polygon: "GEOMETRY"});
     console.log('Data received from Db:\n');
     for(var i=0; i<test.features.length; i++)
     {
       test.features[i].geometry = wk.parse(test.features[i].geometry.coordinates);
     }
     //console.log(test.features[0].geometry.coordinates);
     res.status(200).send(test);
   });
 });


//handles post request to "domain/pop_county"
//this makes the SQL query and calls it then returns the table
app.post("/zip_codes", function (req, res) {

  //start building out my reply
  //Building SQL request query
  query_string = pop_build_query(req.body);

  con.query(query_string, (err,rows) => {
    if(err)
    {
      res.status(500).send(err);
      throw err;
    }
    let test = GeoJSON.parse(rows, {Polygon: "GEOMETRY"});
    console.log('Data received from Db:\n');
    for(var i=0; i<test.features.length; i++)
    {
      test.features[i].geometry = wk.parse(test.features[i].geometry.coordinates);
    }
    //console.log(test.features[0].geometry.coordinates);
    res.status(200).send(test);
  });
});
}

module.exports = appRouter;

//helper function that builds the population query
function pop_build_query(request)
{
  //get the type of population requested
  let pop_type = tools.getPopData(request.sexrace);
  if(pop_type === null)
  {
    console.log("Bad Race/Gender");
    return null;
  }
  h_name = getName(pop_type);

  //get the states requested
  let where_state =  multGen("STATE", request.state, tools.get_us_num_from_state);
  if(where_state === null)
  {
    console.log("Bad State");
    return null;
  }

  //get the states requested
  let where_statefp =  multGen("STATEFP", request.state, tools.get_us_num_from_state);
  if(where_statefp === null)
  {
    console.log("Bad State");
    return null;
  }

  //Get the age groups
  let where_age = multGen("AGEGRP", request.age, tools.verify_age);
  if(where_age === null)
  {
    console.log("Bad Age Group");
    return null;
  }

  //verify the year
  where_year = tools.verify_year(request.year);
  if(where_year === null)
  {
    console.log("Bad Year");
    return null;
  }


  //generate query string
  let query_string =
`SELECT f.GEOID, s.POP, f.GEOMETRY
FROM (
  SELECT GEOID, ST_ASTEXT(shape) AS GEOMETRY
  FROM census_info.county_shp
  WHERE ${where_statefp})
AS f
INNER JOIN (
  SELECT CONCAT(state, county) AS GEOID, ${pop_type}
  FROM census_info.county_pop_est
  WHERE ${where_state} AND
    ${where_age} AND
    YEAR = ${where_year}
  GROUP BY GEOID)
AS s
ON f.GEOID = s.GEOID;`;

  return query_string;
}

//helper function that returns the last word in a string
function getName(words)
{
  var n = words.split(" ");
  return n.pop();
}

//helper function that will break down an array and return a string with
//each element of the array chained together with ORs
function multGen(header, values, conversion)
{
  ret = "(";
  for(value of values)
  {
    if(conversion)
    {
      value = conversion(value.toUpperCase());
      if(value === null)
      {return null;}
    }
    ret = `${ret}${header}=${value} OR `;
  }
  ret = ret.slice(0, -4) + ")";
  return ret;
}
