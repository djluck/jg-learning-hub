Methods.registerAsMethod("createCourse", createCourse);

function createCourse(details, sessions){
    Validation.requireUser(this.userId);

    CourseDataService
        .createCourse(details, sessions);

    notifyAdmins(details);
}


function notifyAdmins(details){
    if (Meteor.isClient)
        return;

    var admins = Meteor.users.find({ roles : {$in : ["administrator"]}});

    Email.sendLearningHubNotification(
        admins,
        "A course is awaiting approval",
        "The course '" + details.title + "' has been created. Please review it for approval."
    );
}