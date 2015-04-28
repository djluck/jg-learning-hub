Methods.registerAsMethod("approveCourse", approveCourse);

function approveCourse(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);
    Validation.requireAdministrator(this.userId);

    BusinessTime.approveCourse(courseId);
}

