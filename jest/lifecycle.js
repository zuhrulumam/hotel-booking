// https://github.com/tugorez/sails-jest
var sails = require('sails');

jest.setTimeout(10000)

beforeAll(function (done) {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  // this.timeout(5000);

  sails.lift({
    // Your sails app's configuration files will be loaded automatically,
    // but you can also specify any other special overrides here for testing purposes.

    // For example, we might want to skip the Grunt hook,
    // and disable all logs except errors and warnings:
    hooks: {
      grunt: false
    },
    log: {
      level: 'warn'
    },
    // datastore: 'testDatastore'

  }, function (err) {
    if (err) {
      return done(err);
    }

    // here you can load fixtures, etc.
    // (for example, you might want to create some records in the database)
    console.debug('Called for setup');

    // global.app = request(sails.hooks.http.app);

    return done();
  });
});

// After all tests have finished...
afterAll(function (done) {

  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  console.debug('Called for End');
  sails.lower(done);

});
