var locations = arrangeLocations();

var course = {
    sessions : [
        {
            startsAt : moment("2015-04-02 09:30"),
            durationMinutes : 90,
            locationId : locations.withResourceAddress,
            outlookEventId : "firstId"
        },
        {
            startsAt : moment("2015-04-03 09:30"),
            durationMinutes : 60,
            locationId : locations.withoutResourceAddress,
            outlookEventId : "secondId"
        }
    ],
    details : {
        title : "Course title",
        runByUserId : "runByUserId"
    },
    signedUpUserIds : ["user1Id", "user2Id", "user3Id"]
};

Tinytest.addWithSinon("updateAttendeesForEvents updates the attendees for all sessions of a course", function(test, sinon) {
    Office365.event.setup(test, sinon);

    //arrange
    var firstEvent = Office365.event.mocks.arrangeRunByUser("runByUserId")
    var secondEvent = Office365.event.mocks.arrangeRunByUser("runByUserId")

    //Act
    OutlookEvents.updateAttendeesForEvents(course);

    //Assert
    firstEvent.location.notCalled();
    firstEvent.requireAResponse.notCalled();
    firstEvent.startsAt.notCalled();
    firstEvent.endsAt.notCalled();
    firstEvent.attendees.calledWith(["runByUserId", "user1Id", "user2Id", "user3Id", "locationName@justgiving.com"]);
    firstEvent.update.calledWith("firstId");

    secondEvent.location.notCalled();
    secondEvent.requireAResponse.notCalled();
    secondEvent.startsAt.notCalled();
    secondEvent.endsAt.notCalled();
    secondEvent.attendees.calledWith(["runByUserId", "user1Id", "user2Id", "user3Id"]);
    secondEvent.update.calledWith("secondId");

});