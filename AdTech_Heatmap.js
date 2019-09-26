




console.log( 'Hello, world!' );

document.write('Hello World')




// replace "toner" here with "terrain" or "watercolor"
var layer = new L.StamenTileLayer("toner");
var mymap = new L.Map("mapid", {
    center: new L.LatLng(39, -97),
    zoom: 4
});
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


function my_add(x, y)
{
  ans = x + y;
  document.write(`The answer is ${ans}`);
}
