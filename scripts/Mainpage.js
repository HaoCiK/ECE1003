//js file for main Page

//function that will display all the routes in main page
function displayRoutes()
{
  let output = '<table id="dataTable" class="mdl-data-table mdl-js-data-table mdl-shadow--50dp dataTable">';
  output += `<thead><tr><th>Airline</th><th>Departure Date</th><th>Departure Time</th><th>Arrival Time</th><th>Departure Country</th><th>Arrival Country</th><th></th></tr></thead>`;
  output += `<tbody>`;
  for (let i=0; i<monashRouteList._route.length;i++)
  {
    if (monashRouteList._route[i]._status=="ongoing" || monashRouteList._route[i]._status=="scheduled") //display history/completed only
    {
      output += `<tr><td>${monashRouteList._route[i]._airline}</td><td>${monashRouteList._route[i]._departureDate}</td><td>${monashRouteList._route[i]._departureTime}</td><td>${monashRouteList._route[i]._arrivalTime}</td><td>${monashRouteList._route[i]._departureCountry}</td><td>${monashRouteList._route[i]._arrivalCountry}</td><td><a id = button1 class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="view(${i})">View details</a></td></tr>`;
    }
  }
  output += `</tbody>`;
  output+= `</table>`;
  routesRef.innerHTML = output;
}
let departureDate ="";
//check status of route (not sure about the date thing yet)
function checkRouteStatus()
{
  let today = new Date ();
  let todayDay = today.getDate();
  let todayMonth = today.getMonth();
  let todayYear = today.getFullYear();
  for (let i=0; i<monashRouteList._route.length; i++)
  {
    departureDate = new Date(monashRouteList._route[i]._departureDate);
    let departureDay = departureDate.getDate();
    let departureMonth = departureDate.getMonth();
    let departureYear = departureDate.getFullYear();
    //check status
    if (todayYear>departureYear)
    {
      monashRouteList._route[i]._status = "completed";
      updateLocalStorage(monashRouteList);
    }
    else //todayYear<=departureYear
    {
      if (todayMonth>departureMonth)
      {
        monashRouteList._route[i]._status = "completed";
        updateLocalStorage(monashRouteList);
      }
      else if (todayMonth<departureMonth)
      {
        monashRouteList._route[i]._status = "scheduled";
        updateLocalStorage(monashRouteList);
      }
      else //todayMonth==departureMonth
      {
        if (todayDay>departureDay)
        {
          monashRouteList._route[i]._status = "completed";
          updateLocalStorage(monashRouteList);
        }
        else if (todayDay==departureDay) //assume ongoing status is for same day flight
        {
          monashRouteList._route[i]._status = "ongoing";
          updateLocalStorage(monashRouteList);
        }
        else
        {
          monashRouteList._route[i]._status = "scheduled";
          updateLocalStorage(monashRouteList);
        }
      }
    }
  }
}

//function which will run when history button is pressed
function sortByHistory()
{
  let output = '<table id="dataTable" class="mdl-data-table mdl-js-data-table mdl-shadow--50dp dataTable">';
  output += `<thead><tr><th>Airline</th><th>Departure Date</th><th>Departure Time</th><th>Arrival Time</th><th>Departure Country</th><th>Arrival Country</th><th></th></tr></thead>`;
  output += `<tbody>`;
  for (let i=0; i<monashRouteList._route.length;i++)
  {
    if (monashRouteList._route[i]._status == "completed") //display history/completed only
    {
      output += `<tr><td>${monashRouteList._route[i]._airline}</td><td>${monashRouteList._route[i]._departureDate}</td><td>${monashRouteList._route[i]._departureTime}</td><td>${monashRouteList._route[i]._arrivalTime}</td><td>${monashRouteList._route[i]._departureCountry}</td><td>${monashRouteList._route[i]._arrivalCountry}</td><td><a id = button1 class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="view(${i})">View details</a></td></tr>`;
    }
    else
    {
      //do nothing
    }
  }
  output += `</tbody>`;
  output+= `</table>`;
  routesRef.innerHTML = output;

}
//function which will run when ongoing button is pressed
function sortByOngoing()
{
  let output = '<table id="dataTable" class="mdl-data-table mdl-js-data-table mdl-shadow--50dp dataTable">';
  output += `<thead><tr><th>Airline</th><th>Departure Date</th><th>Departure Time</th><th>Arrival Time</th><th>Departure Country</th><th>Arrival Country</th><th></th></tr></thead>`;
  output += `<tbody>`;
  for (let i=0; i<monashRouteList._route.length;i++)
  {
    if (monashRouteList._route[i]._status == "ongoing") //display ongoing only
    {
      output += `<tr><td>${monashRouteList._route[i]._airline}</td><td>${monashRouteList._route[i]._departureDate}</td><td>${monashRouteList._route[i]._departureTime}</td><td>${monashRouteList._route[i]._arrivalTime}</td><td>${monashRouteList._route[i]._departureCountry}</td><td>${monashRouteList._route[i]._arrivalCountry}</td><td><a id = button1 class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="view(${i})">View details</a></td></tr>`;
    }
    else
    {
      //do nothing
    }
  }
  output += `</tbody>`;
  output+= `</table>`;
  routesRef.innerHTML = output;

}
//function which will run when future button is pressed
function sortByFuture()
{
  let output = '<table id="dataTable" class="mdl-data-table mdl-js-data-table mdl-shadow--50dp dataTable">';
  output += `<thead><tr><th>Airline</th><th>Departure Date</th><th>Departure Time</th><th>Arrival Time</th><th>Departure Country</th><th>Arrival Country</th><th></th></tr></thead>`;
  output += `<tbody>`;
  for (let i=0; i<monashRouteList._route.length;i++)
  {
    if (monashRouteList._route[i]._status == "scheduled") //display future only
    {
      output += `<tr><td>${monashRouteList._route[i]._airline}</td><td>${monashRouteList._route[i]._departureDate}</td><td>${monashRouteList._route[i]._departureTime}</td><td>${monashRouteList._route[i]._arrivalTime}</td><td>${monashRouteList._route[i]._departureCountry}</td><td>${monashRouteList._route[i]._arrivalCountry}</td><td><a id = button1 class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick="view(${i})">View details</a></td></tr>`;
    }
    else
    {
      //do nothing
    }
  }
  output += `</tbody>`;
  output+= `</table>`;
  routesRef.innerHTML = output;
}
//view function which store the index of the route so viewroutepage can use it
function view (index)
{
  index = JSON.stringify(index);
  localStorage.setItem(ROUTE_INDEX_KEY,index);
  window.location = "Viewroutepage.html";
}
//-------------------------------------------------------------------------------------------------------------------------------
//code which run when page load
let routesRef = document.getElementById("routes");
if (checkIfDataExistsLocalStorage()==true)
{
  checkRouteStatus(); //check the status of the routes
  displayRoutes(); //display routes if local storage got data (already retrieve data in shared.js)
}
else
{
  let output = `<h3 id="noSchedule">No scheduled routes found</h3>`; //display no scheduled routes if no schedule
  routesRef.innerHTML = output;
}
