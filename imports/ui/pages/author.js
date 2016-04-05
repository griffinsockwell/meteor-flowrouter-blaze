import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

import '../components/new-fact-form.js';
import '../components/fact-list.js';

import './author.html';

Template.author.helpers({
  authorPage() {
    return FlowRouter.getParam('author');
  },
  canAddFact() {
    let userPresent;
    if (Meteor.user()) {
      const username = Meteor.user().username;
      const param = FlowRouter.getParam('author');
      userPresent = Boolean(username === param);
    }
    return userPresent;
  },
});
