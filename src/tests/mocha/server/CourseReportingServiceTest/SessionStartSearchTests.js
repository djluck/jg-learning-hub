MochaWeb.testOnly(function(){
    describe("When searching for sessions that start soon to notify users about", function(){
        before(function(){
            chai.should();
            setupTestCourses();
        });

        it("only sessions that start within 1 hour and that have not been notified are returned", function(){
            var coursesThatStartToday = CourseReportingService.findCoursesThatHaveSessionsThatStartSoon().fetch();
            coursesThatStartToday.should.have.length(1);
            coursesThatStartToday[0]._id.should.equal(startsWithinTheHourApproved._id);
        });
    });
});

//test data
var startsWithinTheHourUnapproved =  {
    approved : false,
    sessions : [{
        startsAt: moment().add(30, "minutes").toDate()
    }]
};

var startsWithinTheHourApproved =  {
    approved : true,
    sessions : [{
        startsAt: moment().add(30, "minutes").toDate()
    }]
};

var startsWithinTheHourNotified =  {
    approved : true,
    sessions : [{
        startsAt: moment().add(30, "minutes").toDate(),
        notifiedStartingSoon : true
    }]
};

var startsAfterTheHourNotified =  {
    approved : true,
    sessions : [{
        startsAt: moment().add(61, "minutes").toDate()
    }]
};

var startsBeforeTheHour = {
    approved : true,
    sessions : [{
        startsAt: moment().subtract(1, "minutes").toDate()
    }]
}


function setupTestCourses(){
    var toInsert = [
        startsWithinTheHourUnapproved,
        startsWithinTheHourApproved,
        startsWithinTheHourNotified,
        startsAfterTheHourNotified,
        startsBeforeTheHour
    ];
    Collections.Courses.remove({});
    _.each(toInsert, function(i){
        //turn validation off so we can insert invalid but simplified courses
        i._id = Collections.Courses.insert(i, { validate: false, filter: false, getAutoValues : false });
    });

    Collections.Courses.find().fetch().should.have.length(toInsert.length);
}
