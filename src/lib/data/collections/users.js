Meteor.users.signUpUserToCourse = function(user, courseId){
    var modifier = { $push: { "profile.takingCourseIds" : courseId } };

    Meteor.users.sync.update(user._id, modifier);
};



Meteor.users.resignUserFromCourse = function(user, courseId){
    var modifier = { $pull: { "profile.takingCourseIds" : courseId } };

    Meteor.users.sync.update(user._id, modifier);
}
