/*

A SimpleSchema-compatible JSON schema

*/

import Users from 'meteor/vulcan:users';

//define schema
const schema = {
  _id: {
    optional: true,
    type: String,
    viewableBy: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    onInsert: (document, currentUser) => {
      return new Date();
    },
    viewableBy: ['members'],
  },
  userId: {
    type: String,
    viewableBy: ['members'],
    insertableBy: ['admins'],
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      resolver: (event, args, context) => context.Users.findOne({_id: event.userId}, {fields: context.getViewableFields(context.currentUser, context.Users)}),
      addOriginalField: true,
    },
    optional: true,
  },
  documentId: {
    type: String,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['admins'],
  },
  documentType: {
    type: String,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['admins'],
  },
  lastViewedPostId: { // whether to send this event to intercom or not
    type: String,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['admins'],
  },
  lastViewedPostTitle: { // whether to send this event to intercom or not
    type: String,
    optional: true,
    viewableBy: ['members'],
    insertableBy: ['admins'],
  }
};

export default schema;
