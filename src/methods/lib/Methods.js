Methods = {
    registerAsMethod : registerAsMethod
};

function registerAsMethod(fn){
    var methodToAdd = {};
    methodToAdd[fn.name] = fn;
    Meteor.methods(methodToAdd);

    Methods[fn.name] = function(callback){
        Meteor.apply(fn.name, arguments, callback);
    }
}
