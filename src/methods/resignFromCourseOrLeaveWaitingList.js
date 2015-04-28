Methods.registerAsMethod("resignFromCourseOrLeaveWaitingList", resignFromCourseOrLeaveWaitingList);

function resignFromCourseOrLeaveWaitingList(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);

    var user = Meteor.users.findOne(this.userId);
    var course = Collections.Courses.findOne(courseId);

    MyLog.format("A user ({0}) is attempting to resign from the course {1}", user._id, courseId);

    if (!course.userIsSignedUpOrOnWaitingList(user)){
        throw new Meteor.Error("CouldNotResignFromCourse", "User is not signed up to course or on waiting list");
    }

    if (course.userIsOnWaitingList(user)){
        Collections.Courses.commands.removeUserFromWaitingList(courseId, user);
    }
    else{
        Collections.Courses.commands.resignUserFromCourse(courseId, user);
        admitOneFromWaitingList(course);
    }

    OutlookEvents.updateAttendeesForEvents(Collections.Courses.findOne(courseId));
}


function admitOneFromWaitingList(course){
    if (!course.hasWaitingList())
        return;

    var nextUserInLine = popNextUserFromWaitingList(course);

    Collections.Courses.commands.signUserUpToCourse(course._id, nextUserInLine._id);

    Email.sendLearningHubNotification(
        nextUserInLine,
        "You're on the course!",
        "Good news " + nextUserInLine.profile.name + ", a space on the course '" + course.details.title + "' has become available, so you've been subscribed to the course. Please unsubscribe @ https://learninghub.justgiving.com/ if you are no longer interested."
    );
}

function popNextUserFromWaitingList(course){
    var nextUserInLine = Meteor.users.findOne(course.waitingListUserIds[0]);
    var modifier = { $pop : { "waitingListUserIds" : -1 } };
    Collections.Courses.sync.update(course._id, modifier);

    return nextUserInLine;
}