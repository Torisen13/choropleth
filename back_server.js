const mysql = require('mysql');
const GeoJSON = require('geojson');

// First you need to create a connection to the db
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
  console.log('Connection established');
});

let query_string = "SELECT f.GEOID, s.TOT_POP, f.GEOMETRY \
                    FROM \
                    ( \
                      SELECT GEOID, ST_ASTEXT(shape) AS GEOMETRY \
                      FROM census_info.county_shp \
                      WHERE \
		                  (\
                        statefp = 13 OR \
                        statefp = 01 OR \
                        statefp = 28 OR \
                        statefp = 47\
                      ) \
                    ) AS f \
                    INNER JOIN \
                    ( \
                     SELECT CONCAT(state, county) AS GEOID, CAST(SUM(TOT_POP) AS SIGNED) AS TOT_POP \
                     FROM census_info.county_pop_est \
                     WHERE  \
  	                   ( \
  	                      STATE = 01 OR  \
                          STATE = 28 OR  \
                          STATE = 13 OR  \
                          STATE = 47 \
                      ) AND  \
                      (AGEGRP = 0) AND  \
                      YEAR = 11 \
                    GROUP BY GEOID \
                    ) AS s \
                    ON f.GEOID = s.GEOID";

con.query(query_string, (err,rows) => {
  if(err) throw err;


  let test = GeoJSON.parse(rows, {Polygon: "GEOMETRY"});
  var resultArray = Object.values(JSON.parse(JSON.stringify(rows)))
  console.log('Data received from Db:\n');
  console.log(JSON.stringify(test));
});

con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});
