Methods = {
    registerAsMethod : registerAsMethod
};

function registerAsMethod(fn){
    var methodToAdd = {};
    methodToAdd[fn.name] = fn;
    Meteor.methods(methodToAdd);


    Methods[fn.name] = function(){
        var numberOfArguments = fn.length;
        var argsArray =_.toArray(arguments);
        var methodParameters = _.first(argsArray, numberOfArguments);
        var asyncCallback;

        //dont support the [options] param currently...
        if (argsArray.length > numberOfArguments){
            asyncCallback = argsArray[numberOfArguments];
        }

        console.log(methodParameters);
        console.log(asyncCallback);
        console.log(fn.name);


        Meteor.apply(fn.name, methodParameters, asyncCallback);
    }
}
