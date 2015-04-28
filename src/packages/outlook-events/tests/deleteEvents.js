var locations = arrangeLocations();



Tinytest.addWithSinon("deleteEvents deletes every event defined for a session", function(test, sinonSanbox) {
    Office365.event.setup(test, sinonSanbox);

    //arrange
    var courseToDelete = {
        sessions : [
            {
                //no outlookEventId, cannot be deleted
            },
            {
                //no outlookEventId, cannot be deleted
                outlookEventId : null
            },
            {
                outlookEventId : "adummyid"
            }
        ],
        details : {
            runByUserId : "runByUserId"
        }
    };
    
    var firstEvent = Office365.event.mocks.arrangeRunByUser(courseToDelete.details.runByUserId);

    //Act
    OutlookEvents.deleteEvents(courseToDelete);

    //Assert
    test.isFalse(courseToDelete.sessions[0].outlookEventId);
    test.isFalse(courseToDelete.sessions[1].outlookEventId);
    test.isFalse(courseToDelete.sessions[2].outlookEventId);

    firstEvent.delete.calledWith("adummyid");
});