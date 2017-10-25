import schema from './schema.js';
import Users from 'meteor/vulcan:users'
import { getDefaultResolvers, getDefaultMutations, createCollection } from 'meteor/vulcan:core';
/**
 * @summary Initiate UserDocRels collection
 * @namespace UserDocRels
 */

const options = {

  newCheck: (user, document) => {
    if (!user || !document) return false;
    return Users.owns(user, document) ? Users.canDo(user, 'userdocrels.new.own') : Users.canDo(user, `userdocrels.new.all`)
  },

  editCheck: (user, document) => {
    if (!user || !document) return false;
    return Users.owns(user, document) ? Users.canDo(user, 'userdocrels.edit.own') : Users.canDo(user, `userdocrels.edit.all`)
  },

  removeCheck: (user, document) => {
    if (!user || !document) return false;
    return Users.canDo(user, `userdocrels.remove.all`)
  },

}


const UserDocRels = createCollection({

  // collection: Meteor.notifications,

  collectionName: 'UserDocRels',

  typeName: 'UserDocRel',

  schema,

  resolvers: getDefaultResolvers('UserDocRels'),

  mutations: getDefaultMutations('UserDocRels', options),

});

export default UserDocRels;
