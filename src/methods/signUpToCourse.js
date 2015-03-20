Methods.registerAsMethod("signUpToCourse", signUpToCourse);

function signUpToCourse(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);
    Meteor._debug("Hi there");
    var user = Meteor.users.findOne(this.userId);
    var course = Collections.Courses.findOne(courseId);
    Meteor._debug(course);
    if (UserCourseDataService.isSignedUpOrOnWaitingList(user, courseId)){
        throw new Meteor.Error("CouldNotSignUpToCourse", "User is already signed up or on waiting list");
    }

    if (Rules.Courses.isCourseFull(course)){
        joinWaitingList(user, courseId);
    }
    else{
        signUpToCourse(user, courseId);
    }
}

function signUpToCourse(user, courseId){
    Meteor.users.signUpUserToCourse(user, courseId);
    var modifier = { $push : { "signedUpUserIds" : user._id } };
    Collections.Courses.sync.update(courseId, modifier);
}

function joinWaitingList(user, courseId){
    var modifier = { $push : { "waitingListUserIds" : user._id } };
    Collections.Courses.sync.update(courseId, modifier);
}