MochaWeb.testOnly(function(){
    describe("Given some courses with a mixture of notified and unnotified sessions", function(){
        before(function(){
            chai.should();
            setupTestCourses();
        });

        it("When search we sessions that start within 15 minutes then nothing is returned", function(){
            var coursesThatStartToday = Collections.Courses.queries.coursesWithUnnotifiedSessions(15);
            coursesThatStartToday.should.have.length(0);
        });

        it("When search we sessions that start within 30 minutes then only unnotified sessions that belong to approved courses are returned", function(){
            var coursesThatStartToday = Collections.Courses.queries.coursesWithUnnotifiedSessions(30);
            coursesThatStartToday.should.have.length(2);

            coursesThatStartToday[0].unnotifiedSessions.should.have.length(1);
            coursesThatStartToday[1].unnotifiedSessions.should.have.length(1);

            coursesThatStartToday.should.to.deep.include.members([
                {
                    unnotifiedSessions : [
                        sessionStartsIn30MinutesUnnotified
                    ]
                },
                {
                    unnotifiedSessions : [
                        sessionStartsIn30MinutesUnnotified
                    ]
                }
            ]);
        });

        it("When search we sessions that start within 60 minutes then only unnotified sessions that belong to approved courses are returned", function(){
            var coursesThatStartToday = Collections.Courses.queries.coursesWithUnnotifiedSessions(60);
            coursesThatStartToday.should.have.length(2);

            coursesThatStartToday[0].unnotifiedSessions.should.have.length(1);
            coursesThatStartToday[1].unnotifiedSessions.should.have.length(2);

            coursesThatStartToday.should.to.deep.include.members([
                {
                    course : courseApproved30MinsAndHourAndOverHour,
                    unnotifiedSessions : [
                        sessionStartsIn30MinutesUnnotified,
                        sessionStartsInHourUnnotified
                    ]
                },
                {
                    course : courseApproved30Mins,
                    unnotifiedSessions : [
                        sessionStartsIn30MinutesUnnotified
                    ]
                }
            ])
        })
    });
});

//data data
var sessionsStartedUnnotified = {
    startsAt: moment().subtract(1, "minutes").toDate()
}
var sessionStartsInHourUnnotified = {
    startsAt: moment().add(59, "minutes").toDate()
};
var sessionStartsInHourNotified = {
    startsAt: moment().add(59, "minutes").toDate(),
    notifiedStartingSoon : true
};
var sessionStartsInOverAndHourUnnotified = {
    startsAt: moment().add(61, "minutes").toDate()
};
var sessionStartsIn30MinutesUnnotified = {
    startsAt: moment().add(29, "minutes").toDate(),
    notifiedStartingSoon : false
};
var sessionStartsIn30MinutesNotified = {
    startsAt: moment().add(29, "minutes").toDate(),
    notifiedStartingSoon : true
};


var courseApproved30MinsAndHourAndOverHour =  {
    approved : true,
    sessions : [
        sessionsStartedUnnotified,
        sessionStartsIn30MinutesUnnotified,
        sessionStartsIn30MinutesNotified,
        sessionStartsInHourNotified,
        sessionStartsInHourUnnotified,
        sessionStartsInOverAndHourUnnotified
    ]
};

var courseApproved30Mins = {
    approved : true,
    sessions : [
        sessionsStartedUnnotified,
        sessionStartsIn30MinutesUnnotified,
        sessionStartsIn30MinutesNotified,
    ]
}

var courseApprovedAllNotified = {
    approved : true,
    sessions : [
        sessionStartsIn30MinutesNotified,
        sessionStartsInHourNotified
    ]
}

var courseUnapproved = {
    approved : false,
    sessions : [
        sessionsStartedUnnotified,
        sessionStartsIn30MinutesUnnotified,
        sessionStartsIn30MinutesNotified,
        sessionStartsInHourNotified,
        sessionStartsInHourUnnotified,
        sessionStartsInOverAndHourUnnotified
    ]
}

function setupTestCourses(){
    var toInsert = [
        courseApproved30MinsAndHourAndOverHour,
        courseApproved30Mins,
        courseUnapproved,
        courseApprovedAllNotified
    ];
    Collections.Courses.remove({});
    _.each(toInsert, function(i){
        //turn validation off so we can insert invalid but simplified courses
        i._id = Collections.Courses.insert(i, { validate: false, filter: false, getAutoValues : false });
    });

    Collections.Courses.find().fetch().should.have.length(toInsert.length);
    console.log("Debug message");
}
