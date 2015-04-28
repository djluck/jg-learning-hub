BusinessTime.createCourse = function(details, sessions){
    Collections.Courses.commands.create(details, sessions);
    notifyAdmins(details);
}


function notifyAdmins(details){
    if (Meteor.isClient)
        return;

    Email.sendLearningHubNotification(
        Meteor.users.queries.findAdmins().fetch(),
        "A course is awaiting approval",
        "The course '" + details.title + "' has been created. Please review it for approval."
    );
}