Facts = new Mongo.Collection('facts');

Meteor.methods({
  addFact(planet, fact) {
    var planet = planet.toString();

    check(planet, String);
    check(fact, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    let userId = Meteor.userId();
    let author = Meteor.user().username;
    let submitted = new Date();

    if (fact.length > 0 && fact.length <= 160) {
      Facts.insert({userId, author, planet, fact, submitted});
    }
  },
  updateFact(factId, fact) {
    check(factId, String);
    check(fact, String);

    var factId = Facts.findOne(factId);

    if (factId.userId !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    if (fact.length > 0 && fact.length <= 160) {
      Facts.update(factId, { $set: {fact} });
    }
  },
  removeFact(factId) {
    check(factId, String);

    var factId = Facts.findOne(factId);

    if (factId.userId !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Facts.remove(factId);
  }
});
