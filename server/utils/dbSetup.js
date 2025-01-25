/**
 * This file initializes and populates the MongoDB database with necessary collections and sample data
 */

const dbClient = require('./db');
// Get data from the JSON files (just require them directly)
const coursesData = require('../../client/dist/courses.json');
const usersData = require('../../client/dist/users.json');
const notificationsData = require('../../client/dist/notifications.json');
const updatesData = require('../../client/dist/updates.json');
const newsData = require('../../client/dist/news.json');


/* Function to insert data into the database */
async function insertToDB() {
  try {
    // Wait for the connection to be established
    await dbClient.connect();

    // Insert the data into the collections
    await dbClient.coursesCollection.insertMany(coursesData);
    await dbClient.usersCollection.insertMany(usersData);
    await dbClient.notificationsCollection.insertMany(notificationsData);
    await dbClient.updatesCollection.insertMany(updatesData);
    await dbClient.newsCollection.insertMany(newsData);

    console.log('dbSetup: Data inserted successfully!');
  } catch (err) {
    console.error('dbSetup: Error:', err);
  } finally {
    // Close the database connection
    await dbClient.client.close();
    console.log('dbSetup: Database connection closed after inserting Data');
  }
}

insertToDB();