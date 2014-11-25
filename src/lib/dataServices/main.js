//setup promises on all collections
_.each(Collections, Promises.setupPromises);
Promises.setupPromises(Meteor.users);
