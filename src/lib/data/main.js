_.each(_.keys(Collections), function(collectionName){
    addSynchronousOperations(Collections[collectionName]);
});
addSynchronousOperations(Meteor.users);


function addSynchronousOperations(collection){
    collection.sync = {
        update : function(selector, modifier, options){
            return Meteor.wrapAsync(collection.update, collection)(selector, modifier, options);
        },
        upsert : function(selector, modifier, options){
            return Meteor.wrapAsync(collection.upsert, collection)(selector, modifier, options);
        },
        remove : function(selector){
            Meteor.wrapAsync(collection.remove, collection)(selector);
        },
        insert : function(doc){
            return Meteor.wrapAsync(collection.insert, collection)(doc);
        }
    };
}
