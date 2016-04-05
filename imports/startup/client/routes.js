import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/app-body.js';
import '../../ui/pages/home.js';
import '../../ui/pages/author.js';
import '../../ui/pages/planet.js';

FlowRouter.route('/', {
  action() {
    BlazeLayout.render('appBody', { main: 'home' });
  },
});

FlowRouter.route('/author/:author', {
  action() {
    BlazeLayout.render('appBody', { main: 'author' });
  },
});

FlowRouter.route('/planet/:planet', {
  action() {
    BlazeLayout.render('appBody', { main: 'planet' });
  },
});
