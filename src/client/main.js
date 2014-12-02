_.each(Collections, Promises.setupPromisesOnMongoCollection);
Promises.setupPromisesOnMongoCollection(Meteor.users);

function setupDialogErrorHandlerOnMongoOperations(collectionWithPromises){
    var qOrig = collectionWithPromisesc;
    collectionWithPromises.q = {
        insert : function(){
            return qOrgi.insert.apply(qOrgi, arguments)
                .error(onError);
        },
        update : function(){
            return qOrgi.update.apply(qOrgi, arguments)
                .error(onError);
        },
        remove : function(){
            return qOrgi.remove.apply(qOrgi, arguments)
                .error(onError);
        }
    }
}

function onError(){
    Dialogs.errorDialog.show();
}
