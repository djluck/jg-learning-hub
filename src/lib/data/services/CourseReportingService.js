CourseReportingService = {
    findCoursesThatStartToday : function(){
        var query = {
            startsAt : {
                $gte : moment().startOf("day").toDate(),
                $lt  : moment().endOf("day").toDate()
            },
            approved : true
        };
        return Collections.Courses.find(query);
    },
    findCoursesThatStartIn3DaysTime: function(){
        var query = {
            startsAt : {
                $gte : moment().add(3, "days").startOf("day").toDate(),
                $lt  : moment().add(3, "days").endOf("day").toDate()
            },
            approved : true
        };
        return Collections.Courses.find(query);
    },
    findCoursesThatHaveSessionsThatStartSoon: function(){
        var query = {
            "sessions" :{
                $elemMatch:{
                    startsAt : {
                        $gte: moment().toDate(),
                        $lt: moment().add(1, "hour").toDate()
                    },
                    $or : [
                        { notifiedStartingSoon : false},
                        { notifiedStartingSoon: { $exists : false}}
                    ]
                }
            },
            approved : true
        };
        return Collections.Courses.find(query);
    }
}