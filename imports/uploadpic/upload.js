avatar = new FileCollection('avatar',
  { resumable: true,   // Enable built-in resumable.js upload support
    http: [
      { method: 'get',
        path: '/:md5',  // this will be at route "/gridfs/avatar/:md5"
        lookup: function (params, query) {  // uses express style url params
          return { md5: params.md5 };       // a query mapping url to avatar
        }
      }
    ]
  }
);

if (Meteor.isServer) {

  // Only publish files owned by this userId, and ignore
  // file chunks being used by Resumable.js for current uploads
  Meteor.publish('myData',
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
      return (userId === file.metadata.owner);
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

    // This assigns a file upload drop zone to some DOM node
    avatar.resumable.assignDrop($(".fileDrop"));

    // This assigns a browse action to a DOM node
    // avatar.resumable.assignBrowse($(".fileBrowse"));

    // When a file is added via drag and drop
    // avatar.resumable.on('fileAdded', function (file) {

    //   // Create a new file in the file collection to upload
    //   avatar.insert({
    //     _id: file.uniqueIdentifier,  // This is the ID resumable will use
    //     filename: file.fileName,
    //     contentType: file.file.type
    //     },
    //     function (err, _id) {  // Callback to .insert
    //       if (err) { return console.error("File creation failed!", err); }
    //       // Once the file exists on the server, start uploading
    //       avatar.resumable.upload();
    //     }
    //   );
    // });

    // // This autorun keeps a cookie up-to-date with the Meteor Auth token
    // // of the logged-in user. This is needed so that the read/write allow
    // // rules on the server can verify the userId of each HTTP request.
    // Deps.autorun(function () {
    //   // Sending userId prevents a race condition
    //   Meteor.subscribe('myData', Meteor.userId());
    //   // $.cookie() assumes use of "jquery-cookie" Atmosphere package.
    //   // You can use any other cookie package you may prefer...
    //   $.cookie('X-Auth-Token', Accounts._storedLoginToken(), { path: '/' });
    // });
  });
}