Meteor.startup(function() {
  if (Facts.find().count() === 0) {
    var now = new Date().getTime();

    // create users
    var userOneId = Meteor.users.insert({ profile: { name: 'astrofan' } });
    var userOne = Meteor.users.findOne(userOneId);

    var userTwoId = Meteor.users.insert({ profile: { name: 'spacedude' } });
    var userTwo = Meteor.users.findOne(userTwoId);

    var userThreeId = Meteor.users.insert({ profile: { name: 'rocketwoman' } });
    var userThree = Meteor.users.findOne(userThreeId);

    var userFourId = Meteor.users.insert({ profile: { name: 'ftlengineguru' } });
    var userFour = Meteor.users.findOne(userFourId);

    // create facts
    var data = [{
      userId: userOne._id,
      author: userOne.profile.name,
      planet: "Mercury",
      fact: "Mercury is the smallest and closest to the Sun of the eight planets in the Solar System, with an orbital period of about 88 Earth days.",
      submitted: new Date(now - 1 * 3600 * 1000)
    }, {
      userId: userOne._id,
      author: userOne.profile.name,
      planet: "Venus",
      fact: "Venus is the second planet from the Sun, orbiting it every 224.7 Earth days.",
      submitted: new Date(now - 10 * 3600 * 1000)
    }, {
      userId: userOne._id,
      author: userOne.profile.name,
      planet: "Earth",
      fact: "Earth is the third planet from the Sun, the densest planet in the Solar System, and the largest of the Solar System's four terrestrial planets.",
      submitted: new Date(now - 6 * 3600 * 1000)
    }, {
      userId: userTwo._id,
      author: userTwo.profile.name,
      planet: "Mars",
      fact: "Mars is the fourth planet from the Sun and the second smallest planet in the Solar System, after Mercury.",
      submitted: new Date(now - 13 * 3600 * 1000)
    }, {
      userId: userTwo._id,
      author: userTwo.profile.name,
      planet: "Jupiter",
      fact: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a giant planet with a mass one-thousandth that of the Sun.",
      submitted: new Date(now - 4 * 3600 * 1000)
    }, {
      userId: userTwo._id,
      author: userTwo.profile.name,
      planet: "Saturn",
      fact: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System. It is a gas giant with an average radius about nine times that of Earth.",
      submitted: new Date(now - 11 * 3600 * 1000)
    }, {
      userId: userThree._id,
      author: userThree.profile.name,
      planet: "Uranus",
      fact: "Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.",
      submitted: new Date(now - 3 * 3600 * 1000)
    }, {
      userId: userThree._id,
      author: userThree.profile.name,
      planet: "Neptune",
      fact: "Neptune is the eighth and farthest planet from the Sun in the Solar System. It is the fourth-largest planet by diameter and the third-largest by mass.",
      submitted: new Date(now - 8 * 3600 * 1000)
    }, {
      userId: userThree._id,
      author: userThree.profile.name,
      planet: "Mercury",
      fact: "Mercury has no known natural satellites. The planet is named after the Roman deity Mercury, the messenger to the gods.",
      submitted: new Date(now - 9 * 3600 * 1000)
    }, {
      userId: userFour._id,
      author: userFour.profile.name,
      planet: "Venus",
      fact: "Venus is named after the Roman goddess of love and beauty. After the Moon, it is the brightest natural object in the night sky.",
      submitted: new Date(now - 5 * 3600 * 1000)
    }, {
      userId: userFour._id,
      author: userFour.profile.name,
      planet: "Earth",
      fact: "During one orbit around the Sun, Earth rotates about its own axis 366.26 times, creating 365.26 solar days or one sidereal year.",
      submitted: new Date(now - 2 * 3600 * 1000)
    }, {
      userId: userFour._id,
      author: userFour.profile.name,
      planet: "Mars",
      fact: "Named after the Roman god of war, Mars is often referred to as the 'Red Planet' because the iron oxide prevalent on its surface gives it a reddish appearance.",
      submitted: new Date(now - 15 * 3600 * 1000)
    }];

    // insert data
    _.each(data, function(entry) {
      Facts.insert({
        userId: entry.userId,
        author: entry.author,
        planet: entry.planet,
        fact: entry.fact,
        submitted: entry.submitted
      });
    });
  }
});
