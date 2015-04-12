Methods.registerAsMethod("deleteCourse", deleteCourse);

function deleteCourse(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);
    Validation.requireAdministrator(this.userId);

    var course = Collections.Courses.findOne(courseId);
    Collections.Courses.sync.remove(courseId);
    OutlookEvents.deleteEvents(course);
}