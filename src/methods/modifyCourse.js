Methods.registerAsMethod("modifyCourse", modifyCourse);

function modifyCourse(courseId, details, sessions){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);

    if (!isUserCreatorOfCourse && !Roles.userIsInRole(userId, "administrator"))
        throw new Meteor.Error("NotAuthorized", "Only the course creator or an admin may edit a course");

    updateOutlookEvents(details, sessions);

    Collections.Courses.commands.updateDetailsAndSessions(courseId, details, sessions);
}

function isUserCreatorOfCourse(userId, courseId){
    var course = Collections.Courses.findOne(courseId);
    return course.createdByUserId === userId;
}

function updateOutlookEvents(course, sessions){
    //if a session doesn't have it,
    //for each session

    //change the start/finish time, place?

    //if user running the course has changed, delete all existing + re-create the events?
}

