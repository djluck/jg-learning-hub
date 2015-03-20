Methods.registerAsMethod("approveCourse", approveCourse);

function approveCourse(courseId){
    Validation.isMongoId(courseId);
    Validation.requireUser(this.userId);
    Validation.requireAdministrator(this.userId);

    CourseDataService.approveCourse(courseId);

    notifyUsers(courseId);
}

function notifyUsers(courseId){
    if (Meteor.isClient)
        return;

    var course = Collections.Courses.findOne(courseId);
    var userEmailAddresses = Meteor.users.find().map(function(u){
        return u.emails[0].address;
    });

    console.log("Course approved, emailing all users: " + userEmailAddresses);

    Email.send({
        from : Email.fromAddress,
        to : userEmailAddresses,
        subject: "A new course is available!",
        text : "The course '" + course.details.title + "' is now available @ https://learninghub.justgiving.com/"
    });
}
