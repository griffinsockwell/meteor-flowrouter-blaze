Template.factForm.onCreated(() => {
  Template.instance().showForm = new ReactiveVar(false);
  Template.instance().newFactChars = new ReactiveVar(0);
});

Template.factForm.helpers({
  showFactForm() {
    return Template.instance().showForm.get();
  },
  submitDisabled() {
    let factChars = Template.instance().newFactChars.get();
    return (factChars > 0 && factChars <= 160 ? false : true);
  },
  charCount() {
    let factChars = Template.instance().newFactChars.get();
    return parseInt(160 - factChars);
  }
});

Template.factForm.events({
  'submit form.new-fact'(event, template) {
    event.preventDefault();

    let planet = event.target.planet.value;
    let fact = event.target.fact.value;

    Meteor.call('addFact', planet, fact);

    template.newFactChars.set(0);
    template.showForm.set(false);
  },
  'keyup #newFactChars'(event, template) {
    let charLength = document.getElementById('newFactChars').value.length;
    template.newFactChars.set(charLength);
  },
  'click .show-form'(event, template) {
    template.showForm.set(true);
  },
  'click .hide-form'(event, template) {
    template.showForm.set(false);
    template.newFactChars.set(0);
  }
});
