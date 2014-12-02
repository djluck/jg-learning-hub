Meteor.startup(function(){
    addUsers();
    addData(BaseData);
    addData(TestData);
    setupSubscriptions();
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

        if (_.isFunction(toAdd))
            toAdd = toAdd();

        _.each(toAdd, function(e){
            collection.insert(e, { validate: false }); //turn validation off so we can insert old courses, etc.
        });
    }
}

function setupSubscriptions(){
    _.each(
        Collections.Courses.find().fetch(),
        function(course){
            //sign up signed up user to this course
            _.each(
                course.signedUpUserIds,
                function(userId){
                    console.log("uid: " + userId + ", cid:" + course._id);
                    var user = Meteor.users.findOne(userId);

                    UserCourseDataService.signUpToCourse(user, course._id);
                }
            );
        }
    )
}
