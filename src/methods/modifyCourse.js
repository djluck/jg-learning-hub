Methods.registerAsMethod(modifyCourse);

function modifyCourse(courseId, details, sessions){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);

    if (!isUserCreatorOfCourse && !Roles.userIsInRole(userId, "administrator"))
        throw new Meteor.Error("NotAuthorized", "Only the course creator or an admin may edit a course");

    CourseDataService.updateCourse(courseId, details, sessions);
}

function isUserCreatorOfCourse(userId, courseId){
    var course = Collections.Courses.findOne(courseId);
    return course.createdByUser === userId;
}
