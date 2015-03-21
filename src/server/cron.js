SyncedCron.add({
    name: 'Send out daily notifications',
    schedule: function(parser) {
        return parser.text('at 8:50 am');
    },
    job: function() {
        //alert people at the begining of the day if they have a session
        //alert people 15 minutes before a session
        //alert people 3 days before a course is due to start (Mon-Friday)
        //find courses that start today


        var coursesStartingToday = Collections.Courses.find({ "sessions[0].startsAt" : {
            $gte : moment().startOf("day").toDate(),
            $lt  : moment().endOf("day").toDate()
        } });
        return 0;
    }
});