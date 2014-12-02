Meteor.users.signUpUserToCourse = function(user, courseId){
    return Meteor.users.q.update(
        user._id,
        { $push: { "profile.takingCourseIds" : courseId } }
    );
};

Meteor.users.resignUserFromCourse = function(user, courseId){
    return Meteor.users.q.update(
        user._id,
        { $pull: { "profile.takingCourseIds" : courseId } }
    );
}
