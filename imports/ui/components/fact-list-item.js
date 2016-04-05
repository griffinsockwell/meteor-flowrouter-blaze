import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import moment from 'moment';

import './fact-list-item.html';

Template.factListItem.onCreated(() => {
  Template.instance().factUpdate = new ReactiveVar(false);
  Template.instance().factUpdateChars = new ReactiveVar('');
});

Template.factListItem.helpers({
  formatTime(time) {
    return moment(time).fromNow();
  },
  capitalizePlanet(string) {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  },
  factOwner() {
    return Boolean(this.userId === Meteor.userId());
  },
  editing() {
    return Template.instance().factUpdate.get();
  },
  updateDisabled() {
    const factChars = Template.instance().factUpdateChars.get();
    return !Boolean(factChars > 0 && factChars <= 160);
  },
  charCount() {
    const factChars = Template.instance().factUpdateChars.get();
    return parseInt(160 - factChars, 10);
  },
});

Template.factListItem.events({
  'submit form.update-fact'(event, template) {
    event.preventDefault();

    const fact = event.target.fact.value;

    Meteor.call('updateFact', this._id, fact);

    template.factUpdate.set(false);
  },
  'keyup #updateFactChars'(event, template) {
    const charLength = document.getElementById('updateFactChars').value.length;
    template.factUpdateChars.set(charLength);
  },
  'click .cancel'(event, template) {
    template.factUpdate.set(false);
  },
  'click .update'(event, template) {
    template.factUpdate.set(true);
  },
  'click .delete'() {
    Meteor.call('removeFact', this._id);
  },
});
