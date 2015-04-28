Methods.registerAsMethod("signUpToCourseOrJoinWaitingList", signUpToCourseOrJoinWaitingList);

function signUpToCourseOrJoinWaitingList(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);

    return BusinessTime.signUpToCourseOrJoinWaitingList(courseId, this.userId);
}