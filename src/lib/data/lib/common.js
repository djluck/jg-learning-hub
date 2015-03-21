Collections = {};
Schemas = {};

initCollectionAndSchema = function (collectionName, schema){
	Schemas[collectionName] = new SimpleSchema(schema);
	Collections[collectionName] = new Meteor.Collection(collectionName);
	Collections[collectionName].attachSchema(Schemas[collectionName]);
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
