Collections = {};
Schemas = {};

initCollectionAndSchema = function (collectionName, schema){
	Schemas[collectionName] = new SimpleSchema(schema);
	Collections[collectionName] = new Meteor.Collection(collectionName);
	Collections[collectionName].attachSchema(Schemas[collectionName]);
}

handleError = function(err){
	if (err){
		console.log(err);
		throw "Failed to sync";
	}
	else{
		console.log("Sync'd");
	}
};

requireUser = function(){
	if (Meteor.userId() === null)
		throw "User is not authenticated";
}


DefaultValues = {};

DefaultValues.currentDate = function(){
	return new Date();
};

DefaultValues.userId = Meteor.userId;