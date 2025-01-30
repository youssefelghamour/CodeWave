![Dashboard1](./client/src/assets/hero1.png)

[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)](#)
[![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=fff)](#)
[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)

# CodeWave School Website

The **`CodeWave School Website`** is a school portal designed to help students track their academic progress and stay informed. It allows students to log in, view their courses, monitor their progress and scores, and keep up with the latest news and updates from the school.

## Features

- **Student Login**: Secure authentication for students to access their personalized dashboard.
- **Course Management**: Students can view and track their enrolled courses, assignments, and scores.
- **Progress Tracking**: Real-time tracking of academic performance and grades.
- **School Updates**: Displays news, announcements, and updates from the school.
- **Responsive UI**: A dynamic layout that adapts to both desktop and mobile devices.

## Technologies Used

- **JavaScript (ES6)**: Language used for building the dashboard.
- **React**: Frontend JavaScript library for building the user interface.
- **Redux**: State management library for handling user data and application state.
- **React Router**: For dynamic routing within the application.
- **Aphrodite**: Library for managing inline styles and dynamic styling in React.
- **Redux Thunk**: Middleware for handling async actions in Redux to fetch data from the API.
- **Normalizr**: Data normalization library for the data fetched from the API.
- **Immutable.js**: Data structures for managing state immutability.
- **Webpack**: Module bundler for JavaScript applications.

## Setup

To set up the project locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/youssefelghamour/CodeWave.git

# Navigate to the client directory and install dependencies
cd CodeWave/client
npm install

# Start the React app
npm start
```

Open a new terminal window for the API setup:

```bash
# Navigate to the server directory
cd CodeWave/server

# Install server dependencies
npm install

# Set up and populate the database
node utils/dbSetup.js

# Start the API
node api/server.js
```

Finally, access the app at `http://localhost:8080`.

Additionally, you can visit the API help page at `http://localhost:5000`.

## Demo Video

https://github.com/user-attachments/assets/16b1b974-bde0-4606-bac1-c0587c447953

## Authors

- **Youssef El Ghamour** - [GitHub](https://github.com/youssefelghamour) | [LinkedIn](https://www.linkedin.com/in/youssefelghamour/)

The frontend of this project is derived from another one of my projects. To explore the full commit history or check out the original repository, visit [this link](https://github.com/youssefelghamour/alx-react).

![Dashboard1](./client/src/assets/hero2.png)