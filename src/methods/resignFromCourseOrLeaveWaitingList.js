Methods.registerAsMethod("resignFromCourseOrLeaveWaitingList", resignFromCourseOrLeaveWaitingList);

function resignFromCourseOrLeaveWaitingList(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);

    BusinessTime.resignFromCourseOrLeaveWaitingList(courseId, this.userId);
}