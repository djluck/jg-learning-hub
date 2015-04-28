BusinessTime.approveCourse = function(courseId){
    Collections.Courses.commands.approve(courseId, sessions);

    var course = Collections.Courses.findOne(courseId);
    createOutlookEvent(course);
    notifyUsers(course);
}

function createOutlookEvent(course) {
    OutlookEvents.createEvents(course);
    Collections.Courses.commands.updateSessions(course._id, course.sessions);
}

function notifyUsers(course) {
    if (Meteor.isClient)
        return;

    Email.sendLearningHubNotification(
        Meteor.users.find().fetch(),
        "A new course is available",
        "The course '" + course.details.title + "' is now available @ https://learninghub.justgiving.com/"
    );
}
