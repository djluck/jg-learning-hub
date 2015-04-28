BusinessTime.modifyCourse = function(courseId, details, sessions){
    updateOutlookEvents(details, sessions);

    var oldCourse = Collections.Courses.findOne(courseId);
    Collections.Courses.commands.updateDetailsAndSessions(courseId, details, sessions);
    var newCourse = Collections.Courses.findOne(courseId);

    OutlookEvents.updateEventDetails(
        oldCourse,
        newCourse
    );
};

