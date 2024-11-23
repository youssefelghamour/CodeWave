import * as notifications from '../../dist/notifications.json';
import { schema, normalize } from 'normalizr';


const user = new schema.Entity("users");
const message = new schema.Entity("messages", {}, { idAttribute: 'guid' });
const notification = new schema.Entity("notifications", { author: user, context: message });

export const normalizedData = normalize(notifications.default, [notification]);
export const notificationsNormalizer = (data) => normalize(data, [notification]).entities;

/*
normalizedData = {
  entities: {
    users: {
      'userId1': { id: 'userId1', name: { first: 'FirstName1', last: 'LastName1' }, email: 'user1@example.com', picture: 'http://placehold.it/32x32', age: 25 },
      'userId2': { id: 'userId2', name: { first: 'FirstName2', last: 'LastName2' }, email: 'user2@example.com', picture: 'http://placehold.it/32x32', age: 30 },
      ...
    },
    messages: {
      'messageId1': { guid: 'guid1', isRead: true , type: 'urgent', value: 'This is the content of message 1.' },
      'messageId2': { guid: 'guid2', isRead: false, type: 'urgent', value: 'This is the content of message 2.' },
      ...
    },
    notifications: {
      'notificationId1': { id: 'notificationId1', author: 'userId1', context: 'messageId1' },
      'notificationId2': { id: 'notificationId2', author: 'userId2', context: 'messageId2' },
      ...
    },
  },
  result: ['notificationId1', 'notificationId2', ...]
}
*/


const getAllNotificationsByUser = (userId) => {
  const notifs = normalizedData.entities.notifications;
  const msgs = normalizedData.entities.messages;

  let contexts = [];
  
  for (let notifId in notifs) {
    if (notifs[ notifId ].author === userId) {
      contexts.push( msgs[ notifs[ notifId ].context ] );
    }
  }
  
  return contexts;
};

export default getAllNotificationsByUser;