var locations = arrangeLocations();

var newCourse = {
    sessions : [
        {
            startsAt : moment("2015-01-02 09:30"),
            durationMinutes : 90,
            locationId : locations.withoutResourceAddress
        },
        {
            startsAt : moment("2015-01-03 09:30"),
            durationMinutes : 60,
            locationId : locations.withoutResourceAddress,
            outlookEventId : "adummyid"
        }
    ],
    details : {
        title : "Course title",
        runByUserId : "runByUserId"
    },
    signedUpUserIds : ["user1Id"]
};

var oldCourseRunBySameUser = {
    details : {
        runByUserId : "runByUserId"
    }
}

var oldCourseRunByNewUser = {
    details : {
        runByUserId : "runByNewUserId"
    }
}

Tinytest.addWithSinon("updateEventDetails deletes and re-creates events if the runByUserId is different", function(test, sinon){
    Office365.event.setup(test, sinon);

    //arrange
    var deleteEventsSpy = this.stub(OutlookEvents, "deleteEvents");
    var createEventsSpy = this.stub(OutlookEvents, "createEvents");

    //Act
    OutlookEvents.updateEventDetails(oldCourseRunByNewUser, newCourse);

    //Assert
    test.isTrue(deleteEventsSpy.calledWith(oldCourseRunByNewUser));
    test.isTrue(createEventsSpy.calledWith(newCourse));
});

Tinytest.addWithSinon("updateEventDetails upserts events if the runByUserId is the same", function(test, sinonSandbox) {
    Office365.event.setup(test, sinonSandbox);

    //Arrange
    var createEvent = Office365.event.mocks.arrangeRunByUser("runByUserId");
    var updateEvent = Office365.event.mocks.arrangeRunByUser("runByUserId");

    //Act:
    OutlookEvents.updateEventDetails(oldCourseRunBySameUser, newCourse);

    //Assert
    test.equal(newCourse.sessions[0].outlookEventId, 0);
    test.equal(newCourse.sessions[1].outlookEventId, "adummyid");

    createEvent.location.calledWith("Without resource address");
    createEvent.requireAResponse.calledWith(true);
    createEvent.startsAt.calledWith(momentMatcher(moment("2015-01-02 09:30").tz("Europe/London")));
    createEvent.endsAt.calledWith(momentMatcher(moment("2015-01-02 11:00").tz("Europe/London")));
    createEvent.attendees.calledWith(["runByUserId", "user1Id"]);
    sinon.assert.called(createEvent.create);

    updateEvent.location.calledWith("Without resource address");
    updateEvent.startsAt.calledWith(momentMatcher(moment("2015-01-03 09:30").tz("Europe/London")));
    updateEvent.endsAt.calledWith(momentMatcher(moment("2015-01-03 10:30").tz("Europe/London")));
    updateEvent.attendees.notCalled();
    updateEvent.requireAResponse.notCalled();
    updateEvent.update.calledWith("adummyid");
});