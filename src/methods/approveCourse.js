Methods.registerAsMethod(approveCourse);

function approveCourse(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);
    Validation.requireAdministrator(this.userId);

    CourseDataService.approveCourse(courseId);
}
