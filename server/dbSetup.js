const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const dbName = 'schoolDashboard';

// Function to connect to MongoDB
async function insertToDB() {
  const client = new MongoClient(uri);

  try {
    // Connect to the client and database
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);

    // Read data from the JSON files (just require them directly)
    const coursesData = require('../dist/courses.json');
    const usersData = require('../dist/users.json');
    const notificationsData = require('../dist/notifications.json');
    const updatesData = require('../dist/updates.json');
    const newsData = require('../dist/news.json');

    // Create the collections in the database
    const coursesCollection = db.collection('courses');
    const usersCollection = db.collection('users');
    const notificationsCollection = db.collection('notifications');
    const updatesCollection = db.collection('updates');
    const newsCollection = db.collection('news');

    // Insert the data into the collections using insertMany
    await coursesCollection.insertMany(coursesData);
    await usersCollection.insertMany(usersData);
    await notificationsCollection.insertMany(notificationsData);
    await updatesCollection.insertMany(updatesData);
    await newsCollection.insertMany(newsData);

    console.log('Data inserted successfully!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Ensure the client is closed after operations
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

insertToDB();