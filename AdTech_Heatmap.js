
class AdTech_Heatmap
{
  constructor(map_id, zip_list)
  {
    this.map_id = map_id
    this.zip_list = zip_list
  }

  build_map()
  {
    let layer = new L.StamenTileLayer("toner");
    let mymap = L.map('mapid').setView([37.4, -97], 4);
    mymap.addLayer(layer);
  }

  add_choropleth_layer(request)
  {
    let getPopData = function(demo)
    {
      const column_name = {
        'ball': 'CAST(SUM(TOT_POP) AS SIGNED) AS TOT_POP',
        'fall': 'CAST(SUM(TOT_FEMALE) AS SIGNED) AS TOT_FEMALE',
        'mall': 'CAST(SUM(TOT_MALE) AS SIGNED) AS TOT_MALE',
        'bwh': 'CAST(SUM(WAC_FEMALE) AS SIGNED) + CAST(SUM(WAC_MALE) AS SIGNED) AS WAC_BOTH',
        'fwh': 'CAST(SUM(WAC_FEMALE) AS SIGNED) AS WAC_FEMALE',
        'mwh': 'CAST(SUM(WAC_MALE) AS SIGNED) AS WAC_MALE',
        'bbl': 'CAST(SUM(BAC_FEMALE) AS SIGNED) + CAST(SUM(BAC_MALE) AS SIGNED) AS BAC_BOTH',
        'fbl': 'CAST(SUM(BAC_FEMALE) AS SIGNED) AS BAC_FEMALE',
        'mbl': 'CAST(SUM(BAC_MALE) AS SIGNED) AS BAC_MALE',
        'bas': 'CAST(SUM(AAC_FEMALE) AS SIGNED) + CAST(SUM(AAC_MALE) AS SIGNED) AS AAC_BOTH',
        'fas': 'CAST(SUM(AAC_FEMALE) AS SIGNED) AS AAC_FEMALE',
        'mas': 'CAST(SUM(AAC_MALE) AS SIGNED) AS AAC_MALE',
        'bhi': 'CAST(SUM(H_FEMALE) AS SIGNED) + CAST(SUM(H_MALE) AS SIGNED) AS H_BOTH',
        'fhi': 'CAST(SUM(H_FEMALE) AS SIGNED) AS H_FEMALE',
        'mhi': 'CAST(SUM(H_MALE) AS SIGNED) AS H_MALE'
      };
      return column_name[demo];
    }

    console.log("Working on new choropleth\n");
    let data_set = request.shift();
    let query = "";

    switch(data_set)
    {
      case "pop_county":
        console.log("Using census_info.county_pop_est");
        let demo = request.shift();
        let gen_race = getPopData(demo);
        console.log(gen_race);
        let name = getName(gen_race);
        console.log(gen_race);
        console.log(name);
        let where_state =  multGen("STATE", request.pop());
        console.log(where_state);
        let where_age = multGen("AGEGRP", request.pop());
        console.log(where_age);
        query = `SELECT CONCAT(state, county) AS GEOID, ${gen_race}
        FROM census_info.county_pop_est
        WHERE ${where_state} AND ${where_age} AND ${request[0]}
        GROUP BY GEOID;`;
        console.log(query);

        break;

      case "2":
        break;

      default:
        console.log("This isn't where I parked my car!");
    }
  }


}


function getName(words)
{
  var n = words.split(" ");
  return n.pop();
}


function multGen(header, values)
{
  ret = "(";
  for(value of values)
  {
    ret = `${ret}${header}=${value} OR `;
  }
  ret = ret.slice(0, -4) + ")";
  return ret;
}

function _build_map()
{
  let layer = new L.StamenTileLayer("toner");
  let mymap = L.map('mapid').setView([39, -97], 4);
  mymap.addLayer(layer);


  //Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.
  //var mymap = L.map('mapid').setView([39, -97], 4);
  //L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  //		maxZoom: 18,
  //		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
  //			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  //			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //		id: 'mapbox.streets'
  //	}).addTo(mymap);

  //return mymap;
}

/*
SELECT
    CONCAT(state, county) AS GEOID,
    CAST(SUM(H_FEMALE) AS SIGNED) AS H_FEMALE,
    CAST(SUM(H_MALE) AS SIGNED) AS H_MALE,
    CAST(SUM(H_FEMALE) AS SIGNED) + CAST(SUM(H_MALE) AS SIGNED) AS H_BOTH
FROM
    census_info.county_pop_est
WHERE
    (STATE = 47 OR STATE = 01 OR STATE = 28
        OR STATE = 13)
      AND YEAR = 11
      AND (AGEGRP = 5 OR AGEGRP = 6)
GROUP BY GEOID;'*/
