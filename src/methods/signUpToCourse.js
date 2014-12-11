Methods.registerAsMethod(signUpToCourse);

function signUpToCourse(courseId){
throw new Meteor.Error("Thuis", "Reason");
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);

    var user = Meteor.users.findOne(this.userId);
    UserCourseDataService.signUpToCourse(user, courseId);
}
