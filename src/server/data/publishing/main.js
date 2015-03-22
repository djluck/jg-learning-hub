Meteor.publishComposite(null, {
    find: function(){
        return Collections.Courses.find(
            courseQuery(this.userId)
        );
    },
    children: [{
        find: function(course){
            var userIds = course.signedUpUserIds.slice(0);
            if (course.waitingListUserIds)
                userIds.push(course.waitingListUserIds.slice(0));

            userIds.push(course.details.runByUserId);
            return Meteor.users.find({_id : { $in : userIds }});
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
            return Meteor.users.find();
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
