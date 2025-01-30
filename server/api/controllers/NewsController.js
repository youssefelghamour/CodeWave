const dbClient = require('../../utils/db');
const { ObjectId } = require('mongodb');


/**
 * NewsController class that handles news-related API endpoints
 */
class NewsController {
    /* CREATE /news: creates a new news */
    async createNews(req, res) {
        try {
            // Get the object (key-value pairs) from the request body
            const newData = req.body;

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
        const modifiedNews = news.map((news) => {
            return {
                ...news,
                id: news._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
        });
        return res.status(200).json(modifiedNews);
    }


    /* GET /news/id: returns the news with the id */
    async getNewsByID(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        let id = req.params.id;

        // Check if the id is a valid ObjectId format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        // Convert the id to ObjectId
        id = new ObjectId(id);

        // Fetch the news from the database
        let news = await dbClient.newsCollection.findOne({ _id: id});

        if (news) {
            news = {
                ...news,
                id: news._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
            return res.status(200).json(news);
        } else {
            return res.status(400).json({ error: `No News with id: ${req.params.id}` });
        }
    }


    /* UPDATE /news/id: updates the news with the id */
    async updateNews(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        let id = req.params.id;

        // Check if the id is a valid ObjectId format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        // Convert the id to ObjectId
        id = new ObjectId(id);

        // Get all the fields (key-value pairs to update) from the request body
        const updateData = req.body;
        // Fetch the news from the database
        const news = await dbClient.newsCollection.findOne({ _id: id});

        if (news) {
            // Update the news
            await dbClient.newsCollection.updateOne({ _id: id}, { $set: updateData });
            // Fetch the updated news
            let updatedNews = await dbClient.newsCollection.findOne({ _id: id });
            updatedNews = {
                ...updatedNews,
                id: updatedNews._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
            return res.status(200).json(updatedNews);
        } else {
            return res.status(400).json({ error: `No News with id: ${req.params.id}` });
        }
    }


    /* DELETE /news/id: deletes a news with the id */
    async deleteNews(req, res) {
        let id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        id = new ObjectId(id);

        const news = await dbClient.newsCollection.findOne({ _id: id});

        if (news) {
            await dbClient.newsCollection.deleteOne({ _id: id});
            return res.status(200).json({ message: "News deleted successfully" });
        } else {
            return res.status(404).json({ error: `No News with id: ${req.params.id}` });
        }
    }
}


module.exports = new NewsController();