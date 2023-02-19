//access MapBox
mapboxgl.accessToken = "pk.eyJ1IjoibGVleXVuaGFvIiwiYSI6ImNrYWFpeXpmbjB0bHYyemw1eWtzY2JyMGgifQ.wlZodRo8rGyBlcw5n1k4JA";
// initialise a map
let map = new mapboxgl.Map({
    container: 'mapArea', // container id
    style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
    center: [108.195002,3.675176], // starting position [lng, lat]
    zoom: 4 // starting zoom
  });




let monashRoute=new Route();//create a new Route class for new schedule plan
let specialTime="";


function searchPlane()//get all airplane data from airplane API
{
  let monashURL="https://eng1003.monash/api/v1/planes/?&callback=searchPlanecallBack";//acces airplane API
  let script=document.createElement('script');//place link in html
      script.src=monashURL;
      document.body.appendChild(script);
      let departureDateRef=document.getElementById("departureDate");//get user input date
      let getDate=departureDateRef.value;
      let specialDate=new Date(getDate)//get the date in javascript form
        let date=specialDate.getDate();//get the date of user input date
        let month=specialDate.getMonth()+1;//get the month of user input date ,add 1 as month count from 0
        let year=specialDate.getFullYear();//get the full year of user input date
      //format the date present format
        if(date<10)
        {
          date="0"+date;
        }
        if(month<10)
        {
          month="0"+month;
        }
        monashRoute.departureDate=year+"-"+month+"-"+date;//store the depature date
      let departureTimeRef=document.getElementById("departureTime");//get user input time
      let getTime=departureTimeRef.value;
      specialTime=new Date(getDate+" "+getTime);//get the time in javascript form
      monashRoute.departureTime=departureTimeRef.value;//store the depature time
}
let monashPlaneList=new AirplaneList();
function searchPlanecallBack(planes)//callBack function for searchPlane() //save all plane data in API to the monashPlane class
{
  for(let i=0;i<planes.airplanes.length;i++)
  {
    let monashPlane=new Airplane();
    monashPlane._id=planes.airplanes[i].id;
    monashPlane._registration=planes.airplanes[i].registration;
    monashPlane._location=planes.airplanes[i].location;
    monashPlane._range=planes.airplanes[i].range;
    monashPlane._avgSpeed=planes.airplanes[i].avgSpeed;
    monashPlane._type=planes.airplanes[i].type;
    monashPlane._status=planes.airplanes[i].status;
    monashPlane._airline=planes.airplanes[i].airline;
    monashPlaneList.addAirplane(monashPlane);//add the monashPlane class into the monashPlaneList class
  }
  localStorage.setItem(AIRPLANE_DATA_KEY,JSON.stringify(monashPlaneList));//store monashPlaneList into local storage
}
function searchAirport()
{
  searchPlane();//run searchPlane function when user click on "SEARCH AIRPORT" button
  let countryRef=document.getElementById("country");
  let country=countryRef.value;//get user input country
  let cityRef=document.getElementById("city");
  let city=cityRef.value;//get user input city

  let encodedCountry=encodeURIComponent(country)//encode user input country
  let encodedCity=encodeURIComponent(city)//encode user input city
  let monashURL=" https://eng1003.monash/api/v1/airports/?country="+encodedCountry+"&city="+encodedCity+"&callback=searchAirportcallBack";//access airport API
  let script=document.createElement('script');//place link on html
  script.src=monashURL;
  document.body.appendChild(script);
}

let monashAirportList=new AirportList();//create an Airport class list to store all airport data
function searchAirportcallBack(data)//callback function for airport data
  {
    if(data)//check if data available
    {
      if(data==null||data==""||data==undefined)//display error message id if user input invalid
      {
        alert("Please input valid country and city");
        location.reload();//reload page
      }
      else {
        let marker=[];//create marker array
        for(let i=0;i<data.length;i++)
        {
          map.panTo([data[0].longitude,data[0].latitude])//center the map at first airport in user search country
          marker[i]= new mapboxgl.Marker({"color": "#9DC3D1"});//create new marker
          marker[i].setLngLat([data[i].longitude,data[i].latitude]);//set the marker latitude and longitude

          let popup=new mapboxgl.Popup({offset:25},{closeButton:false});//create the popup
          let info=data[i].airportCode+"<br>"+data[i].name;//create the info variable to store the ifo that need to display in popup

          //display popoup on the marker and addTo map
          popup.setHTML(info);
          marker[i].setPopup(popup);
          marker[i].addTo(map);
          popup.addTo(map);

          let monashAirport=new Airport;//crate new class for each airport to store all the airports data in API
          monashAirport._airportCode  = data[i]._airportCode;
          monashAirport._name = data[i]._name;
          monashAirport._city = data[i]._city;
          monashAirport._country =data[i]._country;
          monashAirport._latitude = data[i]._latitude;
          monashAirport._longitude = data[i]._longitude;
          monashAirport._altitude = data[i]._altitude;
          monashAirportList.addAirport(monashAirport)//add the airport class to the airport list


        }
        //display a drop list of all the airports that available in the country and city on departureairportoutput
        let departureAirportOutputRef=document.getElementById("departureAirportOutput");
        let output="";
        output+="Depature airport: ";
        output+="<div class='mdl-textfield mdl-js-textfield' >"+
        "<select class='mdl-textfield__input' id='depatureAirport'>"+
        "<label class='mdl-textfield__label' for='depatureAirport'></label>";
        for(let i=0;i<data.length;i++)
        {
          output+="<option value='"+data[i].airportCode+"'>"+"("+data[i].airportCode+") "+data[i].name+"</option>";
        }
        output+="</select></div>";
        departureAirportOutputRef.innerHTML+=output+"<br>";
      }
    }


  }

let start="";//pre-allocated an variable to store the user selected airport code
function getPlane()//get the plane location
{
  let depatureAirportRef=document.getElementById("depatureAirport");
  start=depatureAirportRef.value;//get user selected airport in dropdown list
  let monashURL="https://eng1003.monash/api/v1/airports/?code="+start+"&callback=getPlanecallBack";//access airplane data API for selected airport
  let script=document.createElement('script');//place link in html
  script.src=monashURL;
  document.body.appendChild(script);
}

let coordinate=[];
function getPlanecallBack(planeCoordinate)//callBack function for getPlane()
{
  //store the plane data include depature country and airportCode for display booking summary; coordinate for marker and line connected
  monashRoute.departure="("+planeCoordinate.airportCode+") "+planeCoordinate.name;
  monashRoute.departureCountry=planeCoordinate.country;
  monashRoute.coordinate={latitude:planeCoordinate.latitude,longitude:planeCoordinate.longitude};
  //store the API data of depature airportCoordinate
  let airportCoordinate=
  {
    latitude:planeCoordinate.latitude,
    longitude:planeCoordinate.longitude,
  }
  coordinate.push(airportCoordinate);//coordinate for marker and line connecte marker
  nearAiport();//run nearAiport() to get the nearest airports data
}
function nearAiport()//load all the nearest airport and store in to a class
{
  let encodedLat=encodeURIComponent(coordinate[0].latitude);//location of airplane
  let encodedLng=encodeURIComponent(coordinate[0].longitude);//location of airplane

  let monashURL="https://eng1003.monash/api/v1/airports/?lat="+encodedLat+"&lng="+encodedLng+"&range=7000&callback=nearAiportcallBack";//aceess all airports data in a specific location with 7000 range
  let script=document.createElement('script');//place link to html
  script.src=monashURL;
  document.body.appendChild(script);

}
let nearAiportList=new AirportList();
function nearAiportcallBack(data)//callBack function for nearAiport() //get all the nearAiport API data and store into the class
{
  for(let i=0;i<data.length;i++)
  {
    let airportAround =new Airport;//crate new class for each airport to store airport data
    airportAround._airportCode  = data[i].airportCode;
    airportAround._name = data[i].name;
    airportAround._city = data[i].city;
    airportAround._country =data[i].country;
    airportAround._latitude = data[i].latitude;
    airportAround._longitude = data[i].longitude;
    nearAiportList.addAirport(airportAround);//add the airportArounnd class to the nearAiportList
  }
airplaneResults();//run airplaneResults function
}

function airplaneResults()
{
  //loop through the airportdata to get the airport coordinates and calculate he distance
  for(let r=0;r<monashPlaneList.airplane.length;r++)
  {
    for(let c=0;c<nearAiportList.airport.length;c++)
    {
      if(monashPlaneList.airplane[r].location==nearAiportList.airport[c].airportCode)
      {
        monashPlaneList.airplane[r].latitude=nearAiportList.airport[c].latitude;
        monashPlaneList.airplane[r].longitude=nearAiportList.airport[c].longitude;
        monashPlaneList.airplane[r].distance=calculateDistance(monashPlaneList.airplane[r].latitude,monashPlaneList.airplane[r].longitude,coordinate[0].latitude,coordinate[0].longitude)
      }
    }
  }
  let count=false;//variable to identify user selected airport have available airplane
  let availablePlaneOutputRef=document.getElementById("availablePlaneOutput");//display a drop down list for availablePlane
  let output="";
  output+="Available Plane: ";
  output+="<div class='mdl-textfield mdl-js-textfield' >"+
  "<select class='mdl-textfield__input' id='airplane'>"+
  "<label class='mdl-textfield__label' for='airplane'></label>";
  for(let i=0;i<monashPlaneList.airplane.length;i++)
  {
    if(start==monashPlaneList.airplane[i].location)//check if user selected airport have available airplane
    {
        output+="<option value='"+monashPlaneList.airplane[i].id+"'>"+"("+monashPlaneList.airplane[i].location+") "+monashPlaneList.airplane[i].registration+"</option>";
        count=true;//return true value if airplane available
    }
  }

  if(count==false)//display 5 nearest airplae if no available airplane found
  {
    //sorting the all the airplane by distance to get 5 nearest airplanes
    for(let r=1;r<monashPlaneList.airplane.length;r++)
    {
      for(let c=1;c<monashPlaneList.airplane.length;c++)
      {
        let temp ="";
      	if(monashPlaneList.airplane[c-1].distance>monashPlaneList.airplane[c].distance)//compare the airplane distance in the list to get an ascendinng order airplane list
      	{
          //switch the data of airplane class the get the shotest distance airplane in the top of the list
      		temp=monashPlaneList.airplane[c-1];
      		monashPlaneList.airplane[c-1]=monashPlaneList.airplane[c];
      		monashPlaneList.airplane[c]=temp;
      	}
      }
    }
    if(confirm("NO AVAILABLE PLANE\nDisplay 5 nearest plane?"))//display error message //once user click "OK" dislay 5 nearest airport
    {
      let marker=[];//marker array
      for(let k=0;k<5;k++)//dislay 5 nearest airport in a drop down list
      {
        output+="<option value='"+ monashPlaneList.airplane[k].id +"'>"+"("+monashPlaneList.airplane[k].location+") "+monashPlaneList.airplane[k].registration+"</option>";
        marker[k]= new mapboxgl.Marker({"color": "#FFB272"});//create new marker
        marker[k].setLngLat([monashPlaneList.airplane[k].longitude,monashPlaneList.airplane[k].latitude]).addTo(map);//set the marker latitude and longitude
        let popup=new mapboxgl.Popup({offset:25},{closeButton:false});//create the popup
        let info="("+monashPlaneList.airplane[k].location+") "+monashPlaneList.airplane[k].registration+"<br>Range:"+monashPlaneList.airplane[k].range+" (km)<br>Average Speed: "+monashPlaneList.airplane[k].avgSpeed+" (knots)";//create the info variable to store the info that need to display in popup

        //display popoup on the marker and addTo map
        popup.setHTML(info);
        marker[k].setPopup(popup);
        marker[k].addTo(map);
        popup.addTo(map);
      }

    }
    else{//if user chose cancel refresh the page
      location.reload();
    }
  }
  output+="</select></div>";
  availablePlaneOutputRef.innerHTML+=output+"<br>";
}

function calculateDistance(lat1,lng1,lat2,lng2)//caluculate distance between two location by latitude and longitude function
{
    const earthRadius = 6371;
    const latA= lat1* Math.PI/180;
    const latB= lat2 * Math.PI/180;
    const differenceLat = (lat2-lat1) * Math.PI/180;
    const differenceLon = (lng2-lng1) * Math.PI/180;
    const a = Math.sin(differenceLat/2) * Math.sin(differenceLat/2) + Math.cos(latA) * Math.cos(latB) *Math.sin(differenceLon/2) * Math.sin(differenceLon/2);
    const angularDistance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distanceBtw = earthRadius * angularDistance;
    return distanceBtw;//return calculated distance value


}

let planeRange="";//variable for plane range
let planeLat="";//varaible for plane latitude
let planeLng="";//variable fro plane longitude
let airplaneIndexKey=0;//varaible for airplane index key in plane list
let firstCount = true;//variable to identify the user selected airport is depature airport

function showAirport()//search the nearest airport by airplane coordinate and range
{

  let airplaneRef=document.getElementById('airplane');
  let airplaneID=airplaneRef.value;//get user selected airplane ID

  for(let i=0;i<monashPlaneList.airplane.length;i++)//loop through the monashPlaneList() to get all the airplanes data
  {
    if(airplaneID==monashPlaneList.airplane[i].id)//check for user selected airplane
    {
      airplaneIndexKey=i; //save the index of airplane index in monashPlaneList
      planeRange=encodeURIComponent(monashPlaneList.airplane[i].range);//encode planeRange
      planeLat=encodeURIComponent(monashPlaneList.airplane[i].latitude);//encode planeRange
      planeLng=encodeURIComponent(monashPlaneList.airplane[i].longitude);//encode planeRange
      //store the user selected airplane infomation in monashRoute for Booking summary
      monashRoute.id=airplaneID;
      monashRoute.airline=monashPlaneList.airplane[i].airline;
      monashRoute.type=monashPlaneList.airplane[i].type;
      monashRoute.avgSpeed=monashPlaneList.airplane[i].avgSpeed;
      if(firstCount==true)//first time display the waypoint
      {
      coordinate.unshift({latitude:monashPlaneList.airplane[i].latitude,longitude:monashPlaneList.airplane[i].longitude});//insert the user selected airplane coordinate before the user selected airport coordinates
      firstCount=false;//change the value to false for next function call
      }
      displayAirport(coordinate[1].latitude,coordinate[1].longitude);//run displayAirport() to display the airports for waypoints planning
      addLine();//run add line function
    }

  }
}

function displayAirport(lat,lng)
{
  let monashURL="https://eng1003.monash/api/v1/airports/?lat="+lat+"&lng="+lng+"&range="+planeRange+"&callback=displayAirportcallBack";//access all the airport API data in the airplane rage
  let script=document.createElement('script');//place the link in html
  script.src=monashURL;
  document.body.appendChild(script);
  map1 = new mapboxgl.Map({
      container: 'mapArea', // container id
      style: 'mapbox://styles/mapbox/dark-v10', // stylesheet location
      center: [lng,lat], // starting position [lng, lat]
      zoom: 3.5 // starting zoom
    });

}

let selectedAirportList = new AirportList();//create aiportlist to store all the all the user selected waypoints
function displayAirportcallBack(airportData)//display all the airport in range with marker
{

  for(let i=0;i<airportData.length;i++)
  {
    let marker=[];
    marker[i]= new mapboxgl.Marker({"color": "#FFB272"});//create new marker
    marker[i].setLngLat([airportData[i].longitude,airportData[i].latitude]);//set the marker latitude and longitude
    //include all the function needed in marker, run when onclick
    marker[i].getElement().addEventListener('click',function(){
    coordinate.push({latitude:airportData[i].latitude,longitude:airportData[i].longitude});//add the coordinate into coordinate array
    let selectedAirport=new Airport();//create a class to store all the user selected waypoint data
    selectedAirport.airportCode=airportData[i].airportCode;
    selectedAirport.name=airportData[i].name;
    selectedAirport.city=airportData[i].city;
    selectedAirport.country=airportData[i].country;
    selectedAirport.latitude=airportData[i].latitude;
    selectedAirport.longitude=airportData[i].longitude;
    selectedAirportList.addAirport(selectedAirport);
    monashRoute.coordinate={latitude:airportData[i].latitude,longitude:airportData[i].longitude};//add the coordinate into monashRoute.coordinate array

    displayAirport(airportData[i].latitude,airportData[i].longitude);//run displayAirport() to display all the airport around waypoint selected in airplane range
    addLine();//add the line that coonnected all the user selected marker to show the route
    })
    let popup=new mapboxgl.Popup({offset:25},{closeButton:false});//create the popup
    let info=airportData[i].airportCode+"<br>"+airportData[i].name;//create the info variable to store the info that need to display in popup

    //display popoup to the marker and addTo map1
    popup.setHTML(info);
    marker[i].setPopup(popup);
    marker[i].addTo(map1);
    //popup.addTo(map1);
  }
}

function addLine()
{
  //display all the coordinate in coordinate array by markers
  let marker1=[];
  for(let i=0;i<coordinate.length;i++)
  {
    marker1[i]=new mapboxgl.Marker({"color": "#D7BDE2"}).setLngLat([coordinate[i].longitude,coordinate[i].latitude]).addTo(map1);
  }
  //store all the coordinate into lineCoordinate array in form array in array to display a line in map1
  let lineCoordinate=[];
  for(let i=0;i<coordinate.length;i++)
  {
    lineCoordinate[i]=[coordinate[i].longitude,coordinate[i].latitude]
  }
  //clear the previous line Source and Layer if any
  if (map1.getLayer("route")){
  	map1.removeLayer("route");
  }
  if (map1.getSource("route")){
  	map1.removeSource("route");
  }
  //diplay the route line
      map1.on('load', function() {
        map1.addSource('route', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates':lineCoordinate
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
            'line-color': '#b22ec1 ',
            'line-width': 8
            }
        });
})};




function addSchedule()
{
  for(let i=0;i<(monashRoute.coordinate.length)-1;i++)//loop through all the coordinate in monashRoute.coordinate to calculate the total distance for the route
  {
    monashRoute.distance+=calculateDistance(monashRoute.coordinate[i].latitude,monashRoute.coordinate[i].longitude,monashRoute.coordinate[i+1].latitude,monashRoute.coordinate[i+1].longitude);
  }
  let totalMin=monashRoute.distance/(monashPlaneList.airplane[airplaneIndexKey].avgSpeed*0.0308667);//calculate the total minutes taken of the route by using total distance divide by the user selected plane avarage speed
  let totalHour=Math.floor(totalMin/60);//calculate the hour taken of route
  let remainMin=Math.floor(totalMin%60);//calculate the remaining minutes
  if(totalHour>23)//check if the caluculate hour value over the time format
  {
    let totalDay=(totalHour/24).toFixed(0);
    totalHour=(totalHour%24);
    monashRoute.duration=totalDay+"day "+totalHour+"hour "+remainMin+"min";
  }
  else{
    monashRoute.duration=totalHour+"hour "+remainMin.toFixed(0)+"min";
  }
  //get the arrival airport data as the last airport of user selected waypoint
  let arrivalIndex=(selectedAirportList.airport.length)-1;
  monashRoute.arrival="("+selectedAirportList.airport[arrivalIndex].airportCode+") "+selectedAirportList.airport[arrivalIndex].name;
  monashRoute.arrivalCountry=selectedAirportList.airport[arrivalIndex].country;
  //calculate the arrival time by adding the user input time and calculated totalHour and remainMin
  let getHour=specialTime.getHours();//get user input hour
  let getMin=Math.round(specialTime.getMinutes());//get user input min and round it to get whole number
  let finalHour=getHour+totalHour;//add input hour with totalHour
  let finalMinute=getMin+remainMin; //add input minutes with remainMin
  //check if the caluculate arrival time value is in the time format
  if(finalMinute>59)
  {
    finalMinute=(finalMinute%60).toFixed(0);
    finalHour++;
    if(finalMinute<10)
    {
      finalMinute="0"+finalMinute;
    }
  }
  if(finalHour>23)
  {
    finalHour=(finalHour-24)
    if(finalHour<10)
    {
      finalHour="0"+finalHour;
    }
  }
  //store the route index value in ROUTE_INDEX_KEY
  function view (index)
  {
    index = JSON.stringify(index);
    localStorage.setItem(ROUTE_INDEX_KEY,index);
    window.location = "Viewroutepage.html";//link to Viewroutepage after user selected route
  }

  monashRoute.arrivalTime=finalHour+":"+finalMinute;//save the arrivalTime into monashRoute.arrivalTime
  monashRoute.status = "scheduled";//set the monashRoute.status into status


  //printing booking summary for user
  let summary="";
  summary+="Booking Details:\n";
  summary+="----------------------------------\n";
  summary+="Depature Date: "+monashRoute.departureDate+"\n";
  summary+="Depature Time: "+monashRoute.departureTime+"\n";
  summary+="Arrival Time: "+ monashRoute.arrivalTime+"\n";
  summary+="Duration: "+monashRoute.duration+"\n";
  summary+="Distance: "+monashRoute.distance.toFixed(2)+"(km)\n";
  summary+="Depature\n";
  summary+="Airport: "+monashRoute.departure+"\n";
  summary+="Country: "+monashRoute.departureCountry+"\n";
  summary+="\nWaypoint\n";
  for(let j=0;j<selectedAirportList.airport.length-1;j++)
  {
    summary+=j+1+".) (" +selectedAirportList.airport[j].airportCode+") "+ selectedAirportList.airport[j].name+"\n";
  }
  summary+="\nArrival\n";
  summary+="Airport: "+monashRoute.arrival+"\n";
  summary+="Country: "+monashRoute.arrivalCountry+"\n";
  summary+="Plane info\n";
  summary+="Airline: "+monashRoute.airline+"\n";
  summary+="Type: "+monashRoute.type+"\n";
  summary+="Average Speed: "+monashRoute.avgSpeed+"(knots)\n";

  if(confirm(summary))//diplay a popup message that display the booking summary
  {
    //once user click "Ok" display "Booking Completed!"
    alert("Booking Completed!")
    monashRouteList.addRoute(monashRoute); //push the scheduled route into route list
    updateLocalStorage(monashRouteList); //update the local storage
    for (let i=0; i<monashRouteList._route.length;i++)
    {
      view(i);
    }
  }

}
