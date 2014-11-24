_.each(Collections, definePromiseMutators);
definePromiseMutators(Meteor.users);

function definePromiseMutators(collection){
	collection.q = {
		insert : function(doc, transformResultFn){
			return deferUntilFinished(
				collection.insert.bind(collection, doc),
				transformResultFn
			);
		},
		update : function(selector, modifier, options, transformResultFn){
			return deferUntilFinished(
				collection.update.bind(collection, selector, modifier, options),
				transformResultFn
			);
		},
		remove : function(selector, transformResultFn){
			return deferUntilFinished(
				collection.remove.bind(collection, selector),
				transformResultFn
			);
		}
	};
}

function deferUntilFinished(mongoFn, transformResultFn){
	var deferred = Q.defer();

	mongoFn(function(error, id){
		if (error) {
			console.log("MongoDB operation failed: " + error);
	        deferred.reject(new Error(error));
	    }
	    else {
	    	var resolvedValue = id;
	    	if (transformResultFn !== undefined){
	    		resolvedValue = transformResultFn(id);
	    	}
        	deferred.resolve(resolvedValue);
	    }
	});

	return deferred.promise;
}
