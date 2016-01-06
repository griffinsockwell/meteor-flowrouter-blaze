Template.home.onCreated(() => {
  Template.instance().subscribe('home-facts');
  Template.instance().factsLimit = new ReactiveVar(10);
})

Template.home.helpers({
  homeFacts() {
    let sort = { submitted: -1 };
    let limit = Template.instance().factsLimit.get();
    return Facts.find({}, { sort, limit });
  },
  loadMore() {
    let limit = Template.instance().factsLimit.get();
    let count = Facts.find().count();
    return Boolean(limit < count);
  }
});

Template.home.events({
  'click .load-more'(event, template) {
    let limit = Template.instance().factsLimit.get();
    template.factsLimit.set(limit + 10);
  }
});
