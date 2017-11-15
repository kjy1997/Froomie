avatar = new FileCollection('avatar',
  { resumable: true,   // Enable built-in resumable.js upload support
    http: [
      { method: 'get',
        path: '/:id',  // this will be at route "/gridfs/avatar/:id"
        lookup: function (params, query) {  // uses express style url params
          return { _id: new Mongo.ObjectID(params.id) };       // a query mapping url to avatar
        }
      }
    ]
  }
);

if (Meteor.isServer) {

  // Only publish files owned by this userId, and ignore
  // file chunks being used by Resumable.js for current uploads
  Meteor.publish('avatar',
    function (clientUserId) {
      if (clientUserId === this.userId) {
        return avatar.find({ 'metadata._Resumable': { $exists: false },
                              'metadata.owner': this.userId });
      } else {        // Prevent client race condition:
        return null;  // This is triggered when publish is rerun with a new
                      // userId before client has resubscribed with that userId
      }
    }
  );

  // Allow rules for security. Should look familiar!
  // Without these, no file writes would be allowed
  avatar.allow({
    // The creator of a file owns it. UserId may be null.
    insert: function (userId, file) {
      // Assign the proper owner when a file is created
      file.metadata = file.metadata || {};
      file.metadata.owner = userId;
      return true;
    },
    // Only owners can remove a file
    remove: function (userId, file) {
      // Only owners can delete
      return (userId === file.metadata.owner);
    },
    // Only owners can retrieve a file via HTTP GET
    read: function (userId, file) {
      return true;
    },
    // This rule secures the HTTP REST interfaces' PUT/POST
    // Necessary to support Resumable.js
    write: function (userId, file, fields) {
      // Only owners can upload file data
      return (userId === file.metadata.owner);
    }
  });
}

if (Meteor.isClient) {

  Meteor.startup(function() {
      $.cookie('X-Auth-Token', Accounts._storedLoginToken(), { path: '/' });
  });
}