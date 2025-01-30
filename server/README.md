# CodeWave API

The CodeWave API powers the backend of the CodeWave School Website, handling user authentication, course management, notifications, news updates, and more.

## API Endpoints

## Users

- Get all users:
```bash
curl http://localhost:5000/users
```

- Create a new user:
```bash
curl -X POST http://localhost:5000/users -H "Content-Type: application/json" -d '{ "id": 3, "email": "user3@email.com", "password": "password3", "firstName": "user3", "lastName": "OldLastName", "studentId": "128 011", "cohort": "19", "courses": [ { "id": "1", "name": "JavaScript Basics", "credit": 60, "start_date": "2024-10-01", "end_date": "2024-12-01", "duration": "3 months", "status": "In Progress", "isSelected": false }, { "id": "2", "name": "Node.js Basics", "credit": 50, "start_date": "2024-11-01", "end_date": "2024-12-01", "duration": "1 month", "status": "In Progress", "isSelected": false }] }'
```

- Get a user by id:
```bash
curl http://localhost:5000/users/5
```

- Update a user:
```bash
curl -X PUT http://localhost:5000/users/3 -H "Content-Type: application/json" -d '{ "lastName": "NewLastName" }'
```

## Courses

- Get all courses:
```bash
curl http://localhost:5000/courses
```

- Create a new course:
```bash
curl -X POST http://localhost:5000/courses -H "Content-Type: application/json" -d '{ "id":"5","name":"ES6", "credit":60, "start_date":"2024-09-01", "end_date":"2024-12-01", "duration":"3 months", "status":"Completed"}'
```

- Get a course by id:
```bash
curl http://localhost:5000/courses/5
```

- Update a course:
```bash
curl -X PUT http://localhost:5000/courses/5 -H "Content-Type: application/json" -d '{ "name": "Updated Course Name" }'
```

- Delete a course:
```bash
curl -X DELETE http://localhost:5000/courses/5
```

## Notifications

- Get all notifications:
```bash
curl http://localhost:5000/notifications
```

- Create a new notification:
```bash
curl -X POST http://localhost:5000/notifications -H "Content-Type: application/json" -d '{ "id":"5", "author": { "id": "5debd764a7c57c7839d722e9", "name": { "first": "user", "last": "lastname" }, "email": "user.name@email.com", "picture": "http://placehold.it/32x32", "age": 25 }, "context": { "guid": "2d8e40be-1c78-4de0-afc9-fcc147afd4d2", "isRead": true, "type": "urgent", "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit." } }'
```

- Get a notification by id:
```bash
curl http://localhost:5000/notifications/5
```

- Update a notification:
```bash
curl -X PUT http://localhost:5000/notifications/5 -H "Content-Type: application/json" -d '{"context.isRead": false}'
```

- Delete a notification:
```bash
curl -X DELETE http://localhost:5000/notifications/5
```

## News

- Get all news:
```bash
curl http://localhost:5000/news
```

- Create a new news article:
```bash
curl -X POST http://localhost:5000/news -H "Content-Type: application/json" -d '{ "id": 5, "image": "news1.jpg", "type": "Sports", "title": "Exciting News", "subtitle": "An exciting day of competition and celebration.", "content": "Full article content here.", "date": "14 November 2024" }'
```

- Get a news by id:
```bash
curl http://localhost:5000/news/5
```

- Update a news article:
```bash
curl -X PUT http://localhost:5000/news/5 -H "Content-Type: application/json" -d '{"type": "Updated News Type"}'
```

- Delete a news article:
```bash
curl -X DELETE http://localhost:5000/news/5