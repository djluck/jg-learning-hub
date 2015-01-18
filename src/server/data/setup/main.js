Meteor.startup(function(){
    addData(BaseData);
    var isDebug = process.env.DEBUG;
    if (isDebug){
        console.log("DEBUG=true, adding test data..")
        addUsers();
        addData(TestData);
    }
})

function addData(source){
    _.chain(source)
        .keys()
        .each(function(collectionName){
            console.log("Adding to collection: " + collectionName);
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
            password : details.password,
            profile : { name : details.name }
        });

        if ("roles" in details){
            Roles.addUsersToRoles(userId, details.roles)
        }
    });
}

function addIfEmpty(collection, toAdd){
    if (collection.find().count() === 0){
        console.log("Collection is empty, adding base/test data to it...")
        var after;

        if (!_.isArray(toAdd) && _.isObject(toAdd)){
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
