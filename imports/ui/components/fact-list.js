import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Facts } from '../../api/facts.js';

import './fact-list-item.js';

import './fact-list.html';

Template.factList.onCreated(() => {
  const instance = Template.instance();
  const { subscription, param } = instance.data;
  let query;
  if (param) query = param.toLowerCase();
  instance.subscribe(subscription, query);
  instance.factsLimit = new ReactiveVar(10);
});

Template.factList.helpers({
  facts() {
    const sort = { submitted: -1 };
    const limit = Template.instance().factsLimit.get();
    return Facts.find({}, { sort, limit });
  },
  loadMore() {
    const limit = Template.instance().factsLimit.get();
    const count = Facts.find().count();
    return Boolean(limit < count);
  },
});

Template.factList.events({
  'click .load-more'(event, template) {
    const limit = Template.instance().factsLimit.get();
    template.factsLimit.set(limit + 10);
  },
});
