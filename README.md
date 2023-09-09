# flickpick-client

[flickpick Live App](https://myflickpick.netlify.app/login)

## Objective

`flickpick` is a concert movie-themed application developed using React.
The app serves as a client-side interface, enabling concert movie enthusiasts to browse movies,
access detailed information, and manage their profiles.
Users can also save data about their favorite films. The client communicates seamlessly with the
[existing server-side (REST API and database)](https://github.com/codestun/flickpick),
ensuring a consistent and enriched user experience.

## Features

### Essential Views & Features:

- **User Registration and Login**: New users can register, and existing users can log in.
- **Movie Browsing**: View a list of movies with their posters, titles, and descriptions.
- **Detailed Movie Info**: Clicking on a movie provides detailed information.
- **Profile Management**: Users can update their profiles, view favorite movies, and even deregister their account.
  They also have the option to delete their account and can add or remove movies from their list of favorites.
- **Search and Filter**: Users can search for movies and filter results based on criteria.

### Optional Features:

- **Actors View**: Information about different actors.
- **Genre View**: Data about a genre with example movies.
- **Director View**: Data about a director with example movies.
- **Related Movies**: Display a list of related or similar movies in the Single Movie view.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **JSX**: Syntax extension for JavaScript recommended by React.
- **Redux**: A predictable state container for JavaScript apps.
- **Bootstrap**: A popular CSS framework for creating responsive layouts.
- **Parcel**: A fast, zero configuration web application bundler.

## Development Environment

Ensure you have Node.js and npm installed on your machine before setting up the app.

### Setup Application

1. Install Parcel globally:
```
npm install -g parcel
```

2. Install necessary packages:
```
npm install -save react react-dom
```

3. Create a `src` folder in the project directory. Inside this folder, create three files:
   - `index.jsx`: Entry point for your React application.
   - `index.scss`: Global styles for your app.
   - `index.html`: Main HTML file.

4. To run the application in development mode:
```
parcel src/index.html --no-cache
```

Navigate to `http://localhost:1234` if the app doesn't automatically open in a new browser tab/window.
