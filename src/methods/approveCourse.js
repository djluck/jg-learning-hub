Methods.registerAsMethod("approveCourse", approveCourse);

function approveCourse(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);
    Validation.requireAdministrator(this.userId);

    Collections.Courses.commands.approve(courseId);
    notifyUsers(courseId);
}

function notifyUsers(courseId){
    if (Meteor.isClient)
        return;

    var course = Collections.Courses.findOne(courseId);
    var userEmailAddresses = Meteor.users.find().map(function(u){
        return u.emails[0].address;
    });

    Email.sendLearningHubNotification(
        Meteor.users.find().fetch(),
        "A new course is available",
        "The course '" + course.details.title + "' is now available @ https://learninghub.justgiving.com/"
    );
}

