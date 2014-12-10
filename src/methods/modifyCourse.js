Methods.registerAsMethod(modifyCourse);

function modifyCourse(courseId, details, sessions){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);
    //must have created course
}
