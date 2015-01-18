Methods.registerAsMethod("resignFromCourse", resignFromCourse);

function resignFromCourse(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);

    var user = Meteor.users.findOne(this.userId);
    UserCourseDataService.resignFromCourse(user, courseId);
}
