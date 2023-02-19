# ECE1003
Flight scheduling app for Doctors without Borders (DWB)

This project aims to develop a web application which is able to facilitate the process 
of scheduling a flight to plan for the flight’s route. The target user of this web 
application is the doctor in world-wide. The web application should be user friendly 
and should have the information available right on the spot. The user interface 
should be well-organised and should not have any tabs in it. This web application will 
be mainly used to ease the process of delivering medical aids and supplies.

## List of feature
# Main Page
1. A list of all the in-progress/scheduled flights is shown for the user to 
view.
2. Link the user to the view route page when the user selected a particular 
route. 
3. The list of scheduled/ongoing flights can be sorted by 
time/route/range.
4. Display no schedule has been made if the routes list is empty.
5. There should be a navigation drawer link to 4 different pages which is 
view routes page, flight history page, schedule new flights page and 
also view the fleet's page.

# Schedule Page
1. Present a map that can be interacted by the user.
2. Allow the user to input the date and time (to minutes) for a flight (All the 
time should be shown in the user’s timezone).
3. Allow user to select the departure and airport/country.
4. Allow the user to choose the plane available in the selected airport.
5. If the selected airport did not have any available plane of the selected 
airport, five nearest planes to the selected airport will be shown to the 
user for selection, including the endurance and range of the aeroplane.
6. Display error messages of no routes available if no flights are available 
in the selected time and route.
7. Allow users to select the arrival airport after they have selected the 
plane.
8. Display the weather forecast of the departure airport right at the start 
and the weather forecast the destination airport will be shown once the 
destination is confirmed (can choose minutely, hourly, daily).
9. Use a line to represent the routes between the airports.
10. Users should be able to schedule a flight whenever they want.

# View Route Page
1. Present a map for the user to interact.
2. Users are available to view the information of the route such as the 
type of plane, plate number of the plane, name of the departure and 
arrival airport, countries travelling, route, entire travel time and the 
weather information.
3. All the ongoing flights should be labelled in different colours or styles 
and the route will be shown by a line on the map.
4. The route can be deleted here.

# History Page
1. Display the past routes in a list.
2. The routes can be sorted based on user preference (time, origin, 
destination, country, plane).
3. The user should have the ability to delete the records.

# View Fleet Page
1. Show all the fleet information of the available planes sorted by country.
