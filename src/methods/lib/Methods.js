Methods = {
    registerAsMethod : registerAsMethod
};

function registerAsMethod(fnName, fn){
    var methodToAdd = {};
    methodToAdd[fnName] = fn;
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
