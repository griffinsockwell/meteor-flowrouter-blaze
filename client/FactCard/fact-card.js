Template.factCard.onCreated(() => {
  Template.instance().factUpdate = new ReactiveVar(false);
  Template.instance().factUpdateChars = new ReactiveVar("");
});

Template.factCard.helpers({
  formatTime(time) {
    return moment(time).fromNow();
  },
  factOwner() {
    return Boolean(this.userId === Meteor.userId());
  },
  editing() {
    return Template.instance().factUpdate.get();
  },
  updateDisabled() {
    let factChars = Template.instance().factUpdateChars.get();
    return (factChars > 0 && factChars <= 160 ? false : true);
  },
  charCount() {
    let factChars = Template.instance().factUpdateChars.get();
    return parseInt(160 - factChars);
  }
});

Template.factCard.events({
  'submit form.update-fact'(event, template) {
    event.preventDefault();

    let fact = event.target.fact.value;

    Meteor.call('updateFact', this._id, fact);

    template.factUpdate.set(false);
  },
  'keyup #updateFactChars'(event, template) {
    let charLength = document.getElementById('updateFactChars').value.length;
    template.factUpdateChars.set(charLength);
  },
  'click .cancel'(event, template) {
    template.factUpdate.set(false);
  },
  'click .update'(event, template) {
    template.factUpdate.set(true);
  },
  'click .delete'() {
    if (confirm("Are you sure you want to delete this fact?")) {
      Meteor.call('removeFact', this._id);
    }
  }
});
