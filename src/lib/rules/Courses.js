Rules = {};

Rules.Courses = {
    canSignUpToCourse : canSignUpToCourse,
    canResignFromCourse : canResignFromCourse,
    isCourseFull :isCourseFull,
    courseHasWaitingList : function(course){
        return course.waitingListUserIds.length > 0;
    }
}

function canSignUpToCourse(course){
    return course.approved && course.startsAt > new Date();
}

function canResignFromCourse(course, userId){
    var result = course.approved && _.contains(course.signedUpUserIds, userId) && course.startsAt > new Date();
    return result;
}

function isCourseFull(course){
    return course.signedUpUserIds.length === course.details.numberOfSpaces;
}
