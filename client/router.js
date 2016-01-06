FlowRouter.route('/', {
  action() {
    BlazeLayout.render('appBody', {
      main: 'home'
    });
  }
});

FlowRouter.route('/author/:author', {
  action() {
    BlazeLayout.render('appBody', {
      main: 'author'
    });
  }
});

FlowRouter.route('/planet/:planet', {
  action() {
    BlazeLayout.render('appBody', {
      main: 'planet'
    });
  }
});
