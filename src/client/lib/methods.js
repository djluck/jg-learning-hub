Meteor.startup(function(){
    _.chain(Methods)
        .keys()
        .filter(function(m){
            return m !== "registerAsMethod";
        })
        .each(function(m){
            var methodFn = Methods[m];
            Methods[m] = promiseBasedMethodCall.bind(Methods, methodFn);
        });
})





function promiseBasedMethodCall(methodFn){
    var deferred = Q.defer();

    function callback(err){
        if (err){
            deferred.reject(new Error(err));
        }
        else{
            deferred.resolve();
        }
    };

    var argsArray = _.chain(arguments).toArray().rest().value();
    argsArray.push(callback);

    methodFn.apply(this, argsArray);

    return deferred.promise
        .catch(function(err){
            var message = _.sprintf("We encountered an issue trying to phone home: %s", err.message);
            Dialogs.errorDialog.show({ message : message });
        });
}
