Rules = {};

Rules.Courses = {
    canCourseBeSignedUpTo : canCourseBeSignedUpTo,
    isCourseFull :isCourseFull
}

function canCourseBeSignedUpTo(course){
    return course.approved && !isCourseFull(course) && course.startsAt > new Date();
}

function isCourseFull(course){
    return course.signedUpUserIds.length === course.details.numberOfSpaces
}
