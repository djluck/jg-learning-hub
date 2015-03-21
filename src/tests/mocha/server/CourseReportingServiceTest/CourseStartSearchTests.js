MochaWeb.testOnly(function(){
    describe("When searching for courses that start today", function(){
        before(function(){
            chai.should();
            setupTestCourses();
        });

        it("only approved courses that start today should be returned", function(){
            var coursesThatStartToday = CourseReportingService.findCoursesThatStartToday().fetch();
            coursesThatStartToday.should.have.length(1);
            coursesThatStartToday[0]._id.should.equal(startsTodayApproved._id);
        });
    });
});

MochaWeb.testOnly(function(){
    describe("When searching for courses that start in 3 days time", function(){
        before(function(){
            chai.should();
            setupTestCourses();
        });

        it("only approved courses that start in 3 days time should be returned", function(){
            var coursesThatStartToday = CourseReportingService.findCoursesThatStartIn3DaysTime().fetch();
            coursesThatStartToday.should.have.length(1);
            coursesThatStartToday[0]._id.should.equal(startsIn3DaysApproved._id);
        });
    });
});

//test data
var startsTodayApproved =  {
    approved : true,
    startsAt : moment().toDate()
};

var startsTodayUnapproved =  {
    approved : false,
    startsAt : moment().toDate()
};

var startedYesterday = {
    approved : true,
    startsAt : moment().subtract(1, "days").toDate()
};

var startsTomorrow = {
    approved : true,
    startsAt : moment().add(1, "days").toDate()
}

var startsIn2Days = {
    approved : true,
    startsAt : moment().add(2, "days").toDate()
}

var startsIn3DaysApproved = {
    approved : true,
    startsAt : moment().add(3, "days").toDate()
}


var startsIn3DaysUnapproved = {
    approved : false,
    startsAt : moment().add(3, "days").toDate()
}

var startsIn4Days = {
    approved : true,
    startsAt : moment().add(4, "days").toDate()
}

function setupTestCourses(){
    var toInsert = [
        startedYesterday,
        startsTodayApproved,
        startsTodayUnapproved,
        startsTomorrow,
        startsIn2Days,
        startsIn3DaysApproved,
        startsIn3DaysUnapproved,
        startsIn4Days
    ];
    Collections.Courses.remove({});
    _.each(toInsert, function(i){
        //turn validation off so we can insert invalid but simplified courses
        i._id = Collections.Courses.insert(i, { validate: false, filter: false, getAutoValues : false });
    });

    Collections.Courses.find().fetch().should.have.length(toInsert.length);
}
