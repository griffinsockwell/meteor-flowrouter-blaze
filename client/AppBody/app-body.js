const CONNECTION_ISSUE = 'ConnectionIssue';

Session.setDefault(CONNECTION_ISSUE, true);

Meteor.startup(function() {
  setTimeout(function() {
    Session.set(CONNECTION_ISSUE, false);
  }, 5000);
});

Template.appBody.helpers({
  connected() {
    return Session.get(CONNECTION_ISSUE) || Meteor.status().connected;
  }
});
