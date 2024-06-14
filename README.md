# Content
1. [Description](#description)
2. [Functionalities](#functionalities)
   - [Main Functionality](#main-functionality)
   - [Freestyle Functionality](#freestyle-functionality)
3. [Technologie](#technologie)
4. [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
5. [Usage](#usage)
6. [Routes Structure](#routes-structure)
   - [Backend Routes](#backend-routes)
   - [Frontend Routes](#frontend-routes)
7. [Testing](#testing)


## Description
ReisePlanung Platform is a platform where users can search,create and edit trips and destinations.The Platform provides also an additional features like infomations about countries.

## Functionalities


### Main Functionality
1. CRUD (Create, Read, Edit, Delete) operations for trips and destinations.
2. Search functionalities for trips and destinations.

### Freestyle Functionality
1. Extern Api : Having Informations(Name,Capital,Poulation,Currency) about countries.

## Technologies
- **Backend**: Node.js, Express
- **Frontend**: React, Vite
- **External APIs**: Api Ninjas

## Installation

### Prerequisites
- Node.js 
- npm  
- Mikro-orm
- React
- Vite


### Backend Setup
1. Setup the database with Docker:
   ```sh
   Docker compose up
   ```
2. Navigate to the directory:
   ```sh
   cd Backend
   ```
3. Create the shema in database:
   ```sh
   npm run schema:fresh
   ```
4. Install dependencies:
   ```sh
   npm install

5. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the directory:
   ```sh
   cd Frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Usage
1. After running `npm run dev` in The frontend directory,you get the port where the plattform is running.
2. The Nagigation Menu is on the left side, when you click on it you get the functionality of the app.
3. CRUD (Create, Read, Edit, Delete) operations for trips in Reisen Ansicht. 
4. CRUD (Create, Read, Edit, Delete) operations for destinations in Reiseziel Ansicht.
5. Search functionalities for trips in Reise suchen.
6. Search functionalities for destinations in Reisen von Reiseziel suchen.
7. Search about countries in Countries infos.

## Routes Structure

### Backend Routes

#### Trip Routes
- `GET /reise` - Get all the trips.
- `POST /reise` - Create a new trip.
- `PUT /reise/:id` - Edit a trip by ID.
- `DELETE /reise/:id` - Delete a trip by ID.
- `GET /reise/:name` - Get a trip by Name.
- `POST /reise/:id` - Add the trips to the destination and add the destination to the trip.
- `DELETE /reise/:id/reiseziel/:reisezielId` - Delete a destination from the trip by ID.

#### Destination Routes
- `GET /reiseziel` - Get all destinations.
- `POST /reiseziel` - Create a new destination.
- `PUT /reiseziel/:id` - Edit a destination by ID.
- `DELETE /reiseziel/:id` - Delete a destination by ID.
- `GET /reiseziel/:reisezielId` - Get all the trips that belongs to this destination.
- `GET /reiseziel/des/:name` - Extern API: Get The Infomations about countries.


### Frontend Routes
- `/` - Home page
- `/details` - Trips details page
- `/reisesuchen` - Destination details page
- `/reise` - Search a trip by Name
- `/reiseziel` - Get all trips that belongs to a destination
- `/countries` - Countries informations page


## Testing

### Postman-Collection 
The Description of how you can test the backend.
1. You create a Collection in Postman App
2. You add each route as a request 

- GET: `http://localhost:4000/reise` : As response, you will get all the trips that you posted.
- GET: `http://localhost:4000/reiseziel` : As response, you will get all the destinations that you posted.
- POST: `http://localhost:4000/reise` : Here you need to have a body as a request to post the body, as response you will get the trip that you posted.
- POST: `http://localhost:4000/reiseziel` : Here you need to have a body as a request to post the body, as response you will get the destination that you posted.
- PUT: `http://localhost:4000/reise/:id`: Here you choose an id for the request and have a body also, as response you will get the trip that you changed.
- PUT: `http://localhost:4000/reiseziel/:id`: Here you choose an id for the request and have a body also, as response you will get the destination that you changed.
- DELETE: `http://localhost:4000/reise/:id`: Here you choose an id for the request, as response you will message that your trip is deleted.
- DELETE: `http://localhost:4000/reiseziel/:id`: Here you choose an id for the request, as response you will message that your destination is deleted.
- GET: `http://localhost:4000/reise/:name`: Here you choose the name that you wanna search about it, as response you will get the trip that you are searching about it.
- POST: `http://localhost:4000/reise/:id`: Here you choose the id in request as trip-id and the id in the body as destination-id, as response you will get the trip with the destination that you posted.
- DELETE: `http://localhost:4000/reise/:id/reiseziel/:reisezielId`: Here you choose the id as trip-id and the reisezielId as destination-id, as response you will message that your destination is removed from the trip.
- GET: `http://localhost:4000/reiseziel/:reisezielId`: Here you choose the id as destination-id, as response you will get the trip without the destination that you deleted.
- GET: `http://localhost:4000/reiseziel/des/:name`: Here you choose the name of the country that you wannna search about it.




This README provides a comprehensive guide to understanding, setting up, and using the plattform. If you have any specific questions or need further assistance, feel free to ask!