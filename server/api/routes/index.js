const express = require('express');
const path = require('path');
const UsersController = require('../controllers/UsersController');
const CoursesController = require('../controllers/CoursesController');
const NotificationsController = require('../controllers/NotificationsController');


const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'help.html'));
});


/* Users Routes */

// CREATE a new user
router.post('/users', UsersController.createUser);
// GET all users
router.get('/users', UsersController.getUsers);
// GET a user by id
router.get('/users/:id', UsersController.getUserByID);
// UPDATE a user by id
router.put('/users/:id', UsersController.updateUser);
// DELETE a user by id
router.delete('/users/:id', UsersController.deleteUser);


/* Courses Routes */

// CREATE a new course
router.post('/courses', CoursesController.createCourse);
// GET all courses
router.get('/courses', CoursesController.getCourses);
// GET a course by id
router.get('/courses/:id', CoursesController.getCourseByID);
// UPDATE a course by id
router.put('/courses/:id', CoursesController.updateCourse);
// DELETE a course by id
router.delete('/courses/:id', CoursesController.deleteCourse);


/* Notifications Routes */

// CREATE a new notification
router.post('/notifications', NotificationsController.createNotification);
// GET all notifications
router.get('/notifications', NotificationsController.getNotifications);
// GET a notification by id
router.get('/notifications/:id', NotificationsController.getNotificationByID);
// UPDATE a notification by id
router.put('/notifications/:id', NotificationsController.updateNotification);
// DELETE a notification by id
router.delete('/notifications/:id', NotificationsController.deleteNotification);


module.exports = router;