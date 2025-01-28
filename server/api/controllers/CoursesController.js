const dbClient = require('../../utils/db');


/**
 * CoursesController class that handles course-related API endpoints
 */
class CoursesController {
    /* CREATE /courses: creates a new course */
    async createCourse(req, res) {
        try {
            // Get the object (key-value pairs) from the request body
            const newData = req.body;

            // Check if the new object contains an id
            if (!("id" in newData)) {
                return res.status(400).json({ error: `Missing id` });
            }

            // Check if a course with this id already exists
            const existingCourseById = await dbClient.coursesCollection.findOne({ id: newData.id.toString() });
            if (existingCourseById) {
                return res.status(400).json({ error: "Course with this ID already exists" });
            }

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
        /* In case we're using mongodb's _id, we need to convert it to string and the field to id for Nomalizr
        const modifiedCourses = courses.map((course) => {
            return {
                ...course,
                id: course._id.toString(), // Use `_id` as the new `id` (converted to a string)
                _id: undefined,
            };
        });
        */
        return res.status(200).json(courses);
    }


    /* GET /courses/id: returns the user with the id */
    async getCourseByID(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        const id = req.params.id;
        // Fetch the course from the database
        const course = await dbClient.coursesCollection.findOne({ id: id});

        if (course) {
            return res.status(200).json(course);
        } else {
            return res.status(400).json({ error: `No Course with id: ${req.params.id}` });
        }
    }


    /* UPDATE /courses/id: updates the course with the id */
    async updateCourse(req, res) {
        // get the id from URL parameter (string, so we have to turn it to int)
        const id = req.params.id;
        // Get all the fields (key-value pairs to update) from the request body
        const updateData = req.body;
        // Fetch the course from the database
        const course = await dbClient.coursesCollection.findOne({ id: id});

        if (course) {
            // Update the course
            await dbClient.coursesCollection.updateOne({ id: id}, { $set: updateData });
            // Fetch the updated course
            const updatedCourse = await dbClient.coursesCollection.findOne({ id: id });
            return res.status(200).json(updatedCourse);
        } else {
            return res.status(400).json({ error: `No Course with id: ${req.params.id}` });
        }
    }


    /* DELETE /courses/id: deletes a user with the id */
    async deleteCourse(req, res) {
        const id = req.params.id;
        const course = await dbClient.coursesCollection.findOne({ id: id});

        if (course) {
            await dbClient.coursesCollection.deleteOne({ id: id});
            return res.status(200).json({ message: "Course deleted successfully" });
        } else {
            return res.status(404).json({ error: `No Course with id: ${req.params.id}` });
        }
    }
}


module.exports = new CoursesController();