Meteor.startup(function(){
    addUsers();
    addData(BaseData);
    addData(TestData);
})

function addData(source){
    _.chain(source)
        .keys()
        .each(function(collectionName){
            addIfEmpty(Collections[collectionName], source[collectionName]);
        });
}

function addUsers(){
    if (Meteor.users.find().count() !== 0){
        return;
    }
    _.each(TestUsers, function(details){
        var userId = Accounts.createUser({
            email : details.email,
            password : details.password
        });

        if ("roles" in details){
            Roles.addUsersToRoles(userId, details.roles)
        }
    });
}

function addIfEmpty(collection, toAdd){
    if (collection.find().count() === 0){
        var after;

        if (_.isObject(toAdd)){
            after = toAdd.after;
            toAdd = toAdd.data;
        }

        if (_.isFunction(toAdd))
            toAdd = toAdd();

        _.each(toAdd, function(e){
            collection.insert(e, { validate: false }); //turn validation off so we can insert old courses, etc.
        });

        if (!_.isUndefined(after))
            after();
    }
}
