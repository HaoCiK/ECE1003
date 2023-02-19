
class Airport
{
  constructor()
  {
    this._airportCode  = "";
    this._name = "";
    this._city = "";
    this._country = "";
    this._latitude = "";
    this._longitude = "";
    this._altitude = "";
  }
  get airportCode()
  {
    return this._airportCode;
  }
  get name()
  {
    return this._name;
  }
  get city()
  {
    return this._city;
  }
  get country()
  {
    return this._country;
  }
  get latitude()
  {
    return this._latitude;
  }
  get longitude()
  {
    return this._longitude;
  }
  get altitude()
  {
    return this._altitude;
  }


  set airportCode(newairportCode)
  {
    this._airportCode = newairportCode;
  }
  set name(newname)
  {
    this._name = newname;
  }
  set city(newcity)
  {
    this._city=newcity;
  }
  set country(newcountry)
  {
    this._country=newcountry;
  }
  set latitude(newlat)
  {
    this._latitude=newlat;
  }
  set longitude(newlon)
  {
    this._longitude=newlon;
  }
  set altitude(newaltitude)
  {
    this._altitude=newaltitude;
  }

  fromData(dataObject)
  {

      this._airportCode  = dataObject._airportCode;
      this._name = dataObject._name;
      this._city = dataObject._city;
      this._country = dataObject._country;
      this._latitude = dataObject._latitude;
      this._longitude = dataObject._longitude;
      this._altitude = dataObject._altitude;

  }
}


class AirportList
{
  constructor()
  {
    this._airport  = [];
  }

  get airport()
  {
    return this._airport;
  }

  addAirport(airport)
  {
    if(airport instanceof Airport)
    {
      this._airport.push(airport);
    }

  }


  fromData(dataObject)
  {
    let data = dataObject._airport;
    this._airport = [];

    for (let i = 0; i < dataObeject._airport.length; i++)
		{
			let tempAirport = new Airport();
      tempAirport.fromData(data[i]);
      this._airport.push(tempAirport);
		}
  }
}

class Airplane
{
  constructor()
  {
    this._id  = "";
    this._registration = "";
    this._location = "";
    this._latitude=0;
    this._longitude=0;
    this._distance=100000;
    this._range = 0;
    this._avgSpeed = 0;
    this._type = "";
    this._status = "";
    this._airline = "";
  }

  get id()
  {
    return this._id;
  }
  get registration()
  {
    return this._registration;
  }
  get location()
  {
    return this._location;
  }
  get latitude()
  {
    return this._latitude;
  }
  get longitude()
  {
    return this._longitude;
  }
  get distance()
  {
    return this._distance;
  }
  get range()
  {
    return this._range;
  }
  get avgSpeed()
  {
    return this._avgSpeed;
  }
  get type()
  {
    return this._type;
  }
  get status()
  {
    return this._status;
  }
  get airline()
  {
    return this._airline;
  }


  set id(newid)
  {
    this._id=newid;
  }
  set registration(newregistration)
  {
    this._registration=newregistration;
  }
  set location(newLocation)
  {
    this._location = newLocation;
  }
  set latitude(newlatitude)
  {
    this._latitude=newlatitude;
  }
  set longitude(newlongitude)
  {
    this._longitude=newlongitude;
  }
  set distance(newdistance)
  {
    this._distance=newdistance;
  }
  set range(newrange)
  {
    this._range=newrange;
  }
  set avgSpeed(newspeed)
  {
    this._avgSpeed=newspeed;
  }
  set type(newtype)
  {
    this._type=newtype;
  }
  set status(newStatus)
  {
    this._status = newStatus;
  }
  set airline(newairline)
  {
     this._airline= newairline
  }

  fromData(dataObject)
  {
    // we need to take the properties of dataObject and set them accordingly
    this._id = dataObject._id;
    this._registration = dataObject._registration;
    this._location = dataObject._location;
    this._latitude= dataObject._latitude;
    this._longitude=dataObject._longitude;
    this._distance=dataObject._distance;
    this._range = dataObject._range;
    this._avgSpeed = dataObject._avgSpeed;
    this._type = dataObject._type;
    this._status = dataObject._status;
    this._airline = dataObject._airline;
  }
}

class AirplaneList
{
  constructor()
  {
    this._airplane  = [];
  }

  get airplane()
  {
    return this._airplane;
  }

  addAirplane(plane)
  {
    if(plane instanceof Airplane)
    {
      this._airplane.push(plane);
    }

  }

  sortAirplane()
  {

  }

  fromData(dataObject)
  {
    let data = dataObject._airplane;
    this._airplane = [];

    for (let i = 0; i < this._airplane.length; i++)
		{
			let tempAirplane = new Airplane();
      tempAirplane.fromData(data[i]);
      this._airplane.push(tempAirplane);
		}
  }
}

class Route
{
  constructor()
  {
    this._id  = "";
    this._airline = "";
    this._type = "";
    this._avgSpeed=0;
    this._departureCountry="";
    this._departure = "";
    this._depatureDate="";
    this._departureTime = "";
    this._coordinate=[];
    this._departureWeather = "";
    this._arrivalCountry="";
    this._arrival = "";
    this._arrivalTime = "";
    this._arrivalWeather = "";
    this._distance = 0;
    this._duration = "";
    this._status = "";
  }

  get id()
  {
    return this._id;
  }
  get airline()
  {
    return this._airline;
  }
  get type()
  {
    return this._type;
  }
  get avgSpeed()
  {
    return this._avgSpeed;
  }
  get departureCountry()
  {
    return this._departureCountry;
  }
  get departure()
  {
    return this._departure;
  }
  get departureDate()
  {
    return this._departureDate;
  }
  get departureTime()
  {
    return this._departureTime;
  }
  get coordinate()
  {
    return this._coordinate;
  }
  get departureWeather()
  {
    return this._departureWeather;
  }
  get arrival()
  {
    return this._arrival;
  }
  get arrivalCountry()
  {
    return this._arrivalCountry;
  }
  get arrivalTime()
  {
    return this._arrivalTime;
  }
  get arrivalWeather()
  {
    return this._arrivalWeather;
  }
  get distance()
  {
    return this._distance;
  }
  get duration()
  {
    return this._duration;
  }
  get status()
  {
    return this._status;
  }
  set id(newid)
  {
    this._id=newid;
  }
  set airline(newairline)
  {
    this._airline=newairline;
  }
  set type(newtype)
  {
    this._type=newtype;
  }
  set avgSpeed(newAvgSpeed)
  {
    this._avgSpeed=newAvgSpeed;
  }
  set departureDate(newDepartureDate)
  {
    this._departureDate = newDepartureDate;
  }
  set departureCountry(newDepartureCountry)
  {
    this._departureCountry = newDepartureCountry;
  }
  set departure(newDeparture)
  {
    this._departure = newDeparture;
  }
  set departureTime(newDepartureTime)
  {
      this._departureTime = newDepartureTime;
  }
  set departureWeather(newDepartureWeather)
  {
    this._departureWeather = newDepartureWeather;
  }
  set coordinate(newCoordinate)
  {
    this._coordinate.push(newCoordinate);
  }
  set arrival(newArrival)
  {
    this._arrival = newArrival;
  }
  set arrivalCountry(newArrivalCountry)
  {
    this._arrivalCountry = newArrivalCountry;
  }
  set arrivalTime(newArrivalTime)
  {
      this._arrivalTime = newArrivalTime;
  }
  set arrivalWeather(newArrivalWeather)
  {
    this._arrivalWeather = newArrivalWeather;
  }
  set distance(newDistance)
  {
      this._distance = newDistance;
  }
  set duration(newDuration)
  {
      this._duration = newDuration;

  }
  set status(newStatus)
  {
    if (newStatus == "scheduled" || newStatus || "ongoing" || newStatus == "completed")
    {
      this._status = newStatus;
    }
  }


  fromData(dataObject)
  {
    // we need to take the properties of dataObject and set them accordingly
    this._id  = dataObject._id;
    this._airline = dataObject._airline;
    this._type = dataObject._type;
    this._departureCountry = dataObject._departureCountry;
    this._departure = dataObject._departure;
    this._departureDate = dataObject._departureDate;
    this._departureTime = dataObject._departureTime;
    this._coordinate = dataObject._coordinate;
    this._departureWeather = dataObject._departureWeather;
    this._arrival = dataObject._arrival;
    this._arrivalCountry=dataObject._arrivalCountry;
    this._arrivalTime = dataObject._arrivalTime;
    this._arrivalWeather = dataObject._arrivalWeather;
    this._distance = dataObject._distance;
    this._duration = dataObject._duration;
    this._status = dataObject._status;
  }
}
const ROUTE_DATA_KEY = "route";
const AIRPLANE_DATA_KEY = "airplane";
const ROUTE_INDEX_KEY = "routeIndex";


class RouteList
{
  constructor()
  {
    this._route = [];
  }

  get route()
  {
    return this._route;
  }

  addRoute(data)
  {
    this._route.push(data);
  }
  getRoute(index)
  {
    return this._route[index];
  }

  removeRoute(index)
  {
    for (let i = 0 ; i < this._route.length ; i++)
    {
      if(this._route[i] === index) //if the locker click have the id similar to the id of the locker
        {
          this._route.splice(i, 1);  //use splice to remove it
        }
    }
  }

  fromData(dataObject)
  {
    let data2 = dataObject._route;

    for (let i = 0; i < data2.length; i++)
		{
			let tempRoute = new Route();
      tempRoute.fromData(data2[i]);
      this._route.push(tempRoute);
  }
}
}

let monashRouteList= new RouteList();//create routelist

function checkIfDataExistsLocalStorage ()
{
  let data = localStorage.getItem(ROUTE_DATA_KEY);
  if (data)
  {
    if (data == null || data == undefined || data == "")
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  else
  {
    return false;
  }
}

function updateLocalStorage(data)
{
  let dataString = JSON.stringify(data);
  localStorage.setItem(ROUTE_DATA_KEY,dataString);
}

function getDataLocalStorage()
{
  let jsonData = localStorage.getItem(ROUTE_DATA_KEY);
  let data_info = JSON.parse(jsonData);
  return data_info
}

if (checkIfDataExistsLocalStorage()==true) //retrieve data if local storage available
{
  data = getDataLocalStorage();
  monashRouteList.fromData(data);
}
else
{
  //do nothing
}
