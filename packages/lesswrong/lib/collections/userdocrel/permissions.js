import Users from 'meteor/vulcan:users';
import UserDocRels from './collection.js';

const membersActions = [
  'userdocrels.new.own',
  'userdocrels.edit.own',
  'userdocrels.view.own',
];
Users.groups.members.can(membersActions);

const adminActions = [
  'userdocrels.new.all',
  'userdocrels.edit.all',
  'userdocrels.remove.all',
];
Users.groups.admins.can(adminActions);

UserDocRels.checkAccess = (user, document) => {
  if (!user || !document) return false;
  return Users.owns(user, document) ? Users.canDo(user, 'notifications.view.own') : Users.canDo(user, `conversations.view.all`)
    };
