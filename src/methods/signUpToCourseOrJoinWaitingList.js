Methods.registerAsMethod("signUpToCourseOrJoinWaitingList", signUpToCourseOrJoinWaitingList);

function signUpToCourseOrJoinWaitingList(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);

    var user = Meteor.users.findOne(this.userId);
    var course = Collections.Courses.findOne(courseId);

    Log.info("A user ({0}) is attempting to sign up to the course {1}", user._id, courseId);

    if (UserCourseDataService.isSignedUpOrOnWaitingList(user, courseId)){
        throw new Meteor.Error("CouldNotSignUpToCourse", "User is already signed up or on waiting list");
    }

    if (Rules.Courses.isCourseFull(course)){
        return joinWaitingList(user, courseId);
    }
    else{
        UserCourseDataService.signUpToCourse(user, courseId);
        return {
            isSignedUp : true,
            isOnWaitingList : false
        };
    }
}


function joinWaitingList(user, courseId){
    Log.info("Adding user {0} up to course {1} 's waiting list", user._id, courseId);

    var modifier = { $push : { "waitingListUserIds" : user._id } };
    Collections.Courses.sync.update(courseId, modifier);

    var course = Collections.Courses.findOne(courseId);
    var positionInWaitingList = _.indexOf(course.waitingListUserIds, user._id) + 1;

    return {
        isSignedUp : false,
        isOnWaitingList : true,
        waitingListPosition : positionInWaitingList
    };
}