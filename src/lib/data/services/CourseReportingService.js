CourseReportingService = {
    findCoursesThatStartToday : function(){
        return this.findCoursesThatStartInDaysTime(0);
    },
    findCoursesThatStartInDaysTime: function(numberOfDays){
        var query = {
            startsAt : {
                $gte : moment().add(numberOfDays, "days").startOf("day").toDate(),
                $lt  : moment().add(numberOfDays, "days").endOf("day").toDate()
            },
            approved : true
        };
        return Collections.Courses.find(query);
    },
    findCoursesWithUnnotifiedSessions : function(thatStartsWithinMinutes){

        var now = moment().toDate();
        var searchCutoff =  moment().add(thatStartsWithinMinutes, "minutes").toDate();
        var query = {
            "sessions" :{
                $elemMatch:{
                    startsAt : {
                        $gte: now,
                        $lte: searchCutoff
                    },
                    $or : [
                        { notifiedStartingSoon : false},
                        { notifiedStartingSoon: { $exists : false}}
                    ]
                }
            },
            approved : true
        };

        return Collections.Courses.find(query).map(function(c){
            return {
                course : c,
                unnotifiedSessions : _.filter(
                    c.sessions,
                    function(s){
                        return !s.notifiedStartingSoon && s.startsAt >= now && s.startsAt < searchCutoff;
                    })
            };
        });
    }
}