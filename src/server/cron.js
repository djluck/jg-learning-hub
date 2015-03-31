var dailyName = "Send out daily notifications"
SyncedCron.add({
    name: dailyName,
    schedule: function(parser) {
        return parser.text('at 8:50 am');
    },
    job: function() {
        Log.info("Running cron job {0}", dailyName);

        var coursesThatStartSoon = CourseReportingService.findCoursesThatStartInDaysTime(5).fetch();
        Log.info("There are {0} courses that start soon", coursesThatStartSoon.length);

        var coursesThatStartToday = CourseReportingService.findCoursesThatStartToday().fetch();
        Log.info("There are {0} courses that start today", coursesThatStartToday.length);
    }
});

SyncedCron.start();

function getAllUsersOnCourse(course){
    var usersOnCourse = course.signedUpUserIds.slice(0);
    usersOnCourse.push(course.details.runByUserId);
    return usersOnCourse;
}