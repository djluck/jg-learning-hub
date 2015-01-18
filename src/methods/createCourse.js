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

    var adminEmailAddresses = Meteor.users.find({ roles : {$in : ["administrator"]}}).map(function(u){
        return u.emails[0].address;
    });

    console.log("Course created, emailing the admins: " + adminEmailAddresses);

    Email.send({
        from : Email.fromAddress,
        to : adminEmailAddresses,
        subject: "A course is awaiting approval",
        text : "The course '" + details.title + "' has been created. Please review it for approval."
    });
}