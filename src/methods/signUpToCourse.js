Methods.registerAsMethod(signUpToCourse);

function signUpToCourse(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);

    var user = Meteor.users.findOne(this.userId);
    UserCourseDataService.signUpToCourse(user, courseId);
}
