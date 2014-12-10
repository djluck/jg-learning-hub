Meteor.users.signUpUserToCourse = function(user, courseId){
    var modifier = { $push: { "profile.takingCourseIds" : courseId } };

    Meteor.wrapAsync(Meteor.users.update.bind(Meteor.users, user._id, modifier));
};

Meteor.users.resignUserFromCourse = function(user, courseId){
    var modifier = { $pull: { "profile.takingCourseIds" : courseId } };

    Meteor.wrapAsync(Meteor.users.update.bind(Meteor.users, user._id, modifier));
}
