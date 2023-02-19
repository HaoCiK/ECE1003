//assigning the map access key
mapboxgl.accessToken = "pk.eyJ1IjoibGVleXVuaGFvIiwiYSI6ImNrYWFpeXpmbjB0bHYyemw1eWtzY2JyMGgifQ.wlZodRo8rGyBlcw5n1k4JA";

//assigning the username and key for darksky api
  let USERNAME="ylee0058";
  let DARKSKY_KEY="37f2ab5373b75ecbd48d370b5631033c";

//get weather data function which will retrive the weather data from DarkSky API
  function getWeatherData(lat,lng,callback)
  {
    let inputDateString = routes.departureDate; //getting the date string set by the user
    let inputDate = new Date(inputDateString); //converting the date string to a date format
    let inputTimeStamp = Math.floor(inputDate.getTime() / 1000) //changing the date to a Unix time stamp format
    let url = "https://eng1003.monash/api/v1/darksky/"; //initialize the url
    let data = {
    u: USERNAME,
    key: DARKSKY_KEY,
    lat: lat,
    lng: lng,
    time:inputTimeStamp,
    callback:callback
    }
    webServiceRequest(url,data); //accessing the webServiceRequest function to generate the query string

  }

  function departureWeatherCallback(weather) //callback function
  {
    routes.departureWeather = weather.daily.data[0]; //store the weather data of the user input date to the departureWeather attribute
    if(weather.daily.data[0].summary==undefined) //we found out that when the date exceed 7 days, darksky api would not be giving the weather summary for that particular date.
    {
      alert("No Weather Forecast Data Available for the Scheduled Date!") // alert the user that there is no weather summary for the scheduled date
    }
  }

  function arrivalWeatherCallback(weather) //callback function
  {
    routes.arrivalWeather = weather.daily.data[0];//store the weather data of the user input date to the arrivalWeather attribute
    displayRouteInfo(routes); //caliling the displayRouteInfo function
    displayMap(); //calling the map function
  }

function displayMap() //function to display the map
{
  let map1 = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
      center: [108.195002,3.675176], // starting position [lng, lat]
      zoom: 4 // starting zoom
    });
  let marker1=[]; //initialize the marker
  for(let i=0;i<routes.coordinate.length;i++) //loop through the coordinates
  {
    marker1[i]=new mapboxgl.Marker({"color": "#D7BDE2"}).setLngLat([routes.coordinate[i].longitude,routes.coordinate[i].latitude]).addTo(map1); //setting up the marker
    if(i==0) //if i = 0 , which means it is the starting point (departure Airport)
    {
      let popup=new mapboxgl.Popup({offset:25},{closeButton:false});//create the popup
      let info=routes.departure+"<br>"+routes.departureWeather.summary+"<br>"+routes.departureWeather.temperatureMax+"(Degree Celcius)<br>"+routes.departureWeather.temperatureMin + "(Degree Celcius)";//create the info variable to store the info that need to display in popup
      popup.setHTML(info); //setting the info into the popup message
      marker1[0].setPopup(popup); //attached it to the marker
      map1.panTo([routes.coordinate[0].longitude,routes.coordinate[0].latitude]) //pan to the departure airport locations
    }
    else if (i==(routes.coordinate.length-1)) { //else if when 1 = route.coordinate.length -1, which means it is the ending point (arrival Airport)
      let popup=new mapboxgl.Popup({offset:25},{closeButton:false});//create the popup
      let info2=routes.arrival+"<br>"+routes.arrivalWeather.summary+"<br>"+routes.arrivalWeather.temperatureMax+"(Degree Celcius)<br>"+routes.arrivalWeather.temperatureMin +"(Degree Celcius)";//create the info variable to store the info that need to display in popup      popup.setHTML(info);
      popup.setHTML(info2); //setting the info into the popup message
      marker1[routes.coordinate.length-1].setPopup(popup); //attached it to the marker

    }

  }
  let lineCoordinate=[]; //initialize the line
  for(let i=0;i<routes.coordinate.length;i++) //loop through the coordinates
  {
    lineCoordinate[i]=[routes.coordinate[i].longitude,routes.coordinate[i].latitude] //store the coordinates inside the line coordinate array
  }

      map1.on('load', function() { //when the map load
        map1.addSource('route', { //add a polyline which will link all the coordinate inside the line coordinate together
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates':lineCoordinate //assign the line coordinate array to the coordinates
        }
        }
        });
        map1.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
            'line-join': 'round',
            'line-cap': 'round'
            },
            'paint': {
            'line-color': '#2E86C1 ', //setting the line colour
            'line-width': 8
            }
        });
})};

function displayRouteInfo(routes) //function to display the relevant info of the route
{
	let routeTableRef = document.getElementById("routeTable"); //getting access to the routeTable
	let output = "";
	output += '<tr><td class="mdl-data-table__cell--non-numeric">' + routes.departure + '</td>'; //setting the departure airport
	output += '<td class="mdl-data-table__cell--non-numeric">' + routes.departureCountry + '</td>';//setting the departure country
	output += '<td>' + routes.departureDate + '</td>'; //setting the departure date
	output += '<td>' + routes.departureTime + '</td>'; //setting the departure time
	output += '<td class="mdl-data-table__cell--non-numeric">' + routes.arrival + '</td>';//setting the arrival airport
	output += '<td class="mdl-data-table__cell--non-numeric">' + routes.arrivalCountry + '</td>';//setting the arrival countryt
	output += '<td>' + routes.arrivalTime + '</td>'; //setting the arrival time
	output += '<td>' + routes.distance.toFixed(0) + '(km)</td>'; //setting the total distance travelled and fix it to a whole numbert
	output += '<td class="mdl-data-table__cell--non-numeric">' + routes.duration + '</td>'; //setting the duration time
  output += '<td class="mdl-data-table__cell--non-numeric">' + routes.status + '</td>'; //setting the status of the flight
  if (routes.status == "scheduled") //if the status is scheduled, which means it can be deleted
  {
    output += '<td><a id = button1 class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="deleteThisRoute()">Delete</a></td></tr>'; //there will be a delete button to delete the scheduled route
  }
	output += '</tbody></table>';
	routeTableRef.innerHTML += output; //printing the data to the routeTable

	let departureWeatherTableRef = document.getElementById("departureWeatherTable"); //getting access to the departureWeatherTable
	let output2 = "";
	output2 += '<tr><td>' + routes.departureWeather.summary + '</td>'; //setting the departure weather summary
	output2 += '<td>' + routes.departureWeather.temperatureMax + '(Degree Celcius)' + '</td>'; //setting the departure weather maximum temp
	output2 += '<td>' + routes.departureWeather.temperatureMin + '(Degree Celcius)' + '</td></tr>';//setting the departure weather minimum temp
	output2 += '</tbody></table>';
	departureWeatherTableRef.innerHTML += output2; //printing the data to the departureWeatherTable

	let arrivalWeatherTableRef = document.getElementById("arrivalWeatherTable"); //getting access to the arrivalWeatherTable
	let output3 = "";
	output3 += '<tr><td>' + routes.arrivalWeather.summary + '</td>'; //setting the arrival weather summary
	output3 += '<td>' + routes.arrivalWeather.temperatureMax + '(Degree Celcius)' + '</td>';//setting the arrival weather maximum temp
	output3 += '<td>' + routes.arrivalWeather.temperatureMin + '(Degree Celcius)' + '</td></tr>'; //setting the arrival weather minimum temp
	output3 += '</tbody></table>';
	arrivalWeatherTableRef.innerHTML += output3;//printing the data to the arrivalWeatherTable

	let planeTableRef = document.getElementById("planeTable");
	let output4 = "";
	output4 += '<tr><td>' + routes.id + '</td>';//setting the plane id
	output4 += '<td class="mdl-data-table__cell--non-numeric">' + routes.airline + '</td>'; //setting the plane airline
	output4 += '<td>' + routes.type + '</td></tr>'; //setting the plane type
	output4 += '</tbody></table>';
	planeTableRef.innerHTML += output4; //printing the data to the planeTable
}

function deleteThisRoute() //function to delete the route
{
    if (confirm("Are you very sure?")) //asking for confirmation
    {
      // runs if user clicks 'OK'
      monashRouteList.removeRoute(routes); //remove the routes from the monashRouteList
      //check if it is empty array or not
      if (monashRouteList.route.length == 0) //if the monashRouteList is empty
      {
        localStorage.removeItem(ROUTE_DATA_KEY); //remove the localStorage
      }
      else
      {
        updateLocalStorage(monashRouteList); //update the localStorage
      }
      alert("This route has been deleted"); //notify the user that the route has been deleted
      window.location = "Mainpage.html"; //link to main page
    }

}

let index = localStorage.getItem(ROUTE_INDEX_KEY); //getting the index key
// using the getRoute method, retrieve the current monashRoute instance
let routes = monashRouteList.getRoute(index);
//getting the weather data for the departure and arrival airport.
getWeatherData(routes.coordinate[0].latitude,routes.coordinate[0].longitude,"departureWeatherCallback");
getWeatherData(routes.coordinate[routes.coordinate.length-1].latitude,routes.coordinate[routes.coordinate.length-1].longitude,"arrivalWeatherCallback");
