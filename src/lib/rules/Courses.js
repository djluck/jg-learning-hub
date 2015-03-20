Rules = {};

Rules.Courses = {
    canSignUpToCourse : canSignUpToCourse,
    canResignFromCourse : canResignFromCourse,
    isCourseFull :isCourseFull
}

function canSignUpToCourse(course){
    return course.approved && course.startsAt > new Date();
}

function canResignFromCourse(course, userId){
    var result = course.approved && _.contains(course.signedUpUserIds, userId) && course.startsAt > new Date();
    return result;
}

function isCourseFull(course){
    console.log(course.signedUpUserIds.length);
    console.log(course.details.numberOfSpaces);
    return course.signedUpUserIds.length === course.details.numberOfSpaces;
}
