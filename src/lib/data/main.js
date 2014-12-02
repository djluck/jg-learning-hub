//setup promises on all collections
_.each(Collections, Promises.setupPromisesOnMongoCollection);
Promises.setupPromisesOnMongoCollection(Meteor.users);
Promises.setupPromisesOnAccounts();
