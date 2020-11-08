# Bettr Trip - Read Me

If you're planning a trip then look no further. Bettr Trip allows you to search and save locations for your trip, and organizes everything into an adjustable itinerary. Plus, it gives you important details such as routes between destinations, recommended locations to visit, and weather forecasts. Trip planning has never been easier with Bettr Trip!

## Installation
You will need two terminals for this.

In one terminal, run `bundle` to install the dependencies. Run `bin/rake db:setup` to create the databases (called rails_project_development by default). Run `bin/rails s` to run the server.

In the other terminal, `cd` into `client`. Run `npm install`. Then run `npm start` and go to `localhost:3000` in your browser.

## Running the tests

No tests added to this project.

## App Flow

Welcome to Bettr Trip! 

Choose dates for your trip, search locations to add and drag and drop them into your calendar.

![](Gif1.gif)

Add more locations to view routes between destinations based on method of travel.

![](Gif2.gif)

Open the Reccomendations tab to view suggested places and their location on the map.

![](Gif3.gif)

Use the OverView to show your full itineray, the forecasted weather for your saved locations, and travel time between locations.

![](Gif4.gif)

## APIs and Tech Stack
This project used ReactJs for the Frontend and Ruby on Rails for the Backend.

APIs used were DarkSky: Forecast and Time Machine, Google: Maps JavaScript, Places, Distance Matrix, Directions.

## Authors

* Alan Mo: https://www.linkedin.com/in/alan-mo-a5377b144/
* Kaiteng Lo: https://www.linkedin.com/in/kaiteng-lo-968b2697/
* Jashan Brar: https://www.linkedin.com/in/jashan-brar/

## License

This project is licensed under the LHL License
