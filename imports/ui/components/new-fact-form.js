import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './new-fact-form.html';

Template.newFactForm.onCreated(() => {
  Template.instance().showForm = new ReactiveVar(false);
  Template.instance().newFactChars = new ReactiveVar(0);
});

Template.newFactForm.helpers({
  showFactForm() {
    return Template.instance().showForm.get();
  },
  submitDisabled() {
    const factChars = Template.instance().newFactChars.get();
    return !Boolean(factChars > 0 && factChars <= 160);
  },
  charCount() {
    const factChars = Template.instance().newFactChars.get();
    return parseInt(160 - factChars, 10);
  },
});

Template.newFactForm.events({
  'submit form.new-fact'(event, template) {
    event.preventDefault();

    const planet = event.target.planet.value;
    const fact = event.target.fact.value;

    Meteor.call('addFact', planet, fact);

    template.newFactChars.set(0);
    template.showForm.set(false);
  },
  'keyup #newFactChars'(event, template) {
    const charLength = document.getElementById('newFactChars').value.length;
    template.newFactChars.set(charLength);
  },
  'click .show-form'(event, template) {
    template.showForm.set(true);
  },
  'click .hide-form'(event, template) {
    template.showForm.set(false);
    template.newFactChars.set(0);
  },
});
