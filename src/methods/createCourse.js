Methods.registerAsMethod("createCourse", createCourse);

function createCourse(details, sessions){
    Validation.requireUser(this.userId);

    var courseId = CourseDataService
        .createCourse(details, sessions);

    notifyAdmins(courseId);
}


function notifyAdmins(courseId){
    var course = Collections.Courses.findOne(courseId);
    var adminEmailAddresses = Meteor.users.find({ roles : {$in : ["administrator"]}}).map(function(u){
        return u.emails[0].address;
    });

    console.log("Course created, emailing the admins: " + adminEmailAddresses);

    Email.send({
        from : "admin@jg-learninghub",
        to : adminEmailAddresses,
        subject: "A course is awaiting approval",
        text : "The course '" + course.details.title + "' has been created. Please review it for approval."
    });
}