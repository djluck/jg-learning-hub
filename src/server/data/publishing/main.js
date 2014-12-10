Meteor.publish(
    null,
    function(){
        return Collections.Courses.find(courseQuery(this.userId));
    }
);

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


function courseQuery(userId){
    var query = {
        expiresAt : { $gte : new Date() }
    };

    //admins see all non-expired courses
    if (userId !== null && Roles.userIsInRole(userId, "administrator")){
        return query;
    }

    //normall scum-users see only approved courses or ones they created
    if (userId === null){
        query.approved  = true;
    }
    else{
        query.$or = [
            { approved : true },
            { createdByUser : userId }
        ];
    }

    return query;
}
