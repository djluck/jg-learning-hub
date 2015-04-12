Collections = {};
Schemas = {};

initCollectionAndSchema = function (collectionName, schema, mongoCollectionName){
	mongoCollectionName = mongoCollectionName || collectionName;
	Schemas[collectionName] = new SimpleSchema(schema);
	Collections[collectionName] = new Meteor.Collection(mongoCollectionName);
	Collections[collectionName].attachSchema(Schemas[collectionName], {transform: true});
}

requireUser = function(){
	if (Meteor.userId() === null)
		throw "User is not authenticated";
}


DefaultValues = {};

DefaultValues.currentDate = function(){
	return new Date();
};

DefaultValues.userId = Meteor.userId;
