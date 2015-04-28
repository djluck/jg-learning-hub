//Test Data
var locations = arrangeLocations();

var course = {
    sessions : [
        {
            startsAt : moment("2015-04-02 09:30"),
            durationMinutes : 90,
            locationId : locations.withResourceAddress
        },
        {
            startsAt : moment("2015-04-03 09:30"),
            durationMinutes : 60,
            locationId : locations.withoutResourceAddress
        }
    ],
    details : {
        title : "Course title",
        runByUserId : "runByUserId"
    },
    signedUpUserIds : ["user1Id", "user2Id"]
};

Tinytest.addWithSinon("createEvents creates an event per session", function(test, sinonSanbox) {
    Office365.event.setup(test, sinonSanbox);

    //arrange
    var firstEvent = Office365.event.mocks.arrangeRunByUser("runByUserId")
    var secondEvent = Office365.event.mocks.arrangeRunByUser("runByUserId")

    //Act
    OutlookEvents.createEvents(course);

    //Assert
    test.equal(course.sessions[0].outlookEventId, 0);
    test.equal(course.sessions[1].outlookEventId, 1);

    firstEvent.location.calledWith("With resource address");
    firstEvent.requireAResponse.calledWith(true);
    firstEvent.startsAt.calledWith(momentMatcher(moment("2015-04-02 09:30").tz("Europe/London")));
    firstEvent.endsAt.calledWith(momentMatcher(moment("2015-04-02 11:00").tz("Europe/London")));
    firstEvent.attendees.calledWith(["runByUserId", "user1Id", "user2Id", "locationName@justgiving.com"]);
    sinon.assert.called(firstEvent.create);

    secondEvent.location.calledWith("Without resource address");
    secondEvent.requireAResponse.calledWith(true);
    secondEvent.startsAt.calledWith(momentMatcher(moment("2015-04-03 09:30").tz("Europe/London")));
    secondEvent.endsAt.calledWith(momentMatcher(moment("2015-04-03 10:30").tz("Europe/London")));
    secondEvent.attendees.calledWith(["runByUserId", "user1Id", "user2Id"]);
    sinon.assert.called(secondEvent.create);
});