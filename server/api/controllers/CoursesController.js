const dbClient = require('../../utils/db');
const { ObjectId } = require('mongodb');


/**
 * CoursesController class that handles course-related API endpoints
 */
class CoursesController {
    /* CREATE /courses: creates a new course */
    async createCourse(req, res) {
        try {
            // Get the object (key-value pairs) from the request body
            const newData = req.body;

            // Create the new course
            const newCourse = await dbClient.coursesCollection.insertOne(newData);
            return res.status(201).json(newCourse);
        } catch (error) {
            return res.status(400).json({ error: "Failed creating a new Course" });
        }
    }


    /* GET /courses: returns all the courses from the coursesCollection */
    async getCourses(req, res) {
        // Fetch all courses (toArray because find() returns a cursor)
        const courses = await dbClient.coursesCollection.find().toArray();
        const modifiedCourses = courses.map((course) => {
            return {
                ...course,
                id: course._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
        });
        return res.status(200).json(modifiedCourses);
    }


    /* GET /courses/id: returns the user with the id */
    async getCourseByID(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        let id = req.params.id;

        // Check if the id is a valid ObjectId format
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        // Convert the id to ObjectId
        id = new ObjectId(id);

        // Fetch the course from the database
        let course = await dbClient.coursesCollection.findOne({ _id: id});

        if (course) {
            course = {
                ...course,
                id: course._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
            return res.status(200).json(course);
        } else {
            return res.status(400).json({ error: `No Course with id: ${req.params.id}` });
        }
    }


    /* UPDATE /courses/id: updates the course with the id */
    async updateCourse(req, res) {
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
        // Fetch the course from the database
        const course = await dbClient.coursesCollection.findOne({ _id: id});

        if (course) {
            // Update the course
            await dbClient.coursesCollection.updateOne({ _id: id}, { $set: updateData });
            // Fetch the updated course
            let updatedCourse = await dbClient.coursesCollection.findOne({ _id: id });
            updatedCourse = {
                ...updatedCourse,
                id: updatedCourse._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
            return res.status(200).json(updatedCourse);
        } else {
            return res.status(400).json({ error: `No Course with id: ${req.params.id}` });
        }
    }


    /* DELETE /courses/id: deletes a user with the id */
    async deleteCourse(req, res) {
        let id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        id = new ObjectId(id);

        const course = await dbClient.coursesCollection.findOne({ _id: id});

        if (course) {
            await dbClient.coursesCollection.deleteOne({ _id: id});
            return res.status(200).json({ message: "Course deleted successfully" });
        } else {
            return res.status(404).json({ error: `No Course with id: ${req.params.id}` });
        }
    }
}


module.exports = new CoursesController();