class AdTech_Heatmap
{
  constructor(map_id, zip_list)
  {
    this.map = L.map(map_id).setView([37.4, -97], 4);
    this.map_id = map_id;
    this.zip_list = zip_list;
    this.build_map();
  }

  //method for displaying the basic map
  build_map()
  {
    let layer = new L.StamenTileLayer("toner");
    this.map.addLayer(layer);
  }

  //method for adding in a new shape layer zip codes cong. dist etc.
  async add_shape_layer(request)
  {
    let url = "http://10.0.2.15:3000/" + request.pop();
    let st_data = JSON.stringify({
      "state": request.pop(),
      "test": 'test'
    });
    let shp_data = await requestData(url, st_data);
    console.log(shp_data);

    let highlight = getLineColor(this.zip_list);

    function style(feature)
    {
  		return {
  			weight: 1,
  			opacity: 1,
  			color: highlight(feature.properties.ZIP),
  			fillOpacity: 0.7,
  			fillColor: '#00000000'
	    };
    }

    let zips = L.geoJson(shp_data, {style: style,});

    let zip_map = new L.FeatureGroup();

    zip_map.addLayer(zips);

    this.map.on('zoomend', function() {
        if (this.getZoom() <9){
                this.removeLayer(zip_map);
        }
        else {
                this.addLayer(zip_map);
            }
    });

  }

  //method for adding a zip list layethis.r
  add_zip_list_layer(request)
  {

  }

  //method for adding in a new choropleth layer
  //@param request is an array consisting of:
  // request = [[state1, state2, ..], [age1, age2, ..], year, sex+race, data_set]
  async add_choropleth_layer(request)
  {
    let url = "http://10.0.2.15:3000/" + request.pop();
    let pleth_data = JSON.stringify({
      "sexrace": request.pop(),
      "year": request.pop(),
      "age": request.pop(),
      "state": request.pop()
    });
    const data = await requestData(url, pleth_data);
    console.log(data);

    //there is a more elagent way of doing these...
    let max = -10000000;
    for (var i=0 ; i<data.features.length ; i++) {
        max = Math.max(parseInt(data.features[i]["properties"]['POP']), max);
    }

    let min = 10000000;
    for (var i=0 ; i<data.features.length ; i++) {
        min = Math.min(parseInt(data.features[i]["properties"]['POP']), min);
    }

    let fillFunction = getFillColor(min, max);

    function style(feature)
    {
  		return {
  			weight: 1,
  			opacity: 1,
  			color: '00000000',
  			fillOpacity: 0.5,
  			fillColor: fillFunction(feature.properties.POP)
	    };
    }

    var choropleth = L.geoJson(data, {style: style,}).addTo(this.map);
  }
}

function getFillColor(min, max)
{
  interval = Math.floor((max-min)/5);

  return (x) =>
    {return   x > interval*4 ? '#bd0026' :
             x > interval*3 ? '#f03b20' :
             x > interval*2 ? '#fd8d3c' :
             x > interval   ? '#fecc5c' :
						 x > 0          ? '#ffffb2' :
                 							'#ffffff';
    };
}



function getLineColor(list)
{
  return (x) =>
    {
      if(list.includes(x))
      {
        return 'blue';
      }
      return '#696969';
    }
}

//may need an object that resolves strings to function pointers

//Live version of the data request function
//uses async/await with fetch to make the http call
//compatability issues may arise since this language is not supported in older browsers
//solutions include using bable or XMLHttpRequest
//@param request the same request as above
async function requestData(url, data)
{

  const fetch_opts = {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: data
  };

  let req_data = await fetch(url, fetch_opts);
  req_data = await req_data.json();
  return req_data;
}

//Stub of a function to retrive the SQL data from backend
//it just requests and displays it does not return
//if browser compatability issues arise this will be a good canidate
function _requestData(mapid, request)
{
  let xhr = new XMLHttpRequest();
  let url = "http://10.0.2.15:3000/" + request.pop();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          let json = JSON.parse(xhr.responseText);
          console.log(json.State + ", " + json.County + ", " + json.geometry);
      }
  };
  var data = JSON.stringify({
    "sexrace": request.pop(),
    "year": request.pop(),
    "age": request.pop(),
    "state": request.pop()
  });
  xhr.send(data);
}






/* test code for making shapes only show at certin zoom lvls
var shelter1 = L.marker([55.08, 11.62], {icon: shelterIcon});

var shelterMarkers = new L.FeatureGroup();

shelterMarkers.addLayer(shelter1);

map.on('zoomend', function() {
    if (map.getZoom() <7){
            map.removeLayer(shelterMarkers);
    }
    else {
            map.addLayer(shelterMarkers);
        }
});
*/





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
