Methods.registerAsMethod(createCourse);

function createCourse(details, sessions){
    Validation.requireUser(this.userId);

    CourseDataService
        .createCourse(details, sessions);
}
