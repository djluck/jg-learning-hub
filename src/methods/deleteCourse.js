Methods.registerAsMethod("deleteCourse", deleteCourse);

function deleteCourse(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);
    Validation.requireAdministrator(this.userId);

    BusinessTime.deleteCourse(courseId);
}