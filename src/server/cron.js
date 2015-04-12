var dailyName = "Send out daily email"
SyncedCron.add({
    name: dailyName,
    schedule: function(parser) {
        return parser.text('at 8:50 am');
    },
    job: function() {
        MyLog.format("Running cron job {0}", dailyName);

        var coursesThatStartSoon = Collections.Courses.queries.coursesThatStartInDaysTime(5).fetch();
        MyLog.format("There are {0} courses that start soon", coursesThatStartSoon.length);

        var coursesThatStartToday = Collections.Courses.queries.coursesThatStartToday().fetch();
        MyLog.format("There are {0} courses that start today", coursesThatStartToday.length);
    }
});

SyncedCron.start();

function getAllUsersOnCourse(course){
    var usersOnCourse = _.union(course.signedUpUserIds, [course.details.runByUserId]);

    return usersOnCourse;
}