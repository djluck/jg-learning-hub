Methods.registerAsMethod("signUpToCourseOrJoinWaitingList", signUpToCourseOrJoinWaitingList);

function signUpToCourseOrJoinWaitingList(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);

    var user = Meteor.users.findOne(this.userId);
    var course = Collections.Courses.findOne(courseId);

    MyLog.format("A user ({0}) is attempting to sign up to the course {1}", user._id, courseId);

    if (course.userIsSignedUpOrOnWaitingList(user)){
        throw new Meteor.Error("CouldNotSignUpToCourse", "User is already signed up or on waiting list");
    }

    var result = null;
    if (course.isFull()){
        result = joinWaitingList(user, courseId);
    }
    else{
        Collections.Courses.commands.signUserUpToCourse(courseId, user._id);

        result = {
            isSignedUp : true,
            isOnWaitingList : false
        };
    }

    OutlookEvents.updateAttendees(course);

    return result;
}


function joinWaitingList(user, courseId){
    MyLog.format("Adding user {0} up to course {1} 's waiting list", user._id, courseId);

    Collections.Courses.commands.addUserToWaitingList(courseId, user._id);
    var course = Collections.Courses.findOne(courseId);

    return {
        isSignedUp : false,
        isOnWaitingList : true,
        waitingListPosition : course.usersPositionInWaitingList(user)
    };
}