Template.planet.onCreated(() => {
  let param = FlowRouter.getParam('planet');
  Template.instance().subscribe('planet-facts', param);
  Template.instance().factsLimit = new ReactiveVar(10);
})

Template.planet.helpers({
  planetPage() {
    return FlowRouter.getParam('planet');
  },
  planetFacts() {
    let planet = FlowRouter.getParam('planet');
    let sort = {submitted: -1};
    let limit = Template.instance().factsLimit.get();
    return Facts.find({planet},{sort,limit});
  },
  loadMore() {
    let limit = Template.instance().factsLimit.get();
    let count = Facts.find().count();
    return Boolean(limit < count);
  }
});

Template.planet.events({
  'click .load-more'(event, template) {
    let limit = Template.instance().factsLimit.get();
    template.factsLimit.set(limit + 10);
  }
});
