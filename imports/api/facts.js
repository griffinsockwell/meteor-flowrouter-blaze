import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Facts = new Mongo.Collection('facts');

if (Meteor.isServer) {
  Meteor.publish('home-facts', () => {
    const sort = { submitted: -1 };
    return Facts.find({}, { sort });
  });

  Meteor.publish('author-facts', (author) => {
    const sort = { submitted: -1 };
    return Facts.find({ author }, { sort });
  });

  Meteor.publish('planet-facts', (planet) => {
    const sort = { submitted: -1 };
    return Facts.find({ planet }, { sort });
  });
}

Meteor.methods({
  addFact(planetName, factText) {
    check(planetName, String);
    check(factText, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    const userId = Meteor.userId();
    const displayName = Meteor.user().username;
    const author = Meteor.user().username.toLowerCase();
    const planet = planetName.toString().toLowerCase();
    const fact = factText;
    const submitted = new Date();

    if (fact.length > 0 && fact.length <= 160) {
      Facts.insert({ userId, displayName, author, planet, fact, submitted });
    }
  },
  updateFact(factId, fact) {
    check(factId, String);
    check(fact, String);

    const userFact = Facts.findOne(factId);

    if (userFact.userId !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    if (fact.length > 0 && fact.length <= 160) {
      Facts.update(factId, { $set: { fact } });
    }
  },
  removeFact(factId) {
    check(factId, String);

    const userFact = Facts.findOne(factId);

    if (userFact.userId !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Facts.remove(factId);
  },
});
