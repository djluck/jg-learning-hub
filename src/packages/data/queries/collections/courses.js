var ns = Collections.Courses.queries = {};

Collections.Courses.queries.orderedByStartDate = function(){
    return Collections.Courses.find(
        {},
        { sort : { startsAt : 1 } }
    );
}

Collections.Courses.queries.coursesThatStartInDaysTime = function(numberOfDays){
    var query = {
        startsAt : {
            $gte : moment().add(numberOfDays, "days").startOf("day").toDate(),
            $lt  : moment().add(numberOfDays, "days").endOf("day").toDate()
        },
        approved : true
    };
    return Collections.Courses.find(query);
}

Collections.Courses.queries.coursesThatStartToday = function(){
    return ns.coursesThatStartInDaysTime(0);
};

Collections.Courses.queries.coursesWithUnnotifiedSessions = function(thatStartsWithinMinutes){

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