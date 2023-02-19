let url="https://eng1003.monash/api/v1/planes/";
let data={
  callback:"airplaneResults"
};
webServiceRequest(url,data);

function webServiceRequest(url,data)
{
    // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data)
    {
        if (data.hasOwnProperty(key))
        {
            if (params.length == 0)
            {
                // First parameter starts with '?'
                params += "?";
            }
            else
            {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
         }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);//let html access the script
}

function airplaneResults(planes)
{
  let dataTableRef = document.getElementById("dataTable")
  let output = "";
  for(let i=0;i<planes.airplanes.length;i++)
  {
    output += '<tr><td>' + planes.airplanes[i].id + '</td>';
    output += '<td>' + planes.airplanes[i].registration + '</td>';
    output += '<td>' + planes.airplanes[i].location + '</td>';
    output += '<td>' + planes.airplanes[i].range + '</td>';
    output += '<td>' + planes.airplanes[i].avgSpeed + '</td>';
    output += '<td>' + planes.airplanes[i].type + '</td>';
    output += '<td>' + planes.airplanes[i].airline + '</td>';
    output += '<td>' + planes.airplanes[i].status + '</td></tr>';
  }
  output += '</tbody></table>'
  dataTableRef.innerHTML += output;
}

function sortTable(n)
{
  let table=document.getElementById("dataTable");
  let rows
  let dir="";
  let switchcount=0;
  let switching= false;
  let i=0;
  let x="";
  let y="";
  let shouldSwitch=false;
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching)
  {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++)
    {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc")
      {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase())
        {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
      else if (dir == "desc")
      {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())
        {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch)
    {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;
    }
    else
    {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc")
      {
        dir = "desc";
        switching = true;
      }
    }
  }
}
