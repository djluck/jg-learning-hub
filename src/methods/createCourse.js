Methods.registerAsMethod("createCourse", createCourse);

function createCourse(details, sessions){
    Validation.requireUser(this.userId);

    BusinessTime.createCourse(details, sessions);
}

