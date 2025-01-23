const { MongoClient } = require('mongodb');


class DBClient {
    constructor() {
        this.dbName = 'schoolDashboard';
        this.url = `mongodb://localhost:27017`;
        this.client = new MongoClient(this.url);
        this.isAlive = false;  // Track connection status
    }

    // Connects to MongoDB if not already connected
    async connect() {
        if (!this.isAlive) {
            try {
                await this.client.connect();
                this.db = this.client.db(this.dbName);

                // Initialize collections
                this.coursesCollection = this.db.collection('courses');
                this.usersCollection = this.db.collection('users');
                this.notificationsCollection = this.db.collection('notifications');
                this.updatesCollection = this.db.collection('updates');
                this.newsCollection = this.db.collection('news');

                this.isAlive = true;  // Mark connection as established
                console.log('Connected to MongoDB');
            } catch (err) {
                console.error(`Failed to connect to MongoDB: ${err.message}`);
            }
        }
    }
}

const dbClient = new DBClient();
module.exports = dbClient;