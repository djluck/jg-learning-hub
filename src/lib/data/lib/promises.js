Promises = {
    setupPromisesOnMongoCollection : setupPromisesOnMongoCollection,
    setupPromisesOnAccounts : setupPromisesOnAccounts,
    waitAll : waitAll,
    errorPromise : errorPromise,
    valuePromise : valuePromise
}

function errorPromise(message){
    return Q.fcall(function () {
        throw new Error(message);
    });
}

function valuePromise(value){
    return Q.fcall(function(){
        return value;
    })
}

function setupPromisesOnAccounts(){
    Accounts.q = {
        createUser : function(options){
            return deferUntilFinished(
                Accounts.createUser.bind(Accounts, options)
            );
        }
    }
}

function setupPromisesOnMongoCollection(collection){
    collection.q = {
        insert : function(doc, transformResultFn){
            return deferUntilMongoFinished(
                collection.insert.bind(collection, doc),
                transformResultFn
            );
        },
        update : function(selector, modifier, options, transformResultFn){
            return deferUntilMongoFinished(
                collection.update.bind(collection, selector, modifier, options),
                transformResultFn
            );
        },
        remove : function(selector, transformResultFn){
            return deferUntilMongoFinished(
                collection.remove.bind(collection, selector),
                transformResultFn
            );
        }
    };
}

function deferUntilFinished(fn, handleCallback){
    var deferred = Q.defer();

    fn(function(error){
        if (error) {
            console.log("Promise operation failed: " + error);
            deferred.reject(new Error(error));
        }
        else {
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function deferUntilMongoFinished(fn, transformResultFn){
    var deferred = Q.defer();

    fn(function(error, id){
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

function waitAll(promises){
    return Q
        .all(promises)
        .fail(function (error) {
            console.log(error);
        });
}
