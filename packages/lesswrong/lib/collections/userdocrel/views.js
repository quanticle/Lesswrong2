import UserDocRels from './collection.js';

UserDocRels.addView("UserDocRel", function (terms) {
  return {
    selector: {
      documentId: terms.postId,
      userId: terms.userId,
      name: "user-doc-rel",
      deleted: {$ne:true}
    },
    options: {sort: {createdAt: -1}, limit: terms.limit || 1},
  };
});
