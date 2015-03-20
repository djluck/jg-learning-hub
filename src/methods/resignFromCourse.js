Methods.registerAsMethod("resignFromCourse", resignFromCourse);

function resignFromCourse(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);

    if (!UserCourseDataService.isSignedUpOrOnWaitingList(user, courseId)){
        throw new Meteor.Error("CouldNotResignFromCourse", "User is not signed up to course or on waiting list");
    }

    var user = Meteor.users.findOne(this.userId);

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

    var nextUserInLine = Meteor.users.findOne(course.waitingListUserIds);
    var modifier = { $pop : { "waitingListUserIds" : -1 } };
    Collections.Courses.sync.update(courseId, modifier);

    Email.send({
        from : Email.fromAddress,
        to : nextUserInLine.emails[0].address,
        subject: "You're on the course!",
        text : "Good news " + nextUserInLine.profile.name + ", a space on the course '" + course.details.title + "' has become available, so you've been subscribed to the course. Please unsubscribe @ https://learninghub.justgiving.com/ if you are no longer interested."
    });
}