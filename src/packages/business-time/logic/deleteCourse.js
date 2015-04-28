BusinessTime.deleteCourse = function(courseId){
    var course = Collections.Courses.findOne(courseId);
    Collections.Courses.sync.remove(courseId);
    OutlookEvents.deleteEvents(course);
}