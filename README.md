# Urban API

Urban API is a RESTful API for managing an urban exploration database. It stores information about abandoned or historically interesting places, their categories and countries, and the explorers who record visits to those locations.

## Features

- Manage location categories.
- Manage countries.
- Manage urban exploration locations.
- Manage explorer profiles.
- Record exploration visits, notes, visit dates, and ratings.
- Retrieve an explorer's exploration history.
- Search locations by name, status, and city.
- Retrieve category and location records by slug.
- Perform CRUD operations using REST API endpoints.

## Tech Stack

- **Node.js** – JavaScript runtime
- **Express 5** – REST API framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB object modeling
- **dotenv** – Environment variable configuration
- **slugify** – Generate URL-friendly slugs
- **Nodemon** – Development server restart utility

## Project Structure

```text
Urban-API/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controller/
│   │   ├── category.controller.js
│   │   ├── country.controller.js
│   │   ├── exploration.controller.js
│   │   ├── explorer.controller.js
│   │   └── location.controller.js
│   ├── model/
│   │   ├── category.model.js
│   │   ├── country.model.js
│   │   ├── exploration.model.js
│   │   ├── explorer.model.js
│   │   └── location.model.js
│   ├── routes/
│   │   ├── category.routes.js
│   │   ├── country.routes.js
│   │   ├── exploration.routes.js
│   │   ├── explorer.routes.js
│   │   ├── location.routes.js
│   │   └── index.js
│   ├── app.js
│   └── server.js
├── My Collection.postman_collection.json
├── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd Urban-API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add your MongoDB connection string:

```env
DATABASE_URI=mongodb://127.0.0.1:27017/urban_api
```

Replace the value with your own MongoDB connection URI if you use MongoDB Atlas or another database instance.

### 4. Run the development server

```bash
npm run devStart
```

The server runs at:

```text
http://localhost:3000
```

The API uses port `3000`, which is currently defined directly in `src/server.js`.

## Database Models

The database consists of five main collections.

| Model | Description | Main fields |
|---|---|---|
| Category | Classification of urban locations | `name`, `slug`, `description` |
| Country | Country information | `name`, `code`, `continent` |
| Location | Urban exploration place information | `name`, `description`, `slug`, `categoryId`, `countryId`, `city`, `status`, `condition`, `yearAbandoned` |
| Explorer | Explorer profile information | `name`, `username`, `email`, `bio` |
| Exploration | A visit or exploration record | `explorerId`, `locationId`, `visitedAt`, `notes`, `rating` |

### Model Relationships

- A **Location** references one **Category** through `categoryId`.
- A **Location** references one **Country** through `countryId`.
- An **Exploration** references one **Explorer** through `explorerId`.
- An **Exploration** references one **Location** through `locationId`.
- An **Explorer** can have multiple exploration records.
- A **Location** can be referenced by multiple exploration records.

`categoryId`, `countryId`, `explorerId`, and `locationId` use MongoDB ObjectId references.

### Available Location Values

**Status**

- `abandoned`
- `restored`
- `demolished`
- `restricted`

**Condition**

- `good`
- `damaged`
- `deteriorating`
- `ruined`

## API Reference

Base URL:

```text
http://localhost:3000/api
```

All request bodies should use JSON (`Content-Type: application/json`). Replace `:id` and `:slug` with the corresponding MongoDB ObjectId or slug.

### Categories — `/categories`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/categories` | Get all categories |
| GET | `/categories/:id` | Get a category by ID |
| GET | `/categories/slug/:slug` | Get a category by slug |
| POST | `/categories` | Create a category |
| PUT | `/categories/:id` | Replace/update a category |
| PATCH | `/categories/:id` | Partially update a category |
| DELETE | `/categories/:id` | Delete a category |

### Countries — `/countries`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/countries` | Get all countries |
| GET | `/countries/:id` | Get a country by ID |
| POST | `/countries` | Create a country |
| PUT | `/countries/:id` | Replace/update a country |
| PATCH | `/countries/:id` | Partially update a country |
| DELETE | `/countries/:id` | Delete a country |

### Locations — `/locations`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/locations` | Get all locations; supports the query filters below |
| GET | `/locations/:id` | Get a location by ID |
| GET | `/locations/slug/:slug` | Get a location by slug |
| POST | `/locations` | Create a location |
| PUT | `/locations/:id` | Replace/update a location |
| PATCH | `/locations/:id` | Partially update a location |
| DELETE | `/locations/:id` | Delete a location |

Supported query filters currently implemented:

| Query parameter | Example | Description |
|---|---|---|
| `name` | `/locations?name=benteng` | Search by location name (case-insensitive partial match) |
| `status` | `/locations?status=abandoned` | Filter by status (case-insensitive partial match) |
| `city` | `/locations?city=ngawi` | Search by city (case-insensitive partial match) |

Filters can be combined, for example:

```http
GET /api/locations?city=ngawi&status=abandoned
```

### Explorers — `/explorers`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/explorers` | Get all explorers |
| GET | `/explorers/:id` | Get an explorer by ID |
| GET | `/explorers/:id/explorations` | Get an explorer's exploration history |
| POST | `/explorers` | Create an explorer profile |
| PUT | `/explorers/:id` | Replace/update an explorer |
| PATCH | `/explorers/:id` | Partially update an explorer |
| DELETE | `/explorers/:id` | Delete an explorer |

### Explorations — `/explorations`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/explorations` | Get all exploration records |
| GET | `/explorations?locationId=:locationId` | Filter explorations by location ID |
| GET | `/explorations/:id` | Get an exploration by ID |
| POST | `/explorations` | Create an exploration record |
| PUT | `/explorations/:id` | Replace/update an exploration record |
| PATCH | `/explorations/:id` | Partially update an exploration record |
| DELETE | `/explorations/:id` | Delete an exploration record |

## Example Requests

The following examples show the expected request body fields based on the Mongoose models.

### Create a Category

```http
POST /api/categories
```

```json
{
  "name": "Railway Station",
  "description": "Abandoned or unused railway stations."
}
```

The API generates the category `slug` from its name.

### Create a Country

```http
POST /api/countries
```

```json
{
  "name": "Indonesia",
  "code": "ID",
  "continent": "Asia"
}
```

### Create a Location

```http
POST /api/locations
```

```json
{
  "name": "Old Railway Station",
  "description": "An old railway station recorded in the urban exploration database.",
  "categoryId": "CATEGORY_OBJECT_ID",
  "countryId": "COUNTRY_OBJECT_ID",
  "city": "Example City",
  "status": "abandoned",
  "condition": "deteriorating",
  "yearAbandoned": 1998
}
```

The API generates the location `slug` from its name.

### Create an Explorer

```http
POST /api/explorers
```

```json
{
  "name": "Alex Explorer",
  "username": "alexexplorer",
  "email": "alex@example.com",
  "bio": "Interested in documenting urban places."
}
```

### Create an Exploration Record

```http
POST /api/explorations
```

```json
{
  "explorerId": "EXPLORER_OBJECT_ID",
  "locationId": "LOCATION_OBJECT_ID",
  "visitedAt": "2026-01-15T09:00:00.000Z",
  "notes": "Recorded the visible condition and history of the location.",
  "rating": 8
}
```

The `rating` field, when provided, must be between 1 and 10.

## PUT vs PATCH

- **PUT** is intended to replace/update the resource using the submitted request body.
- **PATCH** updates only the fields included in the request body; fields not included remain unchanged.

Example PATCH request:

```http
PATCH /api/locations/LOCATION_OBJECT_ID
```

```json
{
  "condition": "damaged"
}
```

## Response Format

Responses generally use JSON. Collection endpoints commonly return a `success` property and a `data` property. For example:

```json
{
  "success": true,
  "data": []
}
```

Create endpoints generally return HTTP status `201` when a record is created successfully. A resource that cannot be found generally returns `404`; validation or request errors generally return `400`.

## Testing with Postman

A Postman collection is included in the repository:

```text
My Collection.postman_collection.json
```

Import this file into Postman to try the available API requests. Make sure the server is running and update request IDs to match records in your own database.

## Notes

- This project currently provides API routes for data management; it does not include a frontend interface.
- The server currently uses a fixed port (`3000`).
- Keep your `.env` file and database credentials private. Do not commit secrets to a public repository.

## License

This project is currently marked with the `ISC` license in `package.json`.
