Meteor.publish('home-facts', function() {
  let sort = {submitted: -1};
  return Facts.find({}, {sort});
});

Meteor.publish('author-facts', function(author) {
  let sort = {submitted: -1};
  return Facts.find({author}, {sort});
});

Meteor.publish('planet-facts', function(planet) {
  let sort = {submitted: -1};
  return Facts.find({planet}, {sort});
});
