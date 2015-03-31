var userOptions = { fields : {
    profile : 1
}};

Meteor.publishComposite(null, {
    find: function(){
        return Collections.Courses.find(
            courseQuery(this.userId)
        );
    },
    children: [{
        find: function(course){
            var userIds = _.union(
                course.signedUpUserIds,
                course.waitingListUserIds || [],
                [course.details.runByUserId]
            );

            return Meteor.users.find({_id : { $in : userIds }}, userOptions);
        }
    }]
});

Meteor.publish(
    null,
    function(){
        return Collections.Locations.find();
    }
);

Meteor.publish(
    null,
    function(){
        return Collections.CourseFormats.find();
    }
);

Meteor.publish(
    null,
    function(){
        //all admins should be able to see all users on the site
        if (Roles.userIsInRole(this.userId, 'administrator')) {
            return Meteor.users.find({}, userOptions);
        }
        else {
            this.stop();
            return;
        }
    }
)


function courseQuery(userId){
    var query = {
        expiresAt : { $gte : new Date() }
    };

    //admins see all non-expired courses
    if (userId !== null && Roles.userIsInRole(userId, "administrator")){
        return query;
    }

    //normal scum-users see only approved courses or ones they created
    if (userId === null){
        query.approved  = true;
    }
    else{
        query.$or = [
            { approved : true },
            { createdByUserId : userId },
            { "details.runByUserId" : userId }
        ];
    }

    return query;
}
