const dbClient = require('../../utils/db');


/**
 * NewsController class that handles news-related API endpoints
 */
class NewsController {
    /* CREATE /news: creates a new news */
    async createNews(req, res) {
        try {
            // Get the object (key-value pairs) from the request body
            const newData = req.body;

            // Check if the new object contains an id
            // Check if the new object contains an id
            if (!("id" in newData)) {
                return res.status(400).json({ error: `Missing id` });
            }

            // Check if a news with this id already exists
            const existingNewsById = await dbClient.newsCollection.findOne({ id: newData.id });
            if (existingNewsById) {
                return res.status(400).json({ error: "News with this ID already exists" });
            }

            // Create the new news
            const newNews = await dbClient.newsCollection.insertOne(newData);
            return res.status(201).json(newNews);
        } catch (error) {
            return res.status(400).json({ error: "Failed creating a new News" });
        }
    }


    /* GET /news: returns all the news from the newsCollection */
    async getNews(req, res) {
        // Fetch all news (toArray because find() returns a cursor)
        const news = await dbClient.newsCollection.find().toArray();
        return res.status(200).json(news);
    }


    /* GET /news/id: returns the news with the id */
    async getNewsByID(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        const id = Number(req.params.id);
        // Fetch the news from the database
        const news = await dbClient.newsCollection.findOne({ id: id});

        if (news) {
            return res.status(200).json(news);
        } else {
            return res.status(400).json({ error: `No News with id: ${req.params.id}` });
        }
    }


    /* UPDATE /news/id: updates the news with the id */
    async updateNews(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        const id = Number(req.params.id);
        // Get all the fields (key-value pairs to update) from the request body
        const updateData = req.body;
        // Fetch the news from the database
        const news = await dbClient.newsCollection.findOne({ id: id});

        if (news) {
            // Update the news
            await dbClient.newsCollection.updateOne({ id: id}, { $set: updateData });
            // Fetch the updated news
            const updatedNews = await dbClient.newsCollection.findOne({ id: id });
            return res.status(200).json(updatedNews);
        } else {
            return res.status(400).json({ error: `No News with id: ${req.params.id}` });
        }
    }


    /* DELETE /news/id: deletes a news with the id */
    async deleteNews(req, res) {
        const id = Number(req.params.id);
        const news = await dbClient.newsCollection.findOne({ id: id});

        if (news) {
            await dbClient.newsCollection.deleteOne({ id: id});
            return res.status(200).json({ message: "News deleted successfully" });
        } else {
            return res.status(404).json({ error: `No News with id: ${req.params.id}` });
        }
    }
}


module.exports = new NewsController();