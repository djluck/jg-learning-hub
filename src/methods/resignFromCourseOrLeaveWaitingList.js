Methods.registerAsMethod("resignFromCourseOrLeaveWaitingList", resignFromCourseOrLeaveWaitingList);

function resignFromCourseOrLeaveWaitingList(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);

    var user = Meteor.users.findOne(this.userId);

    Log.info("A user ({0}) is attempting to resign from the course {1}", user._id, courseId);

    if (!UserCourseDataService.isSignedUpOrOnWaitingList(user, courseId)){
        throw new Meteor.Error("CouldNotResignFromCourse", "User is not signed up to course or on waiting list");
    }

    var course = Collections.Courses.findOne(courseId);
    if (UserCourseDataService.isOnWaitingList(user, course)){
        resignFromWaitingList(user, course);
    }
    else{
        resignFromCourse(user, courseId);
        admitOneFromWaitingList(course);
    }
}

function resignFromCourse(user, courseId){
    Meteor.users.resignUserFromCourse(user, courseId);

    var modifier = { $pull : { "signedUpUserIds" : user._id } };
    Collections.Courses.sync.update(courseId, modifier);
}

function resignFromWaitingList(user, courseId){
    var modifier = { $pull : { "waitingListUserIds" : user._id } };
    Collections.Courses.sync.update(courseId, modifier);
}

function admitOneFromWaitingList(course){
    if (course.waitingListUserIds.length === 0)
        return;

    var nextUserInLine = popNextUserFromWaitingList(course);

    UserCourseDataService.signUpToCourse(nextUserInLine, course._id);

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