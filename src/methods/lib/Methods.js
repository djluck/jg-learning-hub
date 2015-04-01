Methods = {
    registerAsMethod : registerAsMethod
};

function registerAsMethod(fnName, fn){
    var methodToAdd = {};
    methodToAdd[fnName] = getLoggingMethod(fnName, fn);
    Meteor.methods(methodToAdd);


    Methods[fnName] = function(){
        var numberOfArguments = fn.length;
        var argsArray =_.toArray(arguments);
        var methodParameters = _.first(argsArray, numberOfArguments);
        var asyncCallback;

        //dont support the [options] param currently...
        if (argsArray.length > numberOfArguments){
            asyncCallback = argsArray[numberOfArguments];
        }

        Meteor.apply(fnName, methodParameters, asyncCallback);
    }
}

function getLoggingMethod(fnName, fnToWrap){
    return function(){
        Log.info("User {0} is calling method {1} with parameters: {2}", this.userId, fnName, _.toArray(arguments));

        fnToWrap.apply(this, arguments);
    };
}
