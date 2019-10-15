class AdTech_Heatmap
{
  constructor(map_id, zip_list)
  {
    this.map = L.map(map_id).setView([37.4, -97], 4);
    this.map_id = map_id;
    this.zip_list = zip_list;
    this.build_map();
  }

  build_map()
  {
    let layer = new L.StamenTileLayer("toner");
    this.map.addLayer(layer);
  }

  add_shape_layer(request)
  {

  }

  add_zip_list_layer(request)
  {

  }

  async add_choropleth_layer(request)
  {
    const data = await requestData(this.map, request)

    //there is a more elagent way of doing these...
    let max = -10000000;
    for (var i=0 ; i<data.features.length ; i++) {
        max = Math.max(parseInt(data.features[i]["properties"]['POP']), max);
    }
    console.log('max: '+max);

    let min = 10000000;
    for (var i=0 ; i<data.features.length ; i++) {
        min = Math.min(parseInt(data.features[i]["properties"]['POP']), min);
    }
    console.log('min: '+min);




    
  }
}

//Live version of the data request function
//uses async/await with fetch to make the http call
//compatability issues may arise since this language is not supported in older browsers
//solutions include using bable or XMLHttpRequest
async function requestData(leafletMap, request)
{
  let url = "http://10.0.2.15:3000/" + request.pop();
  const data = JSON.stringify({
    "sexrace": request.pop(),
    "year": request.pop(),
    "age": request.pop(),
    "state": request.pop()
  });

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
