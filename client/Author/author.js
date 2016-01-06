Template.author.onCreated(() => {
  let param = FlowRouter.getParam('author');
  Template.instance().subscribe('author-facts', param);
  Template.instance().factsLimit = new ReactiveVar(10);
});

Template.author.helpers({
  authorPage() {
    return FlowRouter.getParam('author');
  },
  canAddFact() {
    if (Meteor.user()) {
      let username = Meteor.user().username;
      let param = FlowRouter.getParam('author');
      return Boolean(username === param);
    }
  },
  authorFacts() {
    let author = FlowRouter.getParam('author');
    let sort = { submitted: -1 };
    let limit = Template.instance().factsLimit.get();
    return Facts.find({author},{sort,limit});
  },
  loadMore() {
    let limit = Template.instance().factsLimit.get();
    let count = Facts.find().count();
    return Boolean(limit < count);
  }
});

Template.author.events({
  'click .load-more'(event, template) {
    let limit = Template.instance().factsLimit.get();
    template.factsLimit.set(limit + 10);
  }
});
