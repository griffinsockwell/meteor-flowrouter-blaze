import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './planet.html';

Template.planet.helpers({
  planetPage() {
    return FlowRouter.getParam('planet');
  },
  capitalizePlanet(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  },
});
